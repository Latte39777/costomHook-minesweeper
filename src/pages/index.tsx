import { useState, useEffect } from 'react';
import styles from './index.module.css';

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
    const x = [];
    for (let rowcount = 0; rowcount < width; rowcount++) {
      x.push(number);
    }
    result.push(x);
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
      bombMap[ys][xs] = -1;
    }
  }
  return bombMap;
};

const numberPlace = (bombMap: number[][], levelchange: number[]) => {
  let count = 0;
  for (let a = 0; a < levelchange[0]; a++) {
    for (let b = 0; b < levelchange[1]; b++) {
      if (bombMap[b][a] === -2) {
        bombMap[b][a] = 0;
      }
      for (const direction of directions) {
        const dx = direction[0];
        const dy = direction[1];
        if (
          bombMap[b + direction[1]] !== undefined &&
          bombMap[b + dy][a + dx] === -1 &&
          bombMap[b][a] !== -1
        ) {
          count++;
          continue;
        }
      }
      if (bombMap[b][a] !== -1) {
        bombMap[b][a] = count;
        count = 0;
      }
    }
  }
  return bombMap;
};

const cheackBlank = (x: number, y: number, firstMap: number[][], bombMap: number[][]) => {
  if (firstMap[y][x] === 0 && bombMap[y][x] !== 0) {
    console.log('click', y, x);
    firstMap[y][x] = 1;
  }
  if ((firstMap[y][x] === 0 || firstMap[y][x] === 2) && bombMap[y][x] === 0) {
    firstMap[y][x] = 1;
    for (const direction of directions) {
      if (
        firstMap[y + direction[1]] !== undefined &&
        bombMap[y + direction[1]][x + direction[0]] === 0
      ) {
        cheackBlank(x + direction[0], y + direction[1], firstMap, bombMap);
      }
      if (
        firstMap[y + direction[1]] !== undefined &&
        bombMap[y + direction[1]][x + direction[0]] !== 0
      ) {
        firstMap[y + direction[1]][x + direction[0]] = 1;
      }
    }
  }
  return firstMap;
};

const gameOverMap = (bombMap: number[][], firstMap: number[][], levelchange: number[]) => {
  for (let a = 0; a < levelchange[0]; a++) {
    for (let b = 0; b < levelchange[1]; b++) {
      if (firstMap[b][a] === 0) {
        firstMap[b][a] = 10;
        if (bombMap[b][a] === -1) {
          firstMap[b][a] = 1;
        }
      }
      if (firstMap[b][a] === 2 && bombMap[b][a] !== -1) {
        bombMap[b][a] = 50;
      }
    }
  }
  return firstMap;
};

