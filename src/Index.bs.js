'use strict';

var React = require("react");
var ReactDOMRe = require("reason-react/src/ReactDOMRe.js");
var Test$ReasonReactExamples = require("./Test.bs.js");
var RouteAlert$ReasonReactExamples = require("./RouteAlert.bs.js");
var ExampleStyles$ReasonReactExamples = require("./ExampleStyles.bs.js");

var style = document.createElement("style");

document.head.appendChild(style);

style.innerHTML = ExampleStyles$ReasonReactExamples.style;

ReactDOMRe.renderToElementWithId(React.createElement(RouteAlert$ReasonReactExamples.make, { }), "route-alert-app");

Test$ReasonReactExamples.testPreventingAlertCreationWhenAllDataIsNotPresent(/* () */0);

Test$ReasonReactExamples.testPreventingAlertCreationWhenAllDataIsPresent(/* () */0);

Test$ReasonReactExamples.testCalculatingRouteDuration(/* () */0);

Test$ReasonReactExamples.testCalculatingRouteDuration(/* () */0);

exports.style = style;
/* style Not a pure module */
