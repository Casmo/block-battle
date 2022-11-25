import React, { useState, useEffect } from "react";
import { Peer } from "peerjs";
import Copy from "./Copy";

const Game = ({ changePage, settings }) => {

  const [ type, setType ] = useState();
  const [ code, setCode ] = useState('');
  const [ players, setPlayers ] = useState([]);
  const [ peer, setPeer ] = useState(new Peer());
  const [ conn, setConn ] = useState();
  const [ status, setStatus ] = useState('loading');

  useEffect(() => {
    let gameType = 'host';
    if (settings && settings.code) {
      setCode(settings.code);
      gameType = 'player';
    }
    setType(gameType);

  }, [settings]);

  useEffect(() => {
    console.log(peer);
  }, [peer]);

  useEffect(() => {
    if (!type) {
      return;
    }
    peer.on('close', () => {
      setStatus('disconnected');
    });
    if (type == 'host') {
      peer.on('open', (id) => {
        setCode(id);
        setStatus('connected');
      });
      peer.on('connection', (connPlayer) => {
console.log('player connected');
        connPlayer.on('data', (data) => {
          // Will print 'hi!'
          console.log('data received from player', data);
        });
        let player = {
          conn: connPlayer
        }
        players.push({
          conn: connPlayer
        });
        console.log(player);
        setPlayers(players);
      });
    }
    else if (type == 'player') {
      peer.on('open', (id) => {
        setStatus('connected');
        let conn = peer.connect(code);
        conn.on('open', () => {
          // here you have conn.id
          console.log('connected');
        });
        setConn(conn);
      });
    }
    console.log(type);
  }, [type]);
  const disconnect = () => {
    this.peer.disconnect();
    this.setState({
      host: null
    });
  }

  const connect = (id) => {
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

  const sendMessage = () => {
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

  const returnToMenu = () => {
    changePage('menu');
  }

    return (
      <div className="h-full bg-gradient-to-r from-sky-900 via-sky-700 to-sky-800">
        <div className="fixed top-1 right-1">
          <svg onClick={returnToMenu} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="cursor-pointer w-12 h-12">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>

        </div>
        <div onClick={sendMessage}>KLik me</div>
        <div>
          Players:
          {players && players.map((player, index) => (
                  <div key={index}>
                    Player: {player.conn.connectionId}
                  </div>
          ))}
        </div>
        <div className="fixed bottom-1 left-1">
          Code: { code }
          { code && <Copy text={code} /> }
          { status }
        </div>
      </div>
    );
}

export default Game;