const Home = () => {
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

  const [gameOver, setGameOver] = useState(false);
  const [levelchange, setlevelchange] = useState([9, 9, 10]);
  const [val, setVal] = useState([30, 10, 15]);
  const [isCostom, setCostom] = useState(false);

  const [isTimeCount, setTimeCount] = useState(0);
  const [timerId, setTimerId] = useState<number | null>(null); // タイマーID用のState

  useEffect(() => {
    const isGameCleared = levelchange[2] === firstMap.flat().filter((cell) => cell !== 1).length;
    if (gameOver || isGameCleared) {
      if (timerId !== null) {
        clearInterval(timerId);
      }
    }
  }, [gameOver, firstMap, levelchange, timerId]);

  const startTimer = () => {
    if (timerId !== null) {
      clearInterval(timerId);
    }
    const id = window.setInterval(() => {
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
    setGameOver(false);
    setuserClick(numbercleaned);
    setuserInput(bombcleaned);
  };

  const rightClick = (event: React.MouseEvent<HTMLDivElement>, x: number, y: number) => {
    if (
      gameOver !== true &&
      levelchange[2] !== firstMap.flat().filter((cell) => cell !== 1).length
    ) {
      const rightClicked = structuredClone(firstMap);
      event.preventDefault();
      if (rightClicked[y][x] === 0) {
        rightClicked[y][x] = 2;
      } else if (rightClicked[y][x] === 2) {
        rightClicked[y][x] = 0;
      }
      setuserClick(rightClicked);
    }
  };

  let bombfinish = structuredClone(bombMap);

  const clickHandler = (x: number, y: number) => {
    if (
      firstMap[y][x] !== 100 &&
      firstMap[y][x] !== 2 &&
      levelchange[2] !== firstMap.flat().filter((cell) => cell !== 1).length
    ) {
      if (bombMap[y][x] === -2) {
        startTimer(); // タイマーを開始
        const newBoard = structuredClone(bombMap);
        const newbombPlaed = bombPlace(x, y, newBoard, levelchange);
        const newnumber = numberPlace(newbombPlaed, levelchange);
        bombfinish = newnumber;
        setuserInput(bombfinish);
      }
      if (firstMap[y][x] === 0 && bombMap[y][x] !== -1) {
        const clickBord = structuredClone(firstMap);
        const cheackedBlank = cheackBlank(x, y, clickBord, bombfinish);
        setuserClick(cheackedBlank);
      }
      if (firstMap[y][x] === 0 && bombMap[y][x] === -1) {
        const gameOverBoard = structuredClone(firstMap);
        bombMap[y][x] = -100;
        const gameOvered = gameOverMap(bombMap, gameOverBoard, levelchange);
        setGameOver(true);
        setuserClick(gameOvered);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.levelboard}>
        <button
          className={styles.first}
          onClick={() => {
            handleReload();
            levelboard(0);
          }}
        >
          初級
        </button>
        <button
          className={styles.second}
          onClick={() => {
            handleReload();
            levelboard(1);
          }}
        >
          中級
        </button>
        <button
          className={styles.therd}
          onClick={() => {
            handleReload();
            levelboard(2);
          }}
        >
          上級
        </button>
        <button
          className={styles.costom}
          onClick={() => {
            handleReload();
            levelboard(3);
          }}
        >
          カスタム
        </button>
        <div style={{ display: 'flex', visibility: isCostom ? 'visible' : 'hidden' }}>
          <div>
            <input
              type="number"
              value={val[0]}
              onChange={(e) => hanleChange(0, parseInt(e.target.value))}
              style={{ width: '50px' }}
            />
          </div>
          <div>
            <input
              type="number"
              value={val[1]}
              onChange={(e) => hanleChange(1, parseInt(e.target.value))}
              style={{ width: '50px' }}
            />
          </div>
          <div>
            <input
              type="number"
              value={val[2]}
              onChange={(e) => hanleChange(2, parseInt(e.target.value))}
              style={{ width: '50px' }}
            />
          </div>
          {val[0] * val[1] >= val[2] && (
            <button
              className={styles.update}
              onClick={() => {
                handleReload();
                levelboard(3);
              }}
            >
              更新
            </button>
          )}
        </div>
      </div>
      <div
        className={styles.board}
        style={{
          width: levelchange[0] >= 9 ? 37 * levelchange[0] + 27 : 350,
          height: 37 * levelchange[1] + 127,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '10px',
          }}
        >
          <div className={styles.bombnumber}>
            {levelchange[2] - firstMap.flat().filter((cell) => cell === 2).length}
          </div>
          <button className={styles.face}>
            <div
              onClick={handleReload}
              className={styles.sampleStyle}
              style={{
                backgroundPosition: gameOver
                  ? `-390px 0px`
                  : levelchange[2] === firstMap.flat().filter((cell) => cell !== 1).length
                    ? `-360px 0px`
                    : `-330px 0px`,
              }}
            />
          </button>
          <div className={styles.timer}>{isTimeCount}</div>
        </div>
        <div
          className={styles.newboard}
          style={{ width: 37 * levelchange[0], height: 37 * levelchange[1] }}
        >
          {bombMap.map((row, y) =>
            row.map((color, x) => (
              <div
                className={styles.cell}
                key={`${x}-${y}`}
                onClick={() => {
                  clickHandler(x, y);
                }}
              >
                {(firstMap[y][x] === 0 || firstMap[y][x] === 10) && (
                  <div
                    className={styles.stone}
                    style={{ background: color === 1 ? '#ff00000' : 'rgb(220 220 220);' }}
                    onContextMenu={(event) => rightClick(event, x, y)}
                  />
                )}
                {(firstMap[y][x] === 2 || firstMap[y][x] === 50) && (
                  <div
                    className={styles.stone}
                    style={{
                      background: color === 50 ? '#ffa0a0' : '#ffffff0',
                    }}
                  >
                    <div
                      className={styles.sampleStyle}
                      style={{ backgroundPosition: `-270px  0px` }}
                      onContextMenu={(event) => rightClick(event, x, y)}
                    />
                  </div>
                )}
                {color === -1 && (
                  <div
                    className={styles.sampleStyle}
                    style={{ backgroundPosition: `-300px  0px` }}
                  />
                )}
                {color === 1 && (
                  <div className={styles.sampleStyle} style={{ backgroundPosition: `0px  0px` }} />
                )}
                {color === 2 && (
                  <div
                    className={styles.sampleStyle}
                    style={{ backgroundPosition: `-30px  0px` }}
                  />
                )}
                {color === 3 && (
                  <div
                    className={styles.sampleStyle}
                    style={{ backgroundPosition: `-60px  0px` }}
                  />
                )}
                {color === 4 && (
                  <div
                    className={styles.sampleStyle}
                    style={{ backgroundPosition: `-90px  0px` }}
                  />
                )}
                {color === 5 && (
                  <div
                    className={styles.sampleStyle}
                    style={{ backgroundPosition: `-120px  0px` }}
                  />
                )}
                {color === 6 && (
                  <div
                    className={styles.sampleStyle}
                    style={{ backgroundPosition: `-150px  0px` }}
                  />
                )}
                {color === 7 && (
                  <div
                    className={styles.sampleStyle}
                    style={{ backgroundPosition: `-180px  0px` }}
                  />
                )}
                {color === 8 && (
                  <div
                    className={styles.sampleStyle}
                    style={{ backgroundPosition: `-210px  0px` }}
                  />
                )}
                {bombMap[y][x] === -100 && (
                  <div className={styles.stone} style={{ background: '#ff0000' }}>
                    <div
                      className={styles.sampleStyle}
                      style={{ backgroundPosition: `-300px  0px` }}
                    />
                  </div>
                )}
              </div>
            )),
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
