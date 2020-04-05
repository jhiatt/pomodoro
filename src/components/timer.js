import React from 'react';


class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timerOn: this.props.timerOn, //should be false?
            timerStart: 0,
            timeLeft: .5 * 60000, //change from .5 to 25
            timeDisplay: "25 : 00",
            breakOn: false,
            breakTimeLeft: 5 * 60000,
            breakTimeDisplay: "5 : 00",
            compId: '',
            timerFinished: false
        };
        this.calTimeLeft = this.calTimeLeft.bind(this);
        this.timeUpdate = this.timeUpdate.bind(this);
        this.formatClock = this.formatClock.bind(this);
        this.finishedHandleClick = this.finishedHandleClick.bind(this);
        this.notFinHandleClick = this.notFinHandleClick.bind(this);
    }

    calTimeLeft(totalMin){
        // let totalTime = totalMin * (60000)
        // console.log("!!!!!!!!!!!!!!!!!!!!!")
        // console.log(totalTime)
        // let now = Date.now();
        // console.log((now))
        // console.log(this.state.timerStart)
        // let passed = now - this.state.timerStart;
        // console.log(passed)
        // let left = totalTime - passed;
        // console.log(left)
        // this.setState({timeLeft: left})
        // console.log(this.state.timeLeft)
        // this.interval = setInterval(() => this.timeUpdate(), 1000)
    }

    timeUpdate(){
        console.log(this.state.breakOn)
        if (this.state.timerOn) {
            const newTime = this.state.timeLeft - 1000;
            if (newTime >= 0) {
                this.setState({
                    timeLeft: newTime
                });
            } else {
                clearInterval(this.timeUpdate);
                this.setState({ timerFinished: true });
            }
            this.formatClock(this.state.timeLeft, false);
        } else if (this.state.breakOn) {
            const newTime = this.state.timeLeft - 1000;
            if (newTime >= 0) {
                this.setState({
                    breakTimeLeft: newTime
                });
            } else {
                clearInterval(this.timeUpdate);
                this.setState({ breakOn: false });
            }
            this.formatClock(this.state.breakTimeLeft, true);
        }
    };

    formatClock(time, isBreak) {
        let realTime = time / 1000;
        let minutes = Math.floor(realTime / 60);
        let seconds = realTime - minutes * 60;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        if (isBreak) {
            this.setState({breakTimeDisplay: `${minutes} : ${seconds}`})
        } else {
            this.setState({timeDisplay: `${minutes} : ${seconds}`})
        }
    };

    //handles and lifecycle
    finishedHandleClick(event) {
        this.props.compCall(this.props.id);
        this.setState({ timerOn: false, breakOn: true });
        this.interval = setInterval(() => this.timeUpdate(), 1000);
    };

    notFinHandleClick(event) {
        this.interval = setInterval(() => this.timeUpdate(), 1000);
        this.setState({ timerOn: false, breakOn: true });
    };

    componentDidMount() {
        this.calTimeLeft(25);
    };

    componentDidUpdate() {
        if (!this.state.timerOn) {
            if (this.props.timerOn) {
                this.setState({timerOn: this.props.timerOn});
                this.interval = setInterval(() => this.timeUpdate(), 1000)
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
        if (this.state.timerOn || this.state.breakOn) {
            main = 
                <div className="row">
                    <div className="col s12 m6">
                        <div id="timer" className="card blue-grey lighten-3">
                            <div className="card-content grey-text text-darken-4">
                                <span className="card-title">Current Task: {this.props.description}</span>
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