(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{14:function(t,e,n){},8:function(t,e,n){t.exports=n(9)},9:function(t,e,n){"use strict";n.r(e);var a=n(2),o=n(3),r=n(6),u=n(4),c=n(7),i=n(0),l=n.n(i),s=n(5),h=n.n(s);n(14);function d(t){return l.a.createElement("div",null,l.a.createElement("p",{id:"category"},t.category),l.a.createElement("p",{id:"text"},t.text),l.a.createElement("p",{id:"author"},"-",t.author))}function m(t){return l.a.createElement("div",null,l.a.createElement("button",{id:"tweet-quote"},"tweet"),l.a.createElement("button",{id:"new-quote",onClick:t.onClick},"new quote"))}var f=function(t){function e(t){var n;return Object(a.a)(this,e),(n=Object(r.a)(this,Object(u.a)(e).call(this,t))).state={text:null,author:null,category:null},n}return Object(c.a)(e,t),Object(o.a)(e,[{key:"getQuote",value:function(){var t=this;fetch("https://talaikis.com/api/quotes/random/").then(function(t){return t.json()}).then(function(e){t.setState({text:e.quote,author:e.author,category:e.cat})})}},{key:"componentDidMount",value:function(){this.getQuote()}},{key:"render",value:function(){var t=this;return l.a.createElement("div",{id:"quote-box",className:"white-background box rounded"},l.a.createElement(d,{author:this.state.author,text:this.state.text,category:this.state.category}),l.a.createElement(m,{onClick:function(){return t.getQuote()}}))}}]),e}(l.a.Component);h.a.render(l.a.createElement(f,null),document.getElementById("root"))}},[[8,2,1]]]);
//# sourceMappingURL=main.569af581.chunk.js.map