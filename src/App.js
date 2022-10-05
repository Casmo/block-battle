import './App.css';
import React, { Component } from 'react';
import Menu from './Components/Menu';
import Game from './Components/Game';

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      page: 'menu',
    };
    document.body.classList.add(
      'bg-black',
    );

    this.changePage = this.changePage.bind(this);
  }

  changePage(page) {
    this.setState({
      page: page
    })
  }

  render() {
    return (
      <div className="h-screen w-screen">
        { this.state.page === 'menu' && (
          <Menu changePage = {this.changePage}></Menu>
        ) }
        { this.state.page === 'game' && (
          <Game changePage = {this.changePage}></Game>
        ) }
      </div>
    );
  }
}

export default App;
