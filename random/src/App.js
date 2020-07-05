import React, { Component } from 'react';

class App extends Component {
    render() {
        return (
            <div className="gameWindow">

                <gameStart />

                <chatBox />

                <mainGame />

            </div>
        );
    }
}

export default App;