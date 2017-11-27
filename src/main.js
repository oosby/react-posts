import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './main.scss';

const API_URL_BASE = 'http://localhost:3005/api';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    // fetch data
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>Posts</h1>
        </header>
      </div>
    );
  }
}

App.displayName = 'App';

App.propTypes = {};

App.defaultProps = {};


ReactDOM.render(<App />, document.getElementById('app-root'));


