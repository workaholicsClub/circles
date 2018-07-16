import React, {Component} from "react";
import womanPic from '../images/woman-with-dress.svg';
import manPic from '../images/man.svg';

class SexInput extends Component {
    constructor(props) {
        super(props);
        this.parentChangeHandler = props.onChange;
        this.state = {
            sex: ""
        }
    }

    handleSexChange(event) {
        this.setState({sex: event.target.value});

        if (this.parentChangeHandler) {
            this.parentChangeHandler(event);
        }
    }

    render() {
        let femaleButtonId = "sex-female-"+this.props.name;
        let maleButtonId = "sex-male-"+this.props.name;
        let femaleClass = "btn btn-lg p-2 btn-outline-primary " + (this.state.sex === "female" ? "active" : "");
        let maleClass = "btn btn-lg btn-outline-primary " + (this.state.sex === "male" ? "active" : "");

        return (
            <div
                className="btn-group btn-group-toggle btn-group-lg pb-2 align-items-center justify-content-center"
                style={{width: "100%"}} data-toggle="buttons">
                <label className={femaleClass}
                       style={{
                           backgroundImage: `url(${womanPic})`,
                           backgroundRepeat: "no-repeat",
                           backgroundPosition: "center center",
                           backgroundSize: "96px",
                           width: "128px",
                           height: "128px"
                       }}>
                    <input type="radio" name={this.props.name} id={femaleButtonId} autoComplete="off" value="female" onChange={this.handleSexChange.bind(this)}/>
                </label>
                <label className={maleClass}
                       style={{
                           backgroundImage: `url(${manPic})`,
                           backgroundRepeat: "no-repeat",
                           backgroundPosition: "center center",
                           backgroundSize: "96px",
                           width: "128px",
                           height: "128px"
                       }}>
                    <input type="radio" name={this.props.name} id={maleButtonId} autoComplete="off" value="male" onChange={this.handleSexChange.bind(this)}/>
                </label>
            </div>
        );
    }
}

export default SexInput;