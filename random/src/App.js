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

    render() {
        return (
            <div className="gameWindow">

                <GameStart
                    upper={this.state.upper}
                    setRandomNumber={this.setRandomNumber}
                />

                <ChatBox />

                <MainGame />

            </div>
        );
    }
}

export default App;