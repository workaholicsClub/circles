import React, {Component} from 'react';
import './styles/App.css';
import Index from "./views/Index";
import { Route, Switch, Redirect } from 'react-router-dom';
import Register from "./views/Register";
import Video from "./views/Video";
import User from "./models/User";
import Queue from "./views/Queue";

let user = new User();
let remoteUser = new User();

let appState = {
    userProps: false,
    offeredUserProps: false,
    acceptedUserProps: false,
};

class App extends Component {
    constructor(props) {
        super(props);
        this.state = appState;
        this.state.redirectUrl = false;
    }

    navigateTo(url) {
        this.setState({redirectUrl: url});
    }

    handleUserChange(prop, value) {
        user.set(prop, value);
        if (prop === 'sex') {
            let needSex = value === 'male' ? 'female' : 'male';
            user.set('needSex', needSex);
        }

        this.setState({userProps: user.getProps()});
    }

    handleUserRegister(registeredUserProps) {
        user.setProps(registeredUserProps);
        this.setState({userProps: user.getProps()});
        this.navigateTo('/queue');
    }

    handleRemoteUserOffered(offeredUserProps) {
        if (offeredUserProps === false) {
            this.setState({offeredUserProps: false});
            return;
        }

        remoteUser.setProps(offeredUserProps);
        this.setState({offeredUserProps: remoteUser.getProps()});
    }

    handleRemoteUserAccepted(acceptedUserProps) {
        remoteUser.setProps(acceptedUserProps);
        this.setState({acceptedUserProps: remoteUser.getProps()});
        this.navigateTo('/video');
    }

    render() {
        if (this.state.redirectUrl) {
            return <Redirect to={this.state.redirectUrl} />;
        }

        return (
            <Switch>
                <Route exact path='/' component={Index} appState={appState} />
                <Route path='/register' render={() => <Register
                    user={this.state.userProps}
                    onNameChange={(newName) => this.handleUserChange('name', newName)}
                    onSexChange={(newSex) => this.handleUserChange('sex', newSex)}
                    onBirthdayChange={(newBirthday) => this.handleUserChange('birthday', newBirthday)}
                    onRegister={this.handleUserRegister.bind(this)}
                />} />
                <Route path='/queue' render={() => <Queue
                    user={this.state.userProps}
                    offeredUser={this.state.offeredUserProps}
                    onOfferReceived={this.handleRemoteUserOffered.bind(this)}
                    onRemoteUserAccepted={this.handleRemoteUserAccepted.bind(this)}
                />} />
                <Route path='/video' render={() => <Video remoteUser={this.state.acceptedUserProps}/>} />
            </Switch>
        );
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.redirectUrl !== false) {
            this.setState({redirectUrl: false});
        }
    }
}

export default App;
