'use strict';

var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");

function setStartPoint(c) {
  return /* () */0;
}

function reducer(state, action) {
  return {
          startPoint: "test",
          destination: "test"
        };
}

function startString(startPoint) {
  if (startPoint !== undefined) {
    return startPoint;
  } else {
    return "nothing";
  }
}

function RouteAlert(Props) {
  var match = React.useReducer(reducer, {
        startPoint: undefined,
        destination: undefined
      });
  var dispatch = match[1];
  return React.createElement(React.Fragment, undefined, React.createElement("input", {
                  name: "start-point",
                  type: "text",
                  onChange: (function (param) {
                      return Curry._1(dispatch, /* SetStartPoint */Block.__(0, ["new"]));
                    })
                }), React.createElement("p", undefined, startString(match[0].startPoint)));
}

var make = RouteAlert;

exports.setStartPoint = setStartPoint;
exports.reducer = reducer;
exports.startString = startString;
exports.make = make;
/* react Not a pure module */
