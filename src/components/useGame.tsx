import type React from 'react';
import { useState, useEffect } from 'react';

const useGame = () => {
  const directions = [
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1],
    [-1, -1],
    [-1, 0],
    [-1, 1],
  ];

  const create2Darray = (width: number, hight: number, number: number) => {
    const result = [];
    for (let row = 0; row < hight; row++) {
      const resultRow = [];
      for (let rowcount = 0; rowcount < width; rowcount++) {
        resultRow.push(number);
      }
      result.push(resultRow);
    }
    return result;
  };

  function getRandomCoordinates(levelchange: number[]): [number, number] {
    const xs = Math.floor(Math.random() * levelchange[0]);
    const ys = Math.floor(Math.random() * levelchange[1]);
    return [ys, xs];
  }

  const bombPlace = (x: number, y: number, bombMap: number[][], levelchange: number[]) => {
    const getBombPlace: [number, number][] = [];
    while (getBombPlace.length < levelchange[2]) {
      const [ys, xs] = getRandomCoordinates(levelchange);
      let exists = false;
      for (const [yb, xb] of getBombPlace) {
        if (xb === xs && yb === ys) {
          exists = true;
          break;
        }
      }
      if (!exists && !(x === xs && y === ys)) {
        console.log('ボマー', xs, ys);
        getBombPlace.push([ys, xs]);
        bombMap[ys][xs] = 11;
      }
    }
    return bombMap;
  };

  const numberPlace = (bombMap: number[][], levelchange: number[]) => {
    for (let a = 0; a < levelchange[0]; a++) {
      for (let b = 0; b < levelchange[1]; b++) {
        let count = 0;
        if (bombMap[b][a] === -2) {
          bombMap[b][a] = 0;
        }
        for (const direction of directions) {
          const dx = direction[0];
          const dy = direction[1];
          if (
            bombMap[b + direction[1]] !== undefined &&
            bombMap[b + dy][a + dx] === 11 &&
            bombMap[b][a] !== 11
          ) {
            count++;
            continue;
          }
        }
        if (bombMap[b][a] !== 11) {
          bombMap[b][a] = count;
          count = 0;
        }
      }
    }
    return bombMap;
  };

  const cheackBlank = (
    x: number,
    y: number,
    firstMap: number[][],
    bombMap: number[][],
    levelchange: number[],
  ) => {
    if (firstMap[y][x] === 0 && bombMap[y][x] !== 0) {
      console.log('click', y, x);
      firstMap[y][x] = -30;
    }
    if ((firstMap[y][x] === 0 || firstMap[y][x] === 10) && bombMap[y][x] === 0) {
      firstMap[y][x] = -30;
      for (const direction of directions) {
        if (
          firstMap[y + direction[1]] !== undefined &&
          bombMap[y + direction[1]][x + direction[0]] === 0
        ) {
          cheackBlank(x + direction[0], y + direction[1], firstMap, bombMap, levelchange);
        }
        if (
          firstMap[y + direction[1]] !== undefined &&
          bombMap[y + direction[1]][x + direction[0]] !== 0
        ) {
          firstMap[y + direction[1]][x + direction[0]] = -30;
        }
      }
    }
    if (levelchange[2] === firstMap.flat().filter((cell) => cell !== -30).length) {
      for (let a = 0; a < levelchange[0]; a++) {
        for (let b = 0; b < levelchange[1]; b++) {
          if (bombMap[b][a] === 11) {
            firstMap[b][a] = 10;
          }
        }
      }
    }
    return firstMap;
  };

  const gameOverMap = (bombMap: number[][], firstMap: number[][], levelchange: number[]) => {
    for (let a = 0; a < levelchange[0]; a++) {
      for (let b = 0; b < levelchange[1]; b++) {
        if (firstMap[b][a] === 0) {
          firstMap[b][a] = 99;
          if (bombMap[b][a] === 11) {
            firstMap[b][a] = -30;
          }
        }
        if (firstMap[b][a] === 10 && bombMap[b][a] !== 11) {
          bombMap[b][a] = 50;
        }
      }
    }
    return firstMap;
  };

  const gameOverFinish = (firstMap: number[][], bombMap: number[][], levelchange: number[]) => {
    for (let a = 0; a < levelchange[0]; a++) {
      for (let b = 0; b < levelchange[1]; b++) {
        if (firstMap[b][a] === -30 && bombMap[b][a] === 11) {
          return true;
        }
      }
    }
    // return false;
  };

  const [firstMap, setuserClick] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  const [bombMap, setuserInput] = useState([
    [-2, -2, -2, -2, -2, -2, -2, -2, -2],
    [-2, -2, -2, -2, -2, -2, -2, -2, -2],
    [-2, -2, -2, -2, -2, -2, -2, -2, -2],
    [-2, -2, -2, -2, -2, -2, -2, -2, -2],
    [-2, -2, -2, -2, -2, -2, -2, -2, -2],
    [-2, -2, -2, -2, -2, -2, -2, -2, -2],
    [-2, -2, -2, -2, -2, -2, -2, -2, -2],
    [-2, -2, -2, -2, -2, -2, -2, -2, -2],
    [-2, -2, -2, -2, -2, -2, -2, -2, -2],
  ]);

  const [levelchange, setlevelchange] = useState([9, 9, 10]);
  const [val, setVal] = useState([30, 10, 15]);

  const [isCostom, setCostom] = useState(false);

  const [isTimeCount, setTimeCount] = useState(0);
  const [timerId, setTimerId] = useState<number | null>(null); // タイマーID用のState

  useEffect(() => {
    const isGameCleared = levelchange[2] === firstMap.flat().filter((cell) => cell !== -30).length;
    if (gameOverFinish(firstMap, bombMap, levelchange) || isGameCleared) {
      if (timerId !== null) {
        clearInterval(timerId);
      }
    }
  }, [bombMap, firstMap, levelchange, timerId]);

  const startTimer = () => {
    if (timerId !== null) {
      clearInterval(timerId);
    }
    const id = window.setInterval(() => {
      console.log('AA');
      setTimeCount((prev) => prev + 1);
    }, 1000);
    setTimerId(id);
  };

  const hanleChange = (index: number, value: number) => {
    const newVal = structuredClone(val);
    newVal[index] = value;
    setVal(newVal);
  };

  const levelboard = (level: number) => {
    if (level === 0) {
      setCostom(false);
      setlevelchange([9, 9, 10]);
      setuserClick(create2Darray(9, 9, 0));
      setuserInput(create2Darray(9, 9, -2));
    } else if (level === 1) {
      setCostom(false);
      setlevelchange([16, 16, 40]);
      setuserClick(create2Darray(16, 16, 0));
      setuserInput(create2Darray(16, 16, -2));
    } else if (level === 2) {
      setCostom(false);
      setlevelchange([30, 16, 99]);
      setuserClick(create2Darray(30, 16, 0));
      setuserInput(create2Darray(30, 16, -2));
    } else if (level === 3) {
      setCostom(true);
      setlevelchange([30, 10, 15]);
      setuserClick(create2Darray(30, 10, 0));
      setuserInput(create2Darray(30, 10, -2));
    } else if (level === 4) {
      setCostom(true);
      setlevelchange([val[0], val[1], val[2]]);
      setuserClick(create2Darray(val[0], val[1], 0));
      setuserInput(create2Darray(val[0], val[1], -2));
    }
  };

  const handleReload = () => {
    const numbercleaned = structuredClone(firstMap);
    const bombcleaned = structuredClone(bombMap);
    if (bombMap !== undefined && firstMap !== undefined) {
      for (let i = 0; i < bombMap.length; i++) {
        for (let j = 0; j < bombMap[i].length; j++) {
          bombcleaned[i][j] = -2;
          numbercleaned[i][j] = 0;
        }
      }
    }
    if (timerId !== null) {
      clearInterval(timerId); // タイマーをリセット
    }
    setTimerId(null); // タイマーIDをリセット
    setTimeCount(0);
    // setGameOver(false);
    setuserClick(numbercleaned);
    setuserInput(bombcleaned);
  };

  const rightClick = (event: React.MouseEvent<HTMLButtonElement>, x: number, y: number) => {
    if (
      gameOverFinish(firstMap, bombMap, levelchange) !== true &&
      levelchange[2] !== firstMap.flat().filter((cell) => cell !== -30).length
    ) {
      const rightClicked = structuredClone(firstMap);
      event.preventDefault();
      if (rightClicked[y][x] === 0) {
        rightClicked[y][x] = 10;
        console.log(rightClicked);
      } else if (rightClicked[y][x] === 10) {
        rightClicked[y][x] = 0;
      }
      setuserClick(rightClicked);
    }
  };

  let bombfinish = structuredClone(bombMap);

  const clickHandler = (x: number, y: number) => {
    if (
      firstMap[y][x] !== 100 &&
      firstMap[y][x] !== 10 &&
      levelchange[2] !== firstMap.flat().filter((cell) => cell !== -30).length
    ) {
      if (bombMap[y][x] === -2) {
        startTimer(); // タイマーを開始
        const newBoard = structuredClone(bombMap);
        const newbombPlaed = bombPlace(x, y, newBoard, levelchange);
        const newnumber = numberPlace(newbombPlaed, levelchange);
        bombfinish = newnumber;
        setuserInput(bombfinish);
      }
      if (firstMap[y][x] === 0 && bombMap[y][x] !== 11) {
        const clickBord = structuredClone(firstMap);
        const cheackedBlank = cheackBlank(x, y, clickBord, bombfinish, levelchange);
        setuserClick(cheackedBlank);
      }
      if (firstMap[y][x] === 0 && bombMap[y][x] === 11) {
        const gameOverBoard = structuredClone(firstMap);
        const gameOvered = gameOverMap(bombMap, gameOverBoard, levelchange);
        bombMap[y][x] = -100;
        // setGameOver(true);
        setuserClick(gameOvered);
      }
    }
  };

  return {
    isCostom,
    isTimeCount,
    bombMap,
    firstMap,
    val,
    levelchange,
    clickHandler,
    create2Darray,
    bombPlace,
    numberPlace,
    cheackBlank,
    gameOverMap,
    gameOverFinish,
    startTimer,
    hanleChange,
    levelboard,
    handleReload,
    rightClick,
  };
};
export default useGame;
