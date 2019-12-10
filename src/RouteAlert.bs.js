'use strict';

var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Belt_Option = require("bs-platform/lib/js/belt_Option.js");
var Caml_format = require("bs-platform/lib/js/caml_format.js");

var initialState = {
  startPoint: undefined,
  destination: undefined,
  minutes: undefined
};

function reducer(state, action) {
  switch (action.tag | 0) {
    case /* SetStartPoint */0 :
        return {
                startPoint: action[0],
                destination: state.destination,
                minutes: state.minutes
              };
    case /* SetDestination */1 :
        return {
                startPoint: state.startPoint,
                destination: action[0],
                minutes: state.minutes
              };
    case /* SetMinutes */2 :
        return {
                startPoint: state.startPoint,
                destination: state.destination,
                minutes: action[0]
              };
    
  }
}

function displayString(ostr) {
  return Belt_Option.mapWithDefault(ostr, "nada", (function (s) {
                return s;
              }));
}

function displayInt(i) {
  return Belt_Option.mapWithDefault(i, "nada", (function (n) {
                return String(n);
              }));
}

function startPoint(e) {
  var s = e.target.value;
  var s$1 = s === "" ? "nada" : s;
  return /* SetStartPoint */Block.__(0, [s$1]);
}

function destination(e) {
  var s = e.target.value;
  var s$1 = s === "" ? "nada" : s;
  return /* SetDestination */Block.__(1, [s$1]);
}

function minutes(e) {
  return /* SetMinutes */Block.__(2, [Caml_format.caml_int_of_string(e.target.value)]);
}

function RouteAlert(Props) {
  var match = React.useReducer(reducer, initialState);
  var dispatch = match[1];
  var state = match[0];
  return React.createElement(React.Fragment, undefined, React.createElement("input", {
                  name: "start-point",
                  type: "text",
                  onChange: (function (e) {
                      return Curry._1(dispatch, startPoint(e));
                    })
                }), React.createElement("input", {
                  name: "destination",
                  type: "text",
                  onChange: (function (e) {
                      return Curry._1(dispatch, destination(e));
                    })
                }), React.createElement("input", {
                  name: "destination",
                  type: "number",
                  onChange: (function (e) {
                      return Curry._1(dispatch, minutes(e));
                    })
                }), React.createElement("p", undefined, "Start: " + Belt_Option.mapWithDefault(state.startPoint, "nada", (function (s) {
                        return s;
                      }))), React.createElement("p", undefined, "Destination: " + Belt_Option.mapWithDefault(state.destination, "nada", (function (s) {
                        return s;
                      }))), React.createElement("p", undefined, "Minutes: " + displayInt(state.minutes)));
}

var make = RouteAlert;

exports.initialState = initialState;
exports.reducer = reducer;
exports.displayString = displayString;
exports.displayInt = displayInt;
exports.startPoint = startPoint;
exports.destination = destination;
exports.minutes = minutes;
exports.make = make;
/* react Not a pure module */
