import React from 'react';
import styles from '../pages/index.module.css';

interface Props {
  handleReload: () => void;
  gameOverFinish: (
    firstMap: number[][],
    bombMap: number[][],
    levelchange: number[],
  ) => true | undefined;
  clickHandler: (x: number, y: number) => void;
  rightClick: (event: React.MouseEvent<HTMLButtonElement>, x: number, y: number) => void;
  levelchange: number[];
  firstMap: number[][];
  bombMap: number[][];
  isTimeCount: number;
}

const Board: React.FC<Props> = ({
  handleReload,
  gameOverFinish,
  clickHandler,
  rightClick,
  levelchange,
  firstMap,
  bombMap,
  isTimeCount,
}) => {
  return (
    <div
      className={styles.board}
      style={{
        width: levelchange[0] >= 9 ? 38.5 * levelchange[0] + 27 : 350,
        height: 38.5 * levelchange[1] + 117,
      }}
    >
      <div
        className={styles.information}
        style={{ width: levelchange[0] >= 9 ? 38.5 * levelchange[0] : 330 }}
      >
        <div className={styles.bombnumber}>
          {levelchange[2] - firstMap.flat().filter((cell) => cell === 10).length}
        </div>
        <button className={styles.face} onClick={handleReload}>
          <div
            className={styles.sampleStyle}
            style={{
              backgroundPosition: gameOverFinish(firstMap, bombMap, levelchange)
                ? `-390px 0px`
                : levelchange[2] === firstMap.flat().filter((cell) => cell !== -30).length
                  ? `-360px 0px`
                  : `-330px 0px`,
            }}
          />
        </button>
        <div className={styles.timer}>{isTimeCount}</div>
      </div>
      <div
        className={styles.newboard}
        style={{ width: 37 * levelchange[0] + 10, height: 37 * levelchange[1] + 10 }}
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
              {(firstMap[y][x] === 0 || firstMap[y][x] === 10 || firstMap[y][x] === 99) && (
                <button
                  className={styles.stone}
                  onContextMenu={(event) => rightClick(event, x, y)}
                  style={{ background: color === -30 ? '#ff00000' : 'rgb(190 190 190)' }}
                />
              )}
              {(firstMap[y][x] === 10 || firstMap[y][x] === 50) && (
                <button
                  className={styles.stone}
                  onContextMenu={(event) => rightClick(event, x, y)}
                  style={{
                    background: color === 50 ? '#ffa0a0' : '#ffffff0',
                  }}
                >
                  <div
                    className={styles.sampleStyle}
                    style={{ backgroundPosition: `-275px  0px` }}
                  />
                </button>
              )}
              {bombMap[y][x] === -100 && (
                <div style={{ background: '#ff0000' }}>
                  <div
                    className={styles.sampleStyle}
                    style={{ backgroundPosition: `-300px  0px` }}
                  />
                </div>
              )}
              <div
                className={styles.sampleStyle}
                style={{ backgroundPosition: `${-30 * (color - 1)}px  0px` }}
              />
            </div>
          )),
        )}
      </div>
    </div>
  );
};

export default Board;
