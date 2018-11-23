import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class QuoteBox extends React.Component {
  render() {
    return <div className="white-background box rounded"></div>;
  }
}

ReactDOM.render(<QuoteBox />, document.getElementById('root'))
