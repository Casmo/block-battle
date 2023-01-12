import React, { useState, useEffect } from "react";
import { Peer } from "peerjs";
import Copy from "./Copy";
import Canvas from "./Canvas";

const Game = ({ changePage, settings }) => {
  const [type, setType] = useState();
  const [code, setCode] = useState("");
  const [players, setPlayers] = useState([]);
  const [peer] = useState(new Peer());
  const [conn, setConn] = useState();
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let gameType = "host";
    if (settings && settings.code) {
      setCode(settings.code);
      gameType = "player";
    }
    setType(gameType);
  }, [settings]);

  useEffect(() => {
    if (!type || !peer) {
      return;
    }
    peer.on("close", () => {
      setStatus("disconnected");
    });
    if (type === "host") {
      peer.on("open", (id) => {
        setCode(id);
        setStatus("connected");
      });
      peer.on("connection", (connPlayer) => {
        console.log("player connected");
        connPlayer.on("data", function (data) {
          // Will print 'hi!'
          console.log("data received from player", data);
          console.log(this);
          // connection id: this.connectionId
        });
        // let player = {
        //   conn: connPlayer,
        // };
        setPlayers((currentPlayers) => [
          ...currentPlayers,
          { conn: connPlayer },
        ]);
        // setPlayers([...players, player]);
      });
    } else if (type === "player") {
      peer.on("open", (id) => {
        setStatus("connected");
        let conn = peer.connect(code);
        conn.on("open", () => {
          // here you have conn.id
          console.log("connected");
        });
        conn.on("data", (data) => {
          // here you have conn.id
          console.log("data received from host", data);
        });
        setConn(conn);
      });
    }
  }, [type, peer]);

  const disconnect = () => {
    peer.disconnect();
    changePage("menu");
  };

  const sendMessage = () => {
    console.log(players);
    if (type === "player") {
      conn.send({ test: "bla", test2: { deep: true } });
    } else if (players.length > 0) {
      for (let i = 0; i < players.length; i++) {
        let peer = players[i];
        console.log(peer);
        peer.conn.send("yo to peers");
      }
    }
  };

  return (
    <div className="h-full flex items-center justify-center">
      <Canvas players={players} />
      <div className="fixed top-1 right-1">
        <svg
          onClick={disconnect}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="cursor-pointer w-12 h-12"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <div className="fixed" onClick={sendMessage}>Click me</div>
      {type === "host" && players.length > 0 && (
        <div>
          Players: {players.length}
          {players && (
            <div>
              {players.map((player, index) => (
                <div key={index}>Player: {player.conn.connectionId}</div>
              ))}
            </div>
          )}
        </div>
      )}
      <div className="fixed bottom-1 left-1">
        Code: {code}
        {code && <Copy text={code} />}
        {status}
      </div>
    </div>
  );
};

export default Game;
