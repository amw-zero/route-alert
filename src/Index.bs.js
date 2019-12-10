'use strict';

var React = require("react");
var ReactDOMRe = require("reason-react/src/ReactDOMRe.js");
var RouteAlert$ReasonReactExamples = require("./RouteAlert.bs.js");
var ExampleStyles$ReasonReactExamples = require("./ExampleStyles.bs.js");

var style = document.createElement("style");

document.head.appendChild(style);

style.innerHTML = ExampleStyles$ReasonReactExamples.style;

ReactDOMRe.renderToElementWithId(React.createElement(RouteAlert$ReasonReactExamples.make, { }), "route-alert-app");

exports.style = style;
/* style Not a pure module */
