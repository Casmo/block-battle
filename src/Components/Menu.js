import React, { useRef } from "react";

const Menu = ({ changePage }) => {

  const inputCode = useRef(null);

  const startGame = () => {
    changePage('game');
  }

  const joinGame = () => {
    changePage('game', {
      code: inputCode.current.value
    });
  }

    return (
      <div className="h-full">
        <div className="h-full max-w-3xl mx-auto py-10">
          <div onClick={startGame} className="p-4 flex items-center justify-center shadow-lg rounded-lg bg-yellow-400 text-yellow-900 hover:bg-yellow-500 cursor-pointer">
            Host game
          </div>
          <div className="flex items-center mt-2">
            <div className="flex-1"><hr className="mt-2 h-px bg-white border-0" /></div>
              <div className="flex-grow-0 m-2 mb-0">or</div>
              <div className="flex-1"><hr className="mt-2 h-px bg-white border-0" /></div>
          </div>
          <input ref={inputCode} className="mt-4 block w-full text-center border-gray p-4 rounded-md shadow-md" placeholder="enter game code" />
          <div onClick={joinGame} className="mt-2 p-4 flex items-center justify-center shadow-lg rounded-lg bg-yellow-400 text-yellow-900 hover:bg-yellow-500 cursor-pointer">
            Join game
          </div>
        </div>
      </div>
    );
}

export default Menu;