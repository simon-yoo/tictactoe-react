'use client';
import { useState } from 'react';
export default function Home() {
  // each box
  const [boxes, setBoxes] = useState(['', '', '', '', '', '', '', '', '']);
  // players turn
  const [player, setPlayer] = useState<'O' | 'X'>('O');
  // If game is over
  const [isOver, setIsOver] = useState(false);

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

  function checkForWin(symbol: string) {
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
      if (
        (boxes[a] === 'O' && boxes[b] === 'O' && boxes[c] === 'O') ||
        (boxes[a] === 'X' && boxes[b] === 'X' && boxes[c] === 'X')
      ) {
        setIsOver(true);
      }
    }

    return setIsOver(false);
  }

  const clickRestart = () => {
    const newArray = ['', '', '', '', '', '', '', '', ''];
    setBoxes(newArray);
  };

  return (
    <div className='flex flex-col items-center'>
      <h1>TICTACTOE</h1>
      {!isOver}

      <table className='border-spacing-0 border-collapse w-[500px] h-[500px]'>
        <tr>
          {boxes.slice(0, 3).map((item, idx) => (
            <td
              key={idx}
              className='border-2 border-black text-center w-[8vw] h-[8vh] text-5xl'
              onClick={() => (!isOver ? handleClick(idx) : {})}
            >
              {item}
            </td>
          ))}
        </tr>
        <tr>
          {boxes.slice(3, 6).map((item, idx) => (
            <td
              key={idx + 3}
              className='border-2 border-black text-center w-[8vw] h-[8vh] text-5xl'
              onClick={() => (!isOver ? handleClick(idx + 3) : {})}
            >
              {item}
            </td>
          ))}
        </tr>
        <tr>
          {boxes.slice(6, 9).map((item, idx) => (
            <td
              key={idx + 6}
              className='border-2 border-black text-center w-[8vw] h-[8vh] text-5xl'
              onClick={() => (!isOver ? handleClick(idx + 6) : {})}
            >
              {item}
            </td>
          ))}{' '}
        </tr>
      </table>
      <div className='flex '>
        <h2 className='mr-2'>{player}'s </h2>
        <span> turn</span>
      </div>
      <button onClick={clickRestart}>Restart</button>
    </div>
  );
}
