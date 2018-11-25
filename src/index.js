import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Quote(props) {
  return (
      <div>
        <p>
          Two roads diverged in a wood, and I--I took the one less traveled
          by, And that has made all the difference.
        </p>
        <p>-Robert Frost</p>
      </div>
  );
}

class QuoteBox extends React.Component {
  render() {
    return (
      <div id="quote-box" className="white-background box rounded">
        <Quote />
      </div>
    );
  }
}

ReactDOM.render(<QuoteBox />, document.getElementById('root'))
