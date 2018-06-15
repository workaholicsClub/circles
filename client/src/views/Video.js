import React, {Component} from "react";
import CenteredLayout from "../layouts/CenteredLayout";
import startVideo from "../webrtc.js";

class Video extends Component {
    constructor(props) {
        super(props);
        this.state = {
            secondsLeft: this.props.sessionSeconds || 300,
            tickDelay: 1000
        };
        this.interval = null;
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            this.setState((prevState) => {
                let newSeconds = prevState.secondsLeft > 0? prevState.secondsLeft - 1 : 0;
                let needsStopTimer = newSeconds === 0 && this.interval !== null;

                if (needsStopTimer) {
                    this.stopTimer();
                }

                return { secondsLeft:  newSeconds};
            });
        }, 1000);
        startVideo();
    }

    componentWillUnmount() {
        this.stopTimer();
    }

    stopTimer() {
        clearInterval(this.interval);
        this.interval = null;
    }

    static zeroPad(d) {
        if (d < 10) {
            return "0" + d;
        }

        return d;
    }

    static getHumanTime(secondsLeft) {
        let minutes = Math.floor(secondsLeft/60);
        let seconds = secondsLeft-minutes*60;
        return Video.zeroPad(minutes)+':'+Video.zeroPad(seconds);
    }

    addFiveMinutes() {
        this.setState((prevState) => {
            return { secondsLeft:  prevState.secondsLeft + 300 };
        });
    }

    render() {
        let time = Video.getHumanTime(this.state.secondsLeft);

        return (
            <CenteredLayout>
                <h1 className="display-4 text-center timer pt-3">{time}</h1>
                <div className="card">
                    <video id="remoteVideo" autoPlay
                           style={{
                               width: "100%",
                               minHeight: "300px",
                               backgroundImage: `url('assets/video-placeholder.png')`,
                               backgroundRepeat: "no-repeat",
                               backgroundPosition: "center center"
                           }} />
                    <video id="localVideo" autoPlay muted style={{
                        width: "100px",
                        height: "100px",
                        marginTop: "-100px"
                    }} />
                    <div className="card-body">
                        <a href="#" onClick={this.addFiveMinutes.bind(this)} className="btn btn-primary btn-lg btn-block continue">Хочу пообщаться еще 5 мин</a>
                        <a href="#" className="btn btn-block">Стоп!</a>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item h3">Константин Константинопольский</li>
                        <li className="list-group-item">Возраст: 38</li>
                        <li className="list-group-item">Статус: в поиске</li>
                        <li className="list-group-item">Цель: брак</li>
                        <li className="list-group-item">Образование: высшее</li>
                        <li className="list-group-item">О себе: пишу, читаю</li>
                    </ul>
                </div>
                <div id="log"></div>
            </CenteredLayout>
        );
    }
}

export default Video;