import React, { useRef, useEffect, useState } from "react";

import { player } from "../game/player";

const Canvas = ({ players }) => {
  const canvasRef = useRef(null);

  const [currentPlayer, setCurrentPlayer] = useState({});

  var keysPressed = [];

  const requestRef = React.useRef();

  const gameLoop = (time) => {
    if (!canvasRef.current) {
      return;
    }
    let ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    if (keysPressed && keysPressed.a) {
      player.addSpeedX(-.1);
    }
    if (keysPressed && keysPressed.d) {
      player.addSpeedX(.1);
    }
    if (keysPressed && keysPressed.w) {
      player.addSpeedY(-.1);
    }
    if (keysPressed && keysPressed.s) {
      player.addSpeedY(.1);
    }

    if (player) {
      player.animate();
    }

    if (player) {
      player.render(ctx);
    }
    // The 'state' will always be the initial value here
    requestRef.current = requestAnimationFrame(gameLoop);
  };

  useEffect(() => {
    console.log(player);
  }, [players]);


  useEffect(() => {
    canvasRef.current.addEventListener('mousemove', (event) => {
      console.log(event);
      var x = event.pageX - event.target.offsetLeft;
      var y = event.pageY - event.target.offsetTop;

      player.mouseX = x;
      player.mouseY = y;
    });
    window.addEventListener('mousedown', (event) => {
      keysPressed['click'] = true;
    });
    window.addEventListener('mouseup', (event) => {
      delete keysPressed['click'];
    });
    window.addEventListener('keydown', (event) => {
      keysPressed[event.key] = true;
    });
    document.addEventListener('keyup', (event) => {
        delete keysPressed[event.key];
    });
    requestRef.current = requestAnimationFrame(gameLoop);
    return () => { cancelAnimationFrame(requestRef.current); }
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        width="1920"
        height="1080"
        className="border max-w-full max-h-full drop-shadow-xl mx-auto my-auto"
      ></canvas>
    </>
  );
};

export default Canvas;
