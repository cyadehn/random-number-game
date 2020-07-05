import React, { Component } from 'react';
import GameStart from './components/GameStart';
import ChatBox from './components/ChatBox';
import MainGame from './components/MainGame';

class App extends Component {
    render() {
        return (
            <div className="gameWindow">

                <GameStart />

                <ChatBox />

                <MainGame />

            </div>
        );
    }
}

export default App;