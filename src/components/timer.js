import React from 'react';


class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timerOn: false,
            startTime: 0,
            timeLeft: .1 * 60000, //change from .1 to 25
            timeDisplay: "25 : 00",
            breakOn: false,
            breakTimeLeft: .5 * 60000, //change to 5
            breakTimeDisplay: "5 : 00",
            compId: '',
            timerFinished: false,
            clockRunning: false,
            interval: '',
            curTask: ''
        };
        this.calTimeLeft = this.calTimeLeft.bind(this);
        this.timeUpdate = this.timeUpdate.bind(this);
        this.formatClock = this.formatClock.bind(this);
        this.finishedHandleClick = this.finishedHandleClick.bind(this);
        this.notFinHandleClick = this.notFinHandleClick.bind(this);
    }

    calTimeLeft(totalMin){
        let totalTime = totalMin * (60000)
        console.log(totalTime)
        let now = Date.now();
        console.log((now))
        console.log("Timer Start: " + this.state.startTime)
        let end = this.state.startTime + totalTime
        let left = end - now
        console.log("left: " + left)
        this.setState({timeLeft: left, timerOn: true, clockRunning: true})
        console.log(this.state.timeLeft)
        let i = setInterval(() => this.timeUpdate(), 1000)
        this.setState({interval: i})
    }

    timeUpdate(){
        if (this.state.timerOn) {
            console.log("!!!!")
            const newTime = this.state.timeLeft - 1000;
            if (newTime >= 0) {
                this.setState({
                    timeLeft: newTime
                });
            } else {
                clearInterval(this.state.interval);
                this.setState({ timerFinished: true, clockRunning: false, timerOn: false });
            }
            this.formatClock(this.state.timeLeft, false);
        } else if (this.state.breakOn) {
            console.log("!!!!!")
            const newTime = this.state.breakTimeLeft - 1000;
            if (newTime >= 0) {
                this.setState({
                    breakTimeLeft: newTime
                });
            } else {
                clearInterval(this.state.interval);
                this.setState({ breakOn: false, clockRunning: false, timerOn: false, timerFinished: false });
            }
            this.formatClock(this.state.breakTimeLeft, true);
        }
    };

    formatClock(time, isBreak) {
        let realTime = time / 1000;
        let minutes = Math.floor(realTime / 60);
        let seconds = Math.floor(realTime - minutes * 60);
        seconds = seconds < 10 ? "0" + seconds : seconds;
        if (isBreak) {
            this.setState({breakTimeDisplay: `${minutes} : ${seconds}`})
        } else {
            this.setState({timeDisplay: `${minutes} : ${seconds}`})
        }
    };

    //handles and lifecycle
    finishedHandleClick(event) {
        if (!this.state.clockRunning) {
            this.props.compCall(this.props.eventId);
            this.setState({ timerOn: false, breakOn: true, clockRunning: true, timerFinished: false });
            let i = setInterval(() => this.timeUpdate(), 1000);
            this.setState({interval: i})
        }
        async function postData(url = '', data = {}) {
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
        
        postData(`http://localhost:3001/tasks/${this.props.eventId}`, { status: "Complete" })
            .then((data) => {
            });
    };

    notFinHandleClick(event) {
        if (!this.state.clockRunning) {
            this.setState({ timerOn: false, breakOn: true, clockRunning: true, timerFinished: false });
            let i = setInterval(() => this.timeUpdate(), 1000);
            this.setState({interval: i})
        }
    };

    componentDidMount() {
        fetch('http://localhost:3001/users')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                data.map((t, index) => 
                    this.setState({curTask: t.description, startTime: parseInt(t.started)})
            )
            if (this.state.startTime + 25 * 60000 > Date.now()) {this.calTimeLeft(25)}
        });
    };

    componentDidUpdate() {
        if (this.props.startTime > this.state.startTime) {
            this.setState({startTime: this.props.startTime,})
            if (this.state.startTime + 25 * 60000 > Date.now() 
                && !this.state.clockRunning 
                && this.state.interval == null ||  this.state.interval == "") {

                console.log("!!!")
                this.setState({timerOn: true, clockRunning: true, curTask: this.props.description});
                let i = setInterval(() => this.timeUpdate(), 1000);
                this.setState({interval: i});
            };
        };
    };

    render() {
        let question
        if (this.state.timerFinished) {
            question = 
                <div>
                    <p>Did you finish?</p>
                    <span className="card-action">
                        <span className="waves-effect waves-light btn" onClick={this.finishedHandleClick}>Yes</span>
                    </span>
                    <span className="card-action">
                        <span className="waves-effect waves-light btn" onClick={this.notFinHandleClick}>No</span>
                    </span>
                </div>
        };

        let timer
        if (this.state.timerOn){
            timer =  <p>{this.state.timeDisplay}</p>
        } else if (this.state.breakOn) {
            timer = <p>{this.state.breakTimeDisplay} </p>
        }

        let main
        if (this.state.timerOn || this.state.breakOn || this.state.timerFinished) {
            main = 
                <div className="row">
                    <div className="col s12 m6">
                        <div id="timer" className="card blue-grey lighten-3">
                            <div className="card-content grey-text text-darken-4">
                                <span className="card-title">Current Task: {this.state.curTask}</span>
                                {question}
                                {timer}
                            </div>
                        </div>
                    </div>
                </div>

        }

        return (
            <React.Fragment>
                {main}
            </React.Fragment>
        )
    }
}

export default Timer;