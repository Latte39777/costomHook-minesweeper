import { useState } from 'react';
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

const ways = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

function getRandomCoordinates(): [number, number] {
  const xs = Math.floor(Math.random() * 9);
  const ys = Math.floor(Math.random() * 9);
  return [ys, xs];
}

const bombPlace = (x: number, y: number, bombMap: number[][]) => {
  const getBombPlace: [number, number][] = [];
  while (getBombPlace.length < 10) {
    const [ys, xs] = getRandomCoordinates();
    let exists = false;
    for (const [yb, xb] of getBombPlace) {
      if (xb === xs && yb === ys) {
        exists = true;
        break;
      }
    }
    if (!exists && x !== xs && y !== ys) {
      console.log('ボマー', xs, ys);
      getBombPlace.push([ys, xs]);
      bombMap[ys][xs] = -1;
    }
  }
  return bombMap;
};

const numberMap = (bombMap: number[][]) => {
  let count = 0;
  for (let a = 0; a < 9; a++) {
    for (let b = 0; b < 9; b++) {
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
          console.log('A', a, 'B', b, count);
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

const clickPlace = (x: number, y: number, firstMap: number[][], numberPlaced: number[][]) => {
  if (y >= 0 && y < firstMap.length) {
    if (x >= 0 && x < firstMap[y].length) {
      if (firstMap[y][x] === 0 && numberPlaced[y][x] !== 0) {
        console.log('click', y, x);
        firstMap[y][x] = 1;
      }
    }
  }
  return firstMap;
};

const cheackBlank = (x: number, y: number, firstMap: number[][], numberPlaced: number[][]) => {
  if (firstMap[y][x] === 0 && numberPlaced[y][x] === 0) {
    firstMap[y][x] = 1;
    for (const way of ways) {
      const xf = way[0];
      const yf = way[1];
      const newx = x + xf;
      const newy = y + yf;
      if (firstMap[y + yf] !== undefined && numberPlaced[y + yf][x + xf] === 0) {
        cheackBlank(newx, newy, firstMap, numberPlaced);
      } else {
        cheackBlank(x, y, firstMap, numberPlaced);
      }
    }
  }
  return firstMap;
};

const numberPlace = (firstMap: number[][], numberPlaced: number[][]) => {
  for (let a = 0; a < 9; a++) {
    for (let b = 0; b < 9; b++) {
      for (const way of ways) {
        const xf = way[0];
        const yf = way[1];
        if (
          firstMap[b + yf] !== undefined &&
          firstMap[b + yf][a + xf] !== undefined &&
          numberPlaced[b][a] === 0 &&
          firstMap[b][a] === 1
        ) {
          firstMap[b + yf][a + xf] = 1;
        }
      }
    }
  }
  return firstMap;
};

const Home = () => {
  const [firstMap, userClick] = useState([
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

  const [bombMap, userInput] = useState([
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
  // let bombfinish = [[]];
  let bombfinish = structuredClone(bombMap);
  const clickHandler = (x: number, y: number) => {
    if (bombMap[y][x] === -2) {
      const newBoard = structuredClone(bombMap);
      const newbombPlaed = bombPlace(x, y, newBoard);
      console.log('newbombPlaed', newbombPlaed);
      const newnumber = numberMap(newbombPlaed);
      console.log('newnumber', newnumber);
      bombfinish = newnumber;
      userInput(bombfinish);
      // userInput(newnumber);
    }

    const clickBord = structuredClone(firstMap);
    const cllckPlaced = clickPlace(x, y, clickBord, bombfinish);
    console.log('cllckPlaced', cllckPlaced);
    const cheackedBlank = cheackBlank(x, y, cllckPlaced, bombfinish);
    console.log('numberPlaced', cheackedBlank);
    const numberPlaced = numberPlace(cheackedBlank, bombfinish);
    console.log('numberPlaced', numberPlaced);
    userClick(numberPlaced);

    // const clickBord = structuredClone(firstMap);
    // const cllckPlaced = clickPlace(x, y, clickBord, bombMap);
    // console.log('cllckPlaced', cllckPlaced);
    // const cheackedBlank = cheackBlank(x, y, cllckPlaced, bombMap);
    // console.log('numberPlaced', cheackedBlank);
    // const numberPlaced = numberPlace(cheackedBlank, bombMap);
    // console.log('numberPlaced', numberPlaced);
    // userClick(numberPlaced);

    if (bombMap[y][x] === -1) {
      setGameOver(true);
      alert('Game Over!');
    }
  };

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className={styles.container}>
      <div className={styles.board}>
        {gameOver && <div className={styles.gameOverAlert} />}
        <div className={styles.bombnumber} />
        <div className={styles.face}>
          {gameOver === false && (
            <button
              className={styles.sampleStyle}
              style={{ backgroundPosition: `-330px  0px` }}
              onClick={handleReload}
            />
          )}
          {gameOver === true && (
            <button
              className={styles.sampleStyle}
              style={{ backgroundPosition: `-390px  0px` }}
              onClick={handleReload}
            />
          )}
        </div>
        <div className={styles.timer} />
        <div className={styles.newboard}>
          {bombMap.map((row, y) =>
            row.map((color, x) => (
              <div
                className={styles.cell}
                key={`${x}-${y}`}
                onClick={() => {
                  clickHandler(x, y);
                }}
              >
                {firstMap[y][x] === 0 && (
                  <div
                    className={styles.stone}
                    style={{ background: color === 0 ? '#ff0000' : '#ffffff0' }}
                  />
                )}
                {firstMap[y][x] === 0 && (
                  <div
                    className={styles.sampleStyle}
                    style={{ backgroundPosition: `-270px  0px` }}
                  />
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
              </div>
            )),
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
