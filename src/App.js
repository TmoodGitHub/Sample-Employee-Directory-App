import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import TableList from './components/TableList';
import CardList from './components/CardList';
import './App.css';

const App = () => {
  window.onscroll = function () {
    scrollFunction();
  };

  const scrollFunction = () => {
    const mybutton = document.getElementById('myBtn');
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      mybutton.style.display = 'block';
    } else {
      mybutton.style.display = 'none';
    }
  };

  const topFunction = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  };

  return (
    <Router>
      <div>
        <nav className='main-menu'>
          <ul>
            <li>
              <Link to='/'>Employee Table List</Link>
            </li>
            <li>
              <Link to='/cardList'>Employee Card List</Link>
            </li>
          </ul>
        </nav>

        <hr />

        <Switch>
          <Route exact path='/'>
            <TableList />
          </Route>
          <Route path='/cardList'>
            <CardList />
          </Route>
        </Switch>
        <button onClick={topFunction} id='myBtn' title='Go to top'>
          Top
        </button>
      </div>
    </Router>
  );
};

export default App;
