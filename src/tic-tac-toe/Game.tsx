import * as React from 'react';
import Board from './Board'
import './Game.css';

interface SquareHistory {
  squares: string[];
  move: number | null;
}

interface GameProps extends React.Props<any>
{
}

interface GameState {
  history: SquareHistory[];
  xIsNext: boolean;
  stepNumber: number;
}

export default class Game extends React.Component<GameProps, GameState> {
  constructor(props: GameProps) {
    super(props);

    // Init board for first use.
    this.state = {
      history: [{
          squares: Array(9).fill(null),
          move: null
        }],
      xIsNext: true,
      stepNumber: 0,
    };
  }

  handleClick(i: number ) {
    const history: SquareHistory[] = this.state.history.slice(0, this.state.stepNumber + 1);
    const current: SquareHistory = history[history.length - 1];
    const squares: string[] = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{ squares: squares, move: i }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step: number) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  render() {
    const history: SquareHistory[] = this.state.history;
    const current: SquareHistory = history[this.state.stepNumber];
    const winner: string | null = calculateWinner(current.squares);

    const moves: JSX.Element[] = history.map(
      (step, move) => {
        const row: number = Math.floor(step.move! / 3) + 1;
        const column: number = step.move! % 3 + 1;

        const desc = move ?
          '#' + move + ' Go to move (' + row + ',' + column + ')' :
          'Go to game start';

          return (
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        );
    });

    let status: string;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />

        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}
/*
// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
*/

function calculateWinner(squares: string[]): string | null {
  const lines: number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i: number = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
