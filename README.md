#Real Time Trader Desktop with Mithril, Node.js and Socket.io

This is my second instalment of recreating an App that [Christophe Coenraets](http://coenraets.org/blog/) originally designed, with [Mithril](http://mithril.js.org/) my favorite framework.
[Here](http://coenraets.org/blog/2015/03/real-time-trader-desktop-with-react-node-js-and-socket-io/) is the original blog post from @ccoenraets.

##The App

Like React, **Mithril** uses a virtual DOM. It is also very easy to create components. 
**Mithril** is pure and plain javascript, so no need for JSX or a transpiler.
- Use of CSS syntax for inline styling when static
- Use of getter/setter `m.prop()`
- [TBD] Comments on Span
- Use of `m.startComputation()` and `m.endComputation()` in
```javascript
		feed.onChange(function(stock) {
			m.startComputation();
			stocks[stock.symbol] = stock;
			ctrl.stocks(stocks);
			ctrl.last(stock);
			m.endComputation();
		});
```
You can check the end-result [here](http://bondifrench.github.io/mithril-trader/)

##Inspecting Browser Repaints

In the Chrome Dev Tools, check `Show paint` rectangles and `Show FPS` meter to inspect the DOM updates and the frame rate.

##Installing the Socket.io Version

The version running in this page uses a mock push service. To install the full Socket.io implementation:

1. Clone this repository

2. Open a command prompt and navigate to the application directory
```bash
cd mithril-trader
```
3. Install the dependencies
```bash
npm install
```
4. Run the server
```bash
node server
```
5. Run the application. Open a browser and access the following URL:
```bash
http://localhost:3000
```

##Additional resources:

My other tutorial using Mithril: [Mithril Employee Directory](https://github.com/Bondifrench/mithril-employee-directory)

Other tutorials on Mithril by Gilbert @mindeavor [here](http://gilbert.ghost.io/mithril-js-tutorial-1/) and [here](http://gilbert.ghost.io/mithril-js-tutorial-2/)

[Polythene](http://polythene.js.org/#polythene) is a library by Arthur Clemens using Mithril Components

Two open-source non-trivial applications using Mithril in production:
- [Lichobile](https://github.com/veloce/lichobile) with source code using Mithril [here](https://github.com/veloce/lichobile/tree/2.3.x/project/src/js)
- [Flarum](http://flarum.org/) with source code using Mithril [here](https://github.com/flarum/core/tree/master/js)

[Here](http://tobyzerner.com/mithril/) you can read on how Toby Zerner made the transition from Ember.js to Mithril