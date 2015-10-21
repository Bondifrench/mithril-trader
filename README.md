#Real Time Trader Desktop with Mithril, Node.js and Socket.io

This is my second instalment of recreating an App that [Christophe Coenraets](http://coenraets.org/blog/) originally designed with [Mithril](http://mithril.js.org/) my favorite framework.
[Here] is the original blog post from him.

Like React, Mithril uses a virtual DOM. It is also very easy to create components. 
Mithril is pure and plain javascript, so no need for JSX or a transpiler. 


You can check the end-result [here](http://bondifrench.github.io/mithril-trader/)

##Inspecting Browser Repaints

In the Chrome Dev Tools, check Show paint rectangles and Show FPS meter to inspect the DOM updates and the frame rate.

##Installing the Socket.io Version

The version running in this page uses a mock push service. To install the full Socket.io implementation:

1.Clone this repository
2.Open a command prompt and navigate to the application directory
```bash
cd mithril-trader
```
3.Install the dependencies
```bash
npm install
```
4.Run the server
```bash
node server
```
5.Run the application. Open a browser and access the following URL:
```bash
http://localhost:3000

##Additional resources:

My other tutorial on the subject