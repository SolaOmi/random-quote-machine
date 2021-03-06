import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const colors = ['#FF6633', '#FFB399', '#FF33FF', '#00B3E6',
		  '#E6B333', '#3366E6', '#999966', '#B34D4D',
		  '#80B300', '#E6B3B3', '#6680B3', '#66991A',
		  '#FF99E6', '#FF1A66', '#E6331A', '#33FFCC',
		  '#E64D66', '#4DB380', '#FF4D4D', '#6666FF'];

function Quote(props) {
  return (
      <div>
        <h1 id="category">{"simpsons random quotes"}</h1>
        <p id="text">
          <i className="fas fa-quote-left"></i>
          {' ' + props.text + ' '}
          <i className="fas fa-quote-right"></i>
        </p>
        <p id="author">-- {props.author} --</p>
      </div>
  );
}

function QuoteBoxBtns(props) {
  return (
    <div id="quote-btns">
      <button id="tweet-quote"
              className="btn rounded animated"
              onClick={props.tweetQuote}>
              <i className="fab fa-twitter"></i>
      </button>
      <button id="new-quote"
              className="btn rounded animated"
              onClick={() => props.getQuote(true)}>
              <i className="fas fa-plus"></i>
      </button>
    </div>
  );
}

function CircleTimer() {
	return (
		<svg>
			<circle id="timer" className="timer-animation" r="18" cx="20" cy="20" />
		</svg>
	);
}

class QuoteBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: null,
      author: null,
			seconds: 0
    };

		this.getQuote = this.getQuote.bind(this);
		this.tweetQuote = this.tweetQuote.bind(this);
  }

  getQuote(isClicked) {
		if (isClicked) {
			this.setState({seconds: 0});
			restartTimerAnimation();
		}

    const url = "https://thesimpsonsquoteapi.glitch.me/quotes"

    fetch(url)
      .then(res => res.json())
      .then(result => {
				const res = result[0];

        this.setState({
          text: res.quote,
          author: res.character,
        })
      })
			.catch((error) => console.log(error.message));

    changeColor()
  }

  tweetQuote() {
    const url = 'https://twitter.com/intent/tweet?text='
    window.open(url + escape(this.state.text + "\n- " + this.state.author));
  }

	tick () {
		this.setState(state => ({
			seconds: state.seconds + 1
		}));
		if (this.state.seconds % 10 === 0) {
			this.getQuote();
		}
	}

  componentDidMount() {
    this.getQuote();
		this.interval = setInterval(() => this.tick(), 1000);
  }

	componentWillUnmount() {
		clearInterval(this.interval);
	}

  render() {
    return (
      <div id="quote-box" className="white-background box rounded shadow">
        <Quote
          author={this.state.author}
          text={this.state.text}
        />
				<div id="lower-container">
					<CircleTimer />
        	<QuoteBoxBtns
          	getQuote={this.getQuote}
          	tweetQuote={this.tweetQuote}
        	/>
				</div>
      </div>
    );
  }
}

// ===================================================================

ReactDOM.render(<QuoteBox />, document.getElementById('root'))

function changeColor() {
  let num = Math.floor(Math.random() * colors.length);
  const body = document.body;
  const btns = document.getElementsByClassName('btn');
	const timer = document.getElementById('timer');

  body.style.background = colors[num];
  body.style.color = colors[num];
	timer.style.stroke = colors[num];

  for (let i = 0; i < btns.length; i++) {
    btns[i].style.background = colors[num];
  }
}

function restartTimerAnimation() {
	const timer = document.getElementById('timer');

	timer.classList.toggle('timer-animation');
	// Need to delay toggle for animation to restart properly.
	setTimeout(() => timer.classList.toggle('timer-animation'), 10);
}
