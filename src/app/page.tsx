'use client';
import { useState } from 'react';
export default function Home() {
  const [boxes, setBoxes] = useState(['', '', '', '', '', '', '', '', '']);
  return (
    <div className='flex flex-col items-center'>
      <h1>TICTACTOE</h1>

      <table className='w-[600px] h-[600px]'>
        <tr>
          {boxes.slice(0, 3).map((item, idx) => (
            <td key={idx} className='border-2 border-black w-[8vw] h-[8vh]'>
              {item}
            </td>
          ))}
        </tr>
        <tr>
          {boxes.slice(0, 3).map((item, idx) => (
            <td
              key={idx}
              className='border-2 border-black text-center w-[8vw] h-[8vh]'
            >
              {item}
            </td>
          ))}
        </tr>
        <tr>
          {boxes.slice(0, 3).map((item, idx) => (
            <td
              key={idx}
              className='border-2 border-black text-center w-[8vw] h-[8vh]'
            >
              {item}
            </td>
          ))}
        </tr>
      </table>
    </div>
  );
}
