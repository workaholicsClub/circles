let localVideo;
let localStream;
let remoteVideo;
let peerConnection;
let uuid;
let serverConnection;

const peerConnectionConfig = {
  iceServers: [
    { urls: 'stun:stun.stunprotocol.org:3478' },
    { urls: 'stun:stun.l.google.com:19302' },
  ],
};

function pageReady() {
  uuid = createUUID();

  localVideo = document.getElementById('localVideo');
  remoteVideo = document.getElementById('remoteVideo');

  const constraints = {
    video: true,
    audio: true,
  };

  if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(getUserMediaSuccess)
      .catch(errorHandler);
  } else {
    alert('Your browser does not support getUserMedia API');
  }
}

function connectToServer() {
  serverConnection = new WebSocket(`wss://${window.location.hostname}:8443/video`);
  serverConnection.onmessage = gotMessageFromServer;
}

function getUserMediaSuccess(stream) {
  localStream = stream;
  localVideo.srcObject = stream;
  initPeerConnection(localStream);
  connectToServer();
}

function initPeerConnection(localMediaStream) {
  peerConnection = new RTCPeerConnection(peerConnectionConfig);
  peerConnection.onicecandidate = gotIceCandidate;
  peerConnection.ontrack = gotRemoteStream;
  peerConnection.addStream(localMediaStream);
}

function startCall() {
  peerConnection
    .createOffer()
    .then(createdDescription)
    .catch(errorHandler);
}

function gotMessageFromServer(message) {
  const isStartCallMessage = message.data === 'start';
  if (isStartCallMessage) {
    startCall();
    return;
  }

  const signal = JSON.parse(message.data);
  console.log(signal);

  if (signal.uuid === uuid) return;

  if (signal.sdp) {
    peerConnection
      .setRemoteDescription(new RTCSessionDescription(signal.sdp))
      .then(() => {
        // Only create answers in response to offers
        if (signal.sdp.type == 'offer') {
          peerConnection
            .createAnswer()
            .then(createdDescription)
            .catch(errorHandler);
        }
      })
      .catch(errorHandler);
  } else if (signal.ice) {
    peerConnection.addIceCandidate(new RTCIceCandidate(signal.ice)).catch(errorHandler);
  }
}

function gotIceCandidate(event) {
  if (event.candidate != null) {
    serverConnection.send(JSON.stringify({ ice: event.candidate, uuid }));
  }
}

function createdDescription(description) {
  console.log('got description');

  peerConnection
    .setLocalDescription(description)
    .then(() => {
      serverConnection.send(JSON.stringify({ sdp: peerConnection.localDescription, uuid }));
    })
    .catch(errorHandler);
}

function gotRemoteStream(event) {
  console.log('got remote stream');
  remoteVideo.srcObject = event.streams[0];
}

function errorHandler(error) {
  console.log(error);
  document.getElementById('log').innerHTML = JSON.stringify(error);
}

// Taken from http://stackoverflow.com/a/105074/515584
// Strictly speaking, it's not a real UUID, but it gets the job done here
function createUUID() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
}

module.exports = pageReady;
