import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const colors = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
		  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
		  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
		  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
		  '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
		  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
		  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
		  '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
		  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
		  '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];

function Quote(props) {
  return (
      <div>
        <h1 id="category">{props.category}</h1>
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
              onClick={props.getQuote}>
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
      category: null,
			seconds: 0
    };
  }

  getQuote(isClicked) {
		if (isClicked) {
			this.setState({seconds: 0});
			restartTimerAnimation();
		}

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
      <div id="quote-box" className="white-background box rounded">
        <Quote
          author={this.state.author}
          text={this.state.text}
          category={this.state.category}
        />
				<div id="lower-container">
					<CircleTimer />
        	<QuoteBoxBtns
          	getQuote={() => this.getQuote(true)}
          	tweetQuote={() => this.tweetQuote()}
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
