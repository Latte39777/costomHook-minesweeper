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

function getRandomCoordinates(): [number, number] {
  const xs = Math.floor(Math.random() * 9);
  const ys = Math.floor(Math.random() * 9);
  return [ys, xs];
}

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

const clickPlace = (x: number, y: number, firstMap: number[][]) => {
  if (firstMap[y][x] === 0) {
    console.log('click', y, x);
    firstMap[y][x] = 1;
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

  const clickHandler = (x: number, y: number) => {
    if (bombMap[y][x] === -2) {
      const newBoard = structuredClone(bombMap);
      const newbombPlaed = bombPlace(x, y, newBoard);
      const newnumber = numberMap(newbombPlaed);
      userInput(newnumber);
    }

    const clickBord = structuredClone(firstMap);
    const cllckPlaced = clickPlace(x, y, clickBord);
    userClick(cllckPlaced);
  };

  return (
    <div className={styles.container}>
      <div className={styles.board}>
        <div className={styles.bombnumber} />
        <div className={styles.face} />
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
                {/* {color === 0 && (
                  <div
                    className={styles.stone}
                    style={{ background: color === 0 ? '#ff0000' : '#ffffff0' }}
                  />
                )} */}
              </div>
            )),
          )}
          {firstMap.map((row, y) =>
            row.map((color, x) => (
              <div
                className={styles.cell}
                key={`${x}-${y}`}
                onClick={() => {
                  clickHandler(x, y);
                }}
              >
                {color === 0 && (
                  <button
                    className={styles.stone}
                    style={{ background: color === 0 ? '#ff0000' : '#ffffff0' }}
                  />
                )}
              </div>
            )),
          )}
        </div>
      </div>
      {/* <div
        className={styles.sampleStyle}
        style={{ backgroundPosition: `{-30 * samplePos}px  0px` }}
      />
      <button onClick={() => setSamplePos((p) => (p + 1) % 14)}>sample</button> */}
    </div>
  );
};

export default Home;
