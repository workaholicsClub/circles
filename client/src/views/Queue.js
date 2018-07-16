import React, {Component} from "react";
import LoadSpinner from "../elements/LoadSpinner";

import profilePic from '../images/blank-profile.svg';

class Queue extends Component {
    constructor(props) {
        super(props);
        let isWaiting = !props.offeredUser;

        this.onOfferReceived = props.onOfferReceived;
        this.onRemoteUserAccepted = props.onRemoteUserAccepted;
    }

    sendUserData() {
        let message = {
            type: 'userData',
            user: this.props.user
        };

        this.serverConnection.send(JSON.stringify(message));
    }

    sendAcceptanceStatus(status) {
        let message = {
            type: 'offerReply',
            user: this.props.offeredUser,
            status: status
        };

        this.serverConnection.send(JSON.stringify(message));
        this.clearUserOffer();
    }

    componentDidMount() {
        this.serverConnection = new WebSocket('wss://' + window.location.hostname + ':8443/queue');
        this.serverConnection.onmessage = this.receivedMessageFromServer.bind(this);
        this.serverConnection.onopen = () => this.sendUserData();
    }

    componentWillUnmount() {
        this.serverConnection.close();
    }

    receivedMessageFromServer(message) {
        let jsonMessage = JSON.parse(message.data);
        if (jsonMessage.type === 'userOffer') {
            this.receivedOfferFromServer(jsonMessage.user);
        }

        if (jsonMessage.type === 'acceptedOffer') {
            this.receivedAcceptedOfferFromServer(jsonMessage.user);
        }
    }

    clearUserOffer() {
        if (typeof this.onOfferReceived === 'function') {
            this.onOfferReceived(false);
        }
    }

    receivedOfferFromServer(offer) {
        if (typeof this.onOfferReceived === 'function') {
            this.onOfferReceived(offer);
        }
    }

    receivedAcceptedOfferFromServer(offer) {
        if (typeof this.onRemoteUserAccepted === 'function') {
            this.onRemoteUserAccepted(offer);
        }
    }


    renderWaitBlock() {
        return (
            <div className="py-5">
                <div className="container">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-md-6">
                            <h1 className="display-4 text-center">Ждите...</h1>
                            <p className="text-center">Ожидание готовности собеседника</p>
                        </div>
                    </div>
                    <div className="row">
                        <LoadSpinner/>
                    </div>
                </div>
            </div>
        );
    }

    renderOfferBlock() {
        let STATUS_ACCEPTED = true;
        let STATUS_DENIED = false;

        return (
            <div className="py-5">
                <div className="container">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-md-6 pb-3">
                            <h1 className="display-4 text-center">Найдено соответствие</h1>
                            <div className="card">
                                <img className="card-img-top" src={profilePic} style={{padding: "2rem 6rem !important"}} />
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item h3 active text-center">{this.props.offeredUser.name}</li>
                                        <li className="list-group-item">Возраст: {this.props.offeredUser.birthday}</li>
                                        <li className="list-group-item">Статус: {this.props.offeredUser.status}</li>
                                        <li className="list-group-item">Цель: {this.props.offeredUser.aim}</li>
                                        <li className="list-group-item">Образование: {this.props.offeredUser.education}</li>
                                        <li className="list-group-item">О себе: {this.props.offeredUser.about}</li>
                                    </ul>
                                    <div className="card-body">
                                        <a className="btn btn-primary btn-lg btn-block" href="#"
                                           onClick={() => this.sendAcceptanceStatus(STATUS_ACCEPTED)}>Хочу общаться!</a>
                                        <a className="btn btn-block" href="#"
                                           onClick={() => this.sendAcceptanceStatus(STATUS_DENIED)}>Пропустить</a>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        let isWaiting = !this.props.offeredUser;

        return (
            isWaiting ? this.renderWaitBlock() : this.renderOfferBlock()
        );
    }
}

export default Queue;