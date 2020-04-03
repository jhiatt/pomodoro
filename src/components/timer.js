import React from 'react';


class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timerOn: false,
            timerStart: this.props.startTime,
            timeLeft: this.props.startTime //change
        };
    }


    render() {
        return (
            <div>{Date(this.state.timeLeft)}</div>
        )
    }
}

export default Timer;