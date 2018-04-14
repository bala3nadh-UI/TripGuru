var React = require('react');
var ReactDOM = require('react-dom');
var {Route, Router, Redirect, IndexRoute, hashHistory} = require('react-router');
var Main = require('Main');
var Index = require('Index');
var Activity = require('./components/Activity.jsx');

// Load foundation
$(document).foundation();

// App css
require('style!css!sass!applicationStyles');

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Main}>
      <Route path="city/:cityName" component={Index} />
      <Route path="activity/:id" component={Activity} />
      <IndexRoute component={Index}/>
    </Route>
  </Router>,
  document.getElementById('app')
);
