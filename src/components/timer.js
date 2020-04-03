import React from 'react';


class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timerOn: false,
            timerStart: this.props.startTime,
            timeLeft: 0
        };
    }

    calTimeLeft(totalMin){
        let totalTime = totalMin * (1000 * 60)
        let now = Date.now();
        let passed = now - this.state.timerStart;
        let left = totalTime - passed;
        this.setState({timeLeft: left})
    }

    componentDidMount() {
        this.interval = setInterval(() => this.calTimeLeft(25), 1000);
    }

    render() {
        return (
            <div>{Date(this.state.timeLeft)}</div>
        )
    }
}

export default Timer;