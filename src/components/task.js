import React from 'react';


class Task extends React.Component {

    handleClick(event) {
        let time = Date.now()
        this.props.timerCall(time)
    }

    render() {
        return (
            <div className="row">
                <div className="col s12 m6 offset-m3">
                    <div className="card">
                        <div className="card-content grey-text text-darken-4">
                            <p>I am a very simple card. I am good at containing small bits of information.
                            I am convenient because I require little markup to use effectively.</p>
                        </div>
                        <div className="card-action">
                            <a className="waves-effect waves-light btn">button</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Task;