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
        let p = this.props;
        let q = {time: Date.now()};
        let t = Object.assign(q, p)
        this.props.timerCall2(t);
        this.setState({status: "In Progress" })

        async function putData(url = '', data = {}) {
            const response = await fetch(url, {
            method: 'PUT', 
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
        
        putData(`http://localhost:3001/tasks/${this.props.id}`, { status: "In Progress" })
            .then((data) => {
        });
        
        let curId = this.props.id.toString()
        console.log(curId)
        putData(`http://localhost:3001/users/5e8d31ad6ea1e21e3c28a34a`, { current_task: curId, description: this.props.description, started: Date.now() })
            .then((data) => {
        });
    }

    componentDidUpdate() {
        if (this.props.id === this.props.compId && this.state.status !== "Complete") {
            this.setState({status: "Complete"})
        }
    }
    

    render() {
        let button
        if (this.props.status !== "Complete") {
            // we can add a condition here so that if timer is started we also hide this button
            // we should add a delete button here
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
