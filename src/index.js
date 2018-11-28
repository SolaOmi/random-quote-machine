import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Quote(props) {
  return (
      <div>
        <h1 id="category">{props.category}</h1>
        <p id="text">{props.text}</p>
        <p id="author">-{props.author}</p>
      </div>
  );
}

function QuoteBoxBtns(props) {
  return (
    <div>
      <button id="tweet-quote" onClick={props.tweetQuote}>tweet</button>
      <button id="new-quote" onClick={props.getQuote}>new quote</button>
    </div>
  );
}

class QuoteBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: null,
      author: null,
      category: null,
    };
  }

  getQuote() {
    const url = "https://talaikis.com/api/quotes/random/"

    fetch(url)
      .then(res => res.json())
      .then(result => {
        this.setState({
          text: result.quote,
          author: result.author,
          category: result.cat
        })
      });
  }

  tweetQuote() {
    const url = 'https://twitter.com/intent/tweet?text='
    window.open(url + escape(this.state.text + "\n- " + this.state.author));
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
          category={this.state.category}
        />
        <QuoteBoxBtns
          getQuote={() => this.getQuote()}
          tweetQuote={() => this.tweetQuote()}
        />
      </div>
    );
  }
}

ReactDOM.render(<QuoteBox />, document.getElementById('root'))
