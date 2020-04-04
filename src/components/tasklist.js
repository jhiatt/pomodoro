import React from 'react';
import Task from './task';

class TaskList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newDescription: '',
            tasks: []

        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.tasklistTimerCall = this.tasklistTimerCall.bind(this);
    }

    tasklistTimerCall(time){
        this.props.timerCall(time)
    }

    handleChange(event) {
        this.setState({newDescription: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        let tasks = this.state.tasks;
        let newTask = {
            description: this.state.newDescription,
            status: "Ready"
        }
        this.setState({tasks: [...this.state.tasks, newTask ]});
        this.setState({newDescription: ''});
    }

    render() {
        const allTasks = this.state.tasks.map((item, index) =>
            <Task description={item.description} status={item.status} key={index} timerCall2={this.tasklistTimerCall}/>
        );

        return (
            <React.Fragment>
                {allTasks}
                <div className="row">
                    <div className="col s12 m6">
                        <div id="new-task" className="card deep-orange accent-3">
                            <form onSubmit={this.handleSubmit}  >
                                <div className="card-content white-text">
                                    <span className="card-title">Add New Task</span>
                                    <div class="input-field">
                                        <input 
                                            placeholder="description" 
                                            id="description" 
                                            type="text" 
                                            class="validate"  
                                            onChange={this.handleChange}
                                            value={this.state.newDescription}
                                        />
                                    </div>
                                </div>
                                <div className="card-action">
                                    <input className="waves-effect waves-light btn" type="submit" value="Add" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default TaskList;