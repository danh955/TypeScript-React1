import * as React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import TicTacToeGame from './tic-tac-toe/Game';

import logo from './logo.svg';

class App extends React.Component {
  public render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Welcome to typescript-react1</h1>
          </header>
          <nav className="App-LeftNav">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/Tic-Tac-Toe">Tic-Tac-Toe</Link>
              </li>
            </ul>
          </nav>
          <Route path="/" exact component={Home} />
          <Route path="/about" component={About} />
          <Route path="/Tic-Tac-Toe" component={TicTacToe} />
        </div>
      </Router>
    );
  }
}

function Home() {
  return (
    <section>
      <img src={logo} className="App-logo" alt="logo" />
      <h2>Home</h2>
      here is some text in this little box.<br/>
    </section>
  );
}

function About() {
  return (
    <section>
      <h2>About</h2>
      and it's about time.
    </section>
  );
}

function TicTacToe() {
  return (
    <section>
      <h2>Tic-Tac-Toe</h2>
      <TicTacToeGame />
    </section>
  );
}

export default App;
