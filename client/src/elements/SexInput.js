import React, {Component} from "react";
import womanPic from '../images/woman-with-dress.svg';
import manPic from '../images/man.svg';

class SexInput extends Component {
    render() {
        let femaleButtonId = "sex-female-"+this.props.name;
        let maleButtonId = "sex-male-"+this.props.name;

        return (
            <div
                className="btn-group btn-group-toggle btn-group-lg pb-2 align-items-center justify-content-center"
                style={{width: "100%"}} data-toggle="buttons">
                <label className="btn btn-lg p-2 btn-outline-primary"
                       style={{
                           backgroundImage: `url(${womanPic})`,
                           backgroundRepeat: "no-repeat",
                           backgroundPosition: "center center",
                           backgroundSize: "96px",
                           width: "128px",
                           height: "128px"
                       }}>
                    <input type="radio" name={this.props.name} id={femaleButtonId} autoComplete="off"/>
                </label>
                <label className="btn btn-outline-primary btn-lg"
                       style={{
                           backgroundImage: `url(${manPic})`,
                           backgroundRepeat: "no-repeat",
                           backgroundPosition: "center center",
                           backgroundSize: "96px",
                           width: "128px",
                           height: "128px"
                       }}>
                    <input type="radio" name={this.props.name} id={maleButtonId} autoComplete="off"/>
                </label>
            </div>
        );
    }
}

export default SexInput;