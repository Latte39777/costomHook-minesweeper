import styles from './index.module.css';
import useGame from '../components/useGame';
import TopArea from '../components/TopArea';
import Board from '../components/Board';

interface Props {
  handleReload: () => void;
  levelboard: (level: number) => void;
  hanleChange: (index: number, value: number) => void;
  isCostom: boolean;
  val: [width: number, hight: number, bombNumber: number];
}

const Home = () => {
  const {
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
    clickHandler,
  } = useGame();

  return (
    <div className={styles.container}>
      <TopArea handleReload={handleReload} levelboard={levelboard} hanleChange={hanleChange} />
      <div className={styles.board}>
        <Board
          handleReload={handleReload}
          gameOverFinish={gameOverFinish}
          rightClick={rightClick}
          clickHandler={clickHandler}
        />
      </div>
    </div>
  );
};

export default Home;
