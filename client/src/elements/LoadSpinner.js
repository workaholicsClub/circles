import React, {Component} from "react";
import '../styles/loader.css';

class LoadSpinner extends Component {
    render() {
        return (
            <div className="cssload-loader-inner">
                <div className="cssload-cssload-loader-line-wrap-wrap">
                    <div className="cssload-loader-line-wrap" />
                </div>
                <div className="cssload-cssload-loader-line-wrap-wrap">
                    <div className="cssload-loader-line-wrap" />
                </div>
                <div className="cssload-cssload-loader-line-wrap-wrap">
                    <div className="cssload-loader-line-wrap" />
                </div>
            </div>
        );
    }
}

export default LoadSpinner;