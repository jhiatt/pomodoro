import React from 'react';
import Task from './task';

class TaskList extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.tasklistTimerCall = this.tasklistTimerCall.bind(this);
    }

    tasklistTimerCall(time){
        this.props.timerCall(time)
    }

    handleClick(event) {
        let time = Date.now()
        console.log(Date(time))
    }

    render() {
        return (
            <React.Fragment>
                <Task timerCall2={this.tasklistTimerCall}/>
                <div className="row">
                    <div className="col s12 m6 offset-m3">

                        <div className="card deep-orange accent-3">
                            <div className="card-content white-text">
                                <span className="card-title">Add New</span>
                                <p>I am a very simple card. I am good at containing small bits of information.
                                I am convenient because I require little markup to use effectively.</p>
                            </div>
                            <div className="card-action">
                                <a className="waves-effect waves-light btn" onClick={this.handleClick}>Add</a>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default TaskList;