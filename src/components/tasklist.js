import React from 'react';
import Task from './task';

class TaskList extends React.Component {

    render() {
        return (
            <React.Fragment>
                <Task />
                <div className="row">
                    <div className="card deep-orange accent-3">
                        <div className="card-content white-text">
                            <span className="card-title">Add New</span>
                            <p>I am a very simple card. I am good at containing small bits of information.
                            I am convenient because I require little markup to use effectively.</p>
                        </div>
                        <div className="card-action">
                            <a className="waves-effect waves-light btn">Add</a>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default TaskList;