'use strict';

var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");

function reducer(state, action) {
  if (action.tag) {
    return {
            startPoint: state.startPoint,
            destination: action[0]
          };
  } else {
    return {
            startPoint: action[0],
            destination: state.destination
          };
  }
}

function startString(startPoint) {
  if (startPoint !== undefined) {
    return startPoint;
  } else {
    return "nothing";
  }
}

function start_point_of_input(e) {
  var s = e.target.value;
  var s$1 = s === "" ? "nada" : s;
  return /* SetStartPoint */Block.__(0, [s$1]);
}

function destination_of_input(e) {
  var s = e.target.value;
  var s$1 = s === "" ? "nada" : s;
  return /* SetDestination */Block.__(1, [s$1]);
}

function RouteAlert(Props) {
  var match = React.useReducer(reducer, {
        startPoint: undefined,
        destination: undefined
      });
  var dispatch = match[1];
  var state = match[0];
  return React.createElement(React.Fragment, undefined, React.createElement("input", {
                  name: "start-point",
                  type: "text",
                  onChange: (function (e) {
                      return Curry._1(dispatch, start_point_of_input(e));
                    })
                }), React.createElement("input", {
                  name: "destination",
                  type: "text",
                  onChange: (function (e) {
                      return Curry._1(dispatch, destination_of_input(e));
                    })
                }), React.createElement("p", undefined, "Start: " + startString(state.startPoint)), React.createElement("p", undefined, "Destination: " + startString(state.destination)));
}

var make = RouteAlert;

exports.reducer = reducer;
exports.startString = startString;
exports.start_point_of_input = start_point_of_input;
exports.destination_of_input = destination_of_input;
exports.make = make;
/* react Not a pure module */
