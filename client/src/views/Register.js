import React, {Component} from "react";
import CenteredLayout from "../layouts/CenteredLayout";
import SexInput from "../elements/SexInput";

import profilePic from '../images/blank-profile.svg';
import {Link} from "react-router-dom";

class Register extends Component {
    render() {
        return (
            <CenteredLayout logo={true} title="Регистрация">
                <div className="card">
                    <div style={{padding: "2rem 6rem"}}>
                        <img className="card-img-top" src={profilePic} alt=""/>
                    </div>
                    <div className="card-body">
                        <form className="">
                            <SexInput name="sex"/>
                            <div className="form-group">
                                <div className="row">
                                    <label className="col">Имя</label>
                                </div>
                                <input type="text" className="form-control"
                                       placeholder="Введите полные имя и фамилию"/>
                            </div>
                            <div className="form-group">
                                <label className="">Дата рождения</label>
                                <input type="date" className="form-control"/>
                            </div>
                            <Link to="/video" className="btn btn-primary btn-block btn-lg">Зарегистрироваться</Link>
                        </form>
                    </div>
                </div>
            </CenteredLayout>
        );
    }
}

export default Register;