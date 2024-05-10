import { useState } from 'react';
import styles from './index.module.css';

function getRandomCoordinates(): [number, number] {
  const xs = Math.floor(Math.random() * 9); // 0から8までのランダムな数
  const ys = Math.floor(Math.random() * 9); // 0から8までのランダムな数

  return [ys, xs];
}

const bombPlace = (x: number, y: number, bombMap: number[][]) => {
  const getBombPlace = [];
  while (getBombPlace.length < 10) {
    const [ys, xs] = getRandomCoordinates();
    const exists = getBombPlace.some(([yb, xb]) => xb === xs && yb === ys);
    if (!exists && x !== xs && y !== ys) {
      if (x !== xs && y !== ys) {
        getBombPlace.push([ys, xs]);
        bombMap[ys][xs] = -1;
      }
    }
  }
  return bombMap;
};

const Home = () => {
  // const [samplePos, setSamplePos] = useState(0);
  // console.log(samplePos);
  // const [representBoard, bombMap] = useState([
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0],
  // ]);

  const [bombMap, userInput] = useState([
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

  const clickHandler = (x: number, y: number) => {
    const newBoard = structuredClone(bombMap);
    const newbombPlaed = bombPlace(x, y, newBoard);
    userInput(newbombPlaed);
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
                {/* <div
                  className={styles.stone}
                  style={{ background: color === 0 ? 'rgb(120 120 120)' : '#0000000' }}
                /> */}
              </div>
            )),
          )}

          {/* {representBoard.map((row, y) =>
            row.map((color, x) => (
              <div
                className={styles.incell}
                key={`${x}-${y}`}
                onClick={() => {
                  clickHandler(x, y);
                }}
              />
            )),
          )} */}
        </div>
      </div>
      <div
        className={styles.sampleStyle}
        style={{ backgroundPosition: `{-30 * samplePos}px  0px` }}
      />
      <button onClick={() => setSamplePos((p) => (p + 1) % 14)}>sample</button>
    </div>
  );
};

export default Home;
