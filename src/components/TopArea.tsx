import React from 'react';
import styles from '../pages/index.module.css';

interface Props {
  handleReload: () => void;
  levelboard: (level: number) => void;
  hanleChange: (index: number, value: number) => void;
  isCostom: boolean;
  val: number[];
}

const TopArea: React.FC<Props> = ({ handleReload, levelboard, hanleChange, isCostom, val }) => {
  return (
    <div className={styles.levelboard} style={{ width: isCostom ? 700 : 380 }}>
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
            style={{ width: '50px', marginTop: '15px', marginLeft: '10px' }}
          />
        </div>
        <div>
          <input
            type="number"
            value={val[1]}
            onChange={(e) => hanleChange(1, parseInt(e.target.value))}
            style={{ width: '50px', marginTop: '15px', marginLeft: '10px' }}
          />
        </div>
        <div>
          <input
            type="number"
            value={val[2]}
            onChange={(e) => hanleChange(2, parseInt(e.target.value))}
            style={{ width: '50px', marginTop: '15px', marginLeft: '10px' }}
          />
        </div>
        {val[0] * val[1] > val[2] && 0 < val[2] && (
          <button
            className={styles.update}
            onClick={() => {
              handleReload();
              levelboard(4);
            }}
          >
            更新
          </button>
        )}
      </div>
    </div>
  );
};

export default TopArea;
