import React from 'react';


class Task extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        let time = Date.now()
        this.props.timerCall2(time)
    }

    render() {
        let button
        if (this.props.status != "Complete") {
            button = 
                <div className="card-action">
                    <a className="waves-effect waves-light btn" onClick={this.handleClick}>Start</a>
                </div>
        };

        return (
            <div className="row">
                <div className="col s12 m6">
                    <div className="card">
                        <div className="card-content grey-text text-darken-4">
                            <p>{this.props.description}</p>
                            <p>Status: {this.props.status}</p>
                        </div>
                        {button}
                    </div>
                </div>
            </div>
        )
    }
}

export default Task;