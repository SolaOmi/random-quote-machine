import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Quote(props) {
  return (
      <div>
        <p id="text">{props.text}</p>
        <p id="author">-{props.author}</p>
      </div>
  );
}

function QuoteBoxBtns(props) {
  return (
    <div>
      <button id="tweet-quote">tweet</button>
      <button id="new-quote" onClick={props.onClick}>new quote</button>
    </div>
  );
}

class QuoteBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: null,
      author: null
    };
  }

  getQuote() {
    const url = "https://talaikis.com/api/quotes/random/"

    fetch(url)
      .then(res => res.json())
      .then(result => {
        this.setState({
          text: result.quote,
          author: result.author
        })
      });
  }

  componentDidMount() {
    this.getQuote();
  }

  render() {
    return (
      <div id="quote-box" className="white-background box rounded">
        <Quote
          author={this.state.author}
          text={this.state.text}
        />
        <QuoteBoxBtns
          onClick={() => this.getQuote()}
        />
      </div>
    );
  }
}

ReactDOM.render(<QuoteBox />, document.getElementById('root'))
