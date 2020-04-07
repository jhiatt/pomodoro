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

    tasklistTimerCall(t){
        this.props.timerCall(t);
    }

    handleChange(event) {
        this.setState({newDescription: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        let tasks = this.state.tasks;
        let idNum = (tasks.length === 0) ? 1 : tasks[tasks.length -1].id + 1;
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
        
        let r = postData('http://localhost:3001/tasks', { task: newTask })
            .then((data) => {
            console.log(data);
            });

        console.log(r);
    }

    componentDidMount(){
        fetch('http://localhost:3001/tasks.json')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                // data.map((t) => 
                //     console.log(Object.values(t._id))
                //     )
                data.map((t, index) => 
                    this.setState({tasks: [...this.state.tasks, {description: t.description, status: t.status}]}),
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