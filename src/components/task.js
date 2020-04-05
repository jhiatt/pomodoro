import React from 'react';


class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: this.props.status
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        let t = this.props;
        this.props.timerCall2(t);
        this.setState({status: "In Progress" })
        //API change status
    }

    componentDidUpdate() {
        if (this.props.id === this.props.compId && this.state.status !== "Complete") {
            this.setState({status: "Complete"})
        }
    }

    render() {
        let button
        if (this.props.status !== "Complete") {
            button = 
                <div className="card-action">
                    <div className="waves-effect waves-light btn" onClick={this.handleClick}>Start</div>
                </div>
        };

        return (
            <div className="row">
                <div className="col s12 m6">
                    <div className="card">
                        <div className="card-content grey-text text-darken-4">
                            <p>{this.props.description}</p>
                            <p>Status: {this.state.status}</p>
                        </div>
                        {button}
                    </div>
                </div>
            </div>
        )
    }
}

export default Task;
