import React, { Component } from 'react';
import GameStart from './components/GameStart';
import ChatBox from './components/ChatBox';
import MainGame from './components/MainGame';

class App extends Component {
    
    state = {
        upper: 20
    }

    setRandomNumber = () => {
        this.setState( () => ({
            randomNumber: Math.floor(Math.random() * this.upper) + 1
        }));
    }

    tSec = (end, start) => {
        let timeDiff = end - start;
        timeDiff /= 1000;
        let tSec = Math.round(timeDiff);
        return tSec;
     }

    render() {
        return (
            <div className="gameWindow">

                <GameStart
                    upper={this.state.upper}
                    setRandomNumber={this.setRandomNumber}
                    tSec={this.tSec}
                />

                <ChatBox />

                <MainGame />

            </div>
        );
    }
}

export default App;