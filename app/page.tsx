"use client";

import { useEffect, useState } from "react";

type AnzanProps = {
  leftNumber: number;
  rightNumber: number;
  setIsCorrect: React.Dispatch<React.SetStateAction<boolean>>;
  setCounter: React.Dispatch<React.SetStateAction<number>>;
};

const Anzan: React.FC<AnzanProps> = ({
  leftNumber,
  rightNumber,
  setIsCorrect,
}) => {
  const correctNumber = leftNumber * rightNumber;
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputNumber: number = Number(e.target.value);
    if (inputNumber === correctNumber) {
      setIsCorrect(true);
      e.target.value = "";
    }
  };
  return (
    <>
      <div className="text-3xl">
        {leftNumber} * {rightNumber} =
        <input className="mx-2" type="number" onChange={onChange} autoFocus />
      </div>
    </>
  );
};

// 10 to 99 number
const generateNumber = (): number[] => {
  const leftNumber = Math.floor(Math.random() * 90 + 10);
  const rightNumber = Math.floor(Math.random() * 90 + 10);
  return [leftNumber, rightNumber];
};

const Home = () => {
  const [leftNumger, setLeftNumber] = useState<number>(0);
  const [rightNumger, setRightNumber] = useState<number>(0);
  const [isCorrect, setIsCorrect] = useState<boolean>(true);
  const [counter, setCounter] = useState<number>(-1);

  const nextAnzan = () => {
    const [leftNumber, rightNumber] = generateNumber();
    setLeftNumber(leftNumber);
    setRightNumber(rightNumber);
  };

  useEffect(() => {
    if (isCorrect) {
      setCounter(counter + 1);
      nextAnzan();
      setIsCorrect(false);
    }
  }, [isCorrect]);

  return (
    <>
      <div className="h-screen flex justify-center items-center">
        {leftNumger > 0 && rightNumger > 0 && (
          <>
            <div className="text-center">
              <div className="text-2xl mb-10">{counter}</div>
              <Anzan
                leftNumber={leftNumger}
                rightNumber={rightNumger}
                setIsCorrect={setIsCorrect}
                setCounter={setCounter}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Home;
