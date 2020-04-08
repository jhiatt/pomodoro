import React from 'react';
import Task from './task';
import ObjectID from 'bson-objectid';

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

    tasklistTimerCall(t){
        this.props.timerCall(t);
    }

    handleChange(event) {
        this.setState({newDescription: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        let idNum = ObjectID.generate()
        const newTask = {
            id: idNum,
            description: this.state.newDescription,
            status: "Ready"
        }
        this.setState({tasks: [...this.state.tasks, newTask ]});
        this.setState({newDescription: ''}); //do we need to worry baout immutibility here?

        async function postData(url = '', data = {}) {
            const response = await fetch(url, {
            method: 'POST', 
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data)
            });
            return await response.json();
        }
        
        postData('http://localhost:3001/tasks', { task: newTask })
            .then((data) => {
            });
    }

    componentDidMount(){
        fetch('http://localhost:3001/tasks.json')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                data.map((t, index) => 
                    this.setState({tasks: [...this.state.tasks, {id: Object.values(t._id), description: t.description, status: t.status}]}),
                )
            });
    }

    render() {
        const allTasks = this.state.tasks.map((item, index) =>
            <Task 
                description={item.description} 
                status={item.status} 
                key={item.id}
                id={item.id} 
                timerCall2={this.tasklistTimerCall}
                compId={this.props.compId} />
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
                                    <div className="input-field">
                                        <input 
                                            placeholder="description" 
                                            id="description" 
                                            type="text" 
                                            className="validate"  
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