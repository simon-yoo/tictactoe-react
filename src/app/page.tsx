'use client';
import { useEffect, useState } from 'react';
export default function Home() {
  // each box
  const [boxes, setBoxes] = useState(['', '', '', '', '', '', '', '', '']);
  // players turn
  const [player, setPlayer] = useState<'O' | 'X'>('O');
  // If game is over
  const [isOver, setIsOver] = useState(false);
  //if game draw
  const [isDraw, setIsDraw] = useState(false);

  const handleClick = (idx: number) => {
    const newArray = [...boxes];
    // if clicked on a not empty box do not change value
    newArray[idx] = boxes[idx] === '' ? player : boxes[idx];
    //if nothing changed do not change turn/values of the box
    if (newArray.some((item, idx) => item !== boxes[idx])) {
      setPlayer((prev) => (prev == 'O' ? 'X' : 'O'));
      setBoxes(newArray);
    }
  };

  const checkForWin = (symbol: string) => {
    const winningSets = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let set of winningSets) {
      const [a, b, c] = set;
      if (boxes[a] === symbol && boxes[b] === symbol && boxes[c] === symbol) {
        setIsOver(true);
      }
    }
  };

  function checkDraw() {
    let allFilled = true;
    boxes.forEach((item) => {
      if (item.length == 0) allFilled = false;
    });
    if (!allFilled && !isOver) {
      return false;
    } else if (allFilled && !isOver) {
      setIsDraw(true);
      setIsOver(true);
      return true;
    }
  }

  useEffect(() => {
    checkForWin(player === 'O' ? 'X' : 'O');
    checkDraw();
  }, [player]);

  return (
    <div className='flex flex-col items-center h-full mb-12'>
      <h1 className='text-5xl font-bold m-6'>TICTACTOE</h1>

      {(isOver || isDraw) && (
        <div className='flex flex-col'>
          {!isDraw && (
            <h1 className='m-4 text-2xl font-semibold border-2 border-gray-400 py-4 px-8 shadow-2xl animate-bounce '>
              {player == 'X' ? 'O' : 'X'} is the Winner!
            </h1>
          )}
          {isDraw && (
            <h1 className='m-4 text-2xl font-semibold border-2 border-gray-400 py-4 px-8 shadow-2xl animate-bounce '>
              DRAW!!!
            </h1>
          )}
          <button
            className='border-2 m-8 p-4 cursor-pointer hover:bg-black hover:text-white hover:rounded-lg scale-105 ease-in-out duration-300'
            onClick={() => {
              setBoxes(['', '', '', '', '', '', '', '', '']);
              setIsOver(false);
              setIsDraw(false);
            }}
          >
            Restart
          </button>
        </div>
      )}

      {!isOver && (
        <>
          {' '}
          <div className='flex m-12 text-2xl'>
            <h2 className='text-red-400'>{player}</h2>
            <span>'s turn</span>
          </div>
        </>
      )}

      <table className='flex flex-col justify-between w-[700px] h-[700px]'>
        <tr className='flex justify-between'>
          {boxes.slice(0, 3).map((item, idx) => (
            <td
              key={idx}
              className='flex justify-center items-center cursor-pointer hover:scale-110 focus:scale-110 ease-in-out duration-200 hover:rounded-2xl active:bg-black shadow-2xl border-2 border-black  w-[200px] h-[200px] text-5xl'
              onClick={() => (!isOver ? handleClick(idx) : {})}
            >
              {item}
            </td>
          ))}
        </tr>
        <tr className='flex justify-between'>
          {boxes.slice(3, 6).map((item, idx) => (
            <td
              key={idx + 3}
              className='flex justify-center items-center cursor-pointer hover:scale-110 focus:scale-110 ease-in-out duration-200 hover:rounded-2xl active:bg-black shadow-2xl border-2 border-black  w-[200px] h-[200px] text-5xl'
              onClick={() => (!isOver ? handleClick(idx + 3) : {})}
            >
              {item}
            </td>
          ))}
        </tr>
        <tr className='flex justify-between'>
          {boxes.slice(6, 9).map((item, idx) => (
            <td
              key={idx + 6}
              className='flex justify-center items-center cursor-pointer hover:scale-110 focus:scale-110 ease-in-out duration-200 hover:rounded-2xl active:bg-black shadow-2xl border-2 border-black  w-[200px] h-[200px] text-5xl'
              onClick={() => (!isOver ? handleClick(idx + 6) : {})}
            >
              {item}
            </td>
          ))}{' '}
        </tr>
      </table>
    </div>
  );
}
