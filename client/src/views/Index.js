import React, {Component} from 'react';
import CenteredLayout from "../layouts/CenteredLayout";
import {Link} from "react-router-dom";

class Index extends Component {
    render() {
        return (
            <CenteredLayout logo={true} title="Circles">
                <Link to="/register" className="btn btn-primary btn-block btn-lg">Регистрация</Link>
            </CenteredLayout>
        );
    }
}

export default Index;