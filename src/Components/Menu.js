import React, { Component } from "react";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.startGame = this.startGame.bind(this);
  }

  startGame() {
    this.props.changePage('game');
  }

  render() {
    return (
      <div className="h-full bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500">
        <div className="h-full max-w-3xl mx-auto py-10">
          <div onClick={this.startGame} className="p-4 flex items-center justify-center shadow-lg rounded-lg bg-yellow-400 text-yellow-900 hover:bg-yellow-500 cursor-pointer">
            Start
          </div>
        </div>
      </div>
    );
  }
}

export default Menu;
