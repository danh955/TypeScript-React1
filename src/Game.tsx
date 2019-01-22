import * as React from 'react';

interface SquareProps extends React.Props<any> {
  value: string;
  onClick: () => void;
}

class Square extends React.Component<SquareProps> {
  render() {
      return (
        <button className="square" onClick={this.props.onClick}>
            {this.props.value}
        </button>
      );
    }
}

interface BoardProps extends React.Props<any> {
  squares: string[];
  onClick: (i: number) => void;
}

class Board extends React.Component<BoardProps> {
  renderSquare(i: number) {
    return (
      <Square 
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

interface SquareHistory {
  squares: string[]
}

interface GameProps extends React.Props<any>
{
}

interface GameState {
  history: SquareHistory[];
  xIsNext: boolean;
  stepNumber: number;
}

class Game extends React.Component<GameProps, GameState> {
  constructor(props: GameProps) {
    super(props);
    this.state = {
      history: [{
          squares: Array(9).fill(null),
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
      history: history.concat([{ squares: squares }]),
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
        const desc = move ?
          'Go to move #' + move :
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

function calculateWinner(squares: string[]) {
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

