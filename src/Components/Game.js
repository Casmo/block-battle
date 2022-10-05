import React, { Component } from "react";
import { Peer } from "peerjs";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.uniqueId = '1234abctestaaadf';
    this.state = {
      status: 'loading',
      peers: [],
      host: null
    };
    this.returnToMenu = this.returnToMenu.bind(this);

    this.sendMessage = this.sendMessage.bind(this);
  }

  componentDidMount() {
    this.connect();
  }

  componentWillUnmount() {
    this.disconnect();
  }

  disconnect() {
    this.peer.disconnect();
    this.setState({
      host: null
    });
  }

  connect(id) {
    id = id || false;
    if (!id) {
      this.peer = new Peer();
    }
    else {
      this.peer = new Peer(id);
    }
    console.log('connect', id);
    this.peer.on('error', (error) => {
      console.log(error);
      this.disconnect();
      this.connect(this.uniqueId);
    });
    this.peer.on('open', () => {
      this.setState({
        status: 'connecting'
      });
      if (id !== this.uniqueId) {
        let host = this.peer.connect(this.uniqueId);
        host.on("data", (data) => {
          console.log(data, 'from host');
        });
        this.setState({
          host: host
        });
      }
      else {
        this.setState({
          status: 'Connected... Waiting for peers...'
        });
      }
    });
    this.peer.on('disconnect', (response) => {
      console.log('disconnected');
      this.setState({
        status: 'disconnected'
      })
    });
    this.peer.on('connection', (conn) => {
      console.log('peer connected...');
      conn.on("data", (data) => {
        console.log(data, 'from peer', conn);
      });
      conn.on("open", () => {
      });
      let peers = this.state.peers;
      peers.push(conn);
      this.setState({
        peers: peers
      });
    });
  }

  sendMessage() {
    if (this.state.host) {
      this.state.host.send('yo 1');
    }
    else if (this.state.peers.length > 0) {
      for (let i = 0; i < this.state.peers.length; i++) {
        let peer = this.state.peers[i];
        peer.send('yo to peers');
      }
    }
  }

  returnToMenu() {
    this.props.changePage('menu');
  }

  render() {
    return (
      <div className="h-full bg-gradient-to-r from-red-400 via-blue-500 to-green-500">
        <div className="fixed top-1 right-1">
          <svg onClick={this.returnToMenu} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="cursor-pointer w-12 h-12">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>

        </div>
        <div onClick={this.sendMessage}>KLik me</div>
        <div className="fixed bottom-1 left-1">
          { this.state.status }
        </div>
      </div>
    );
  }
}

export default Menu;
