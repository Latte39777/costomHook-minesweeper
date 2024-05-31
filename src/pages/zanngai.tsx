import React from 'react';
import styles from './index.module.css';
import useGame from '../components/useGame';
import TopArea from '../components/TopArea';
import Board from '../components/Board';

const Home: React.FC = () => {
  const {
    gameOverFinish,
    hanleChange,
    levelboard,
    handleReload,
    rightClick,
    clickHandler,
    isCostom,
    val,
    levelchange,
    firstMap,
    bombMap,
    isTimeCount,
  } = useGame();

  return (
    <div className={styles.container}>
      <TopArea
        handleReload={handleReload}
        levelboard={levelboard}
        hanleChange={hanleChange}
        isCostom={isCostom}
        val={val}
      />
      <Board
        handleReload={handleReload}
        gameOverFinish={gameOverFinish}
        rightClick={rightClick}
        clickHandler={clickHandler}
        levelchange={levelchange}
        firstMap={firstMap}
        bombMap={bombMap}
        isTimeCount={isTimeCount}
      />
    </div>
  );
};

export default Home;
