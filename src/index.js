import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Quote(props) {
  return (
      <div>
        <p>{props.text}</p>
        <p>-{props.author}</p>
      </div>
  );
}

function QuoteBoxBtns(props) {
  return (
    <div>
      <button>tweet</button>
      <button>new quote</button>
    </div>
  );
}

class QuoteBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: `Two roads diverged in a wood, and I--I took the one less traveled
      by, And that has made all the difference.`,
      author: "Robert Frost"
    };
  }

  render() {
    return (
      <div id="quote-box" className="white-background box rounded">
        <Quote
          author={this.state.author}
          text={this.state.text}
        />
        <QuoteBoxBtns />
      </div>
    );
  }
}

ReactDOM.render(<QuoteBox />, document.getElementById('root'))
