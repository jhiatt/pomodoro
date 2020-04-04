import React from 'react';


class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timerOn: true, //change this to false
            timerStart: this.props.startTime,
            timeLeft: .5 * 60000,
            timeDisplay: "",
            breakOn: false,
            breakTimeLeft: 5 * 60000,
            breakTimeDisplay: "5 : 00"
        };
        this.calTimeLeft = this.calTimeLeft.bind(this);
        this.timeUpdate = this.timeUpdate.bind(this);
        this.formatClock = this.formatClock.bind(this);
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
        this.interval = setInterval(() => this.timeUpdate(), 1000)
    }

    timeUpdate(){
        if (this.state.timerOn) {
            const newTime = this.state.timeLeft - 1000;
            if (newTime >= 0) {
                this.setState({
                    timeLeft: newTime
                });
            } else {
                clearInterval(this.timeUpdate);
                this.setState({ timerOn: false, breakOn: true });
                this.interval = setInterval(() => this.timeUpdate(), 1000)
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
                this.setState({ timerOn: false, breakOn: true });
            }
            this.formatClock(this.state.breakTimeLeft, true);
        }
    }

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
    }

    componentDidMount() {
        this.calTimeLeft(25);
    }

    render() {
        return (

            <div className="row">
                <div className="col s12 m6">
                    <div id="timer" className="card blue-grey lighten-3">
                        <div className="card-content grey-text text-darken-4">
                            <span className="card-title">Current Task: {this.state.timeDisplay}</span>
                            <p>Break: {this.state.breakTimeDisplay} </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Timer;