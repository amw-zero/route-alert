'use strict';

var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Belt_Option = require("bs-platform/lib/js/belt_Option.js");
var Caml_format = require("bs-platform/lib/js/caml_format.js");

function setStartPoint(param_0) {
  return /* SetStartPoint */Block.__(0, [param_0]);
}

function setDestination(param_0) {
  return /* SetDestination */Block.__(1, [param_0]);
}

var initialState = {
  startPoint: undefined,
  destination: undefined,
  minutes: undefined,
  routeFetchAbility: /* CannotFetch */1
};

function reducer(state, action) {
  switch (action.tag | 0) {
    case /* SetStartPoint */0 :
        return {
                startPoint: action[0],
                destination: state.destination,
                minutes: state.minutes,
                routeFetchAbility: state.routeFetchAbility
              };
    case /* SetDestination */1 :
        return {
                startPoint: state.startPoint,
                destination: action[0],
                minutes: state.minutes,
                routeFetchAbility: state.routeFetchAbility
              };
    case /* SetMinutes */2 :
        return {
                startPoint: state.startPoint,
                destination: state.destination,
                minutes: action[0],
                routeFetchAbility: state.routeFetchAbility
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

function dispatchEvent(action, e) {
  var s = e.target.value;
  var tmp = s === "" ? "nada" : s;
  return Curry._1(action, tmp);
}

function setMinutes(e) {
  return /* SetMinutes */Block.__(2, [Caml_format.caml_int_of_string(e.target.value)]);
}

function directionsApi(startPoint, destination) {
  return "https://maps.googleapis.com/maps/api/directions/json?origin=" + (startPoint + ("&destination=" + (destination + "&key=AIzaSyC6AfIwElNGcfmzz-XyBHUb3ftWb2SL2vU")));
}

function fetchDirections(state, param) {
  var match = state.startPoint;
  var match$1 = state.destination;
  if (match !== undefined && match$1 !== undefined) {
    return directionsApi(match, match$1);
  }
  
}

function RouteAlert(Props) {
  var match = React.useReducer(reducer, initialState);
  var dispatch = match[1];
  var state = match[0];
  return React.createElement(React.Fragment, undefined, React.createElement("input", {
                  name: "start-point",
                  type: "text",
                  onChange: (function (e) {
                      return Curry._1(dispatch, dispatchEvent(setStartPoint, e));
                    })
                }), React.createElement("input", {
                  name: "destination",
                  type: "text",
                  onChange: (function (e) {
                      return Curry._1(dispatch, dispatchEvent(setDestination, e));
                    })
                }), React.createElement("input", {
                  name: "destination",
                  type: "number",
                  onChange: (function (e) {
                      return Curry._1(dispatch, setMinutes(e));
                    })
                }), React.createElement("p", undefined, "Start: " + Belt_Option.mapWithDefault(state.startPoint, "nada", (function (s) {
                        return s;
                      }))), React.createElement("p", undefined, "Destination: " + Belt_Option.mapWithDefault(state.destination, "nada", (function (s) {
                        return s;
                      }))), React.createElement("p", undefined, "Minutes: " + displayInt(state.minutes)));
}

var make = RouteAlert;

exports.setStartPoint = setStartPoint;
exports.setDestination = setDestination;
exports.initialState = initialState;
exports.reducer = reducer;
exports.displayString = displayString;
exports.displayInt = displayInt;
exports.dispatchEvent = dispatchEvent;
exports.setMinutes = setMinutes;
exports.directionsApi = directionsApi;
exports.fetchDirections = fetchDirections;
exports.make = make;
/* react Not a pure module */
