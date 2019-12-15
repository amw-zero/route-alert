'use strict';

var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Belt_Option = require("bs-platform/lib/js/belt_Option.js");
var Caml_format = require("bs-platform/lib/js/caml_format.js");
var RouteAlertBehavior = require("route-alert-behavior/src/RouteAlertBehavior.bs.js");

function useReducer(initialState, reducer, interpreter) {
  var match = React.useState((function () {
          return initialState;
        }));
  var setState = match[1];
  var state = match[0];
  var dispatch = RouteAlertBehavior.Reffect.makeDispatch(state, reducer, interpreter, (function (s) {
          return Curry._1(setState, (function (param) {
                        return s;
                      }));
        }));
  return /* tuple */[
          state,
          dispatch
        ];
}

var ReactReffect = {
  useReducer: useReducer
};

function dispatchEvent(actionCtor, e) {
  var s = e.target.value;
  var tmp = s === "" ? "nada" : s;
  return Curry._1(actionCtor, tmp);
}

function setMinutes(e) {
  return /* SetMinutes */Block.__(2, [Caml_format.caml_int_of_string(e.target.value)]);
}

function interpreter(effect, dispatch) {
  var actionCtor = effect[2];
  var api = RouteAlertBehavior.directionsApi(effect[0], effect[1]);
  console.log(api);
  fetch(api).then((function (prim) {
            return prim.json();
          })).then((function (json) {
          return Promise.resolve((console.log(json), /* () */0));
        }));
  setTimeout((function (param) {
          console.log("test");
          Curry._1(dispatch, Curry._1(actionCtor, 5));
          return /* () */0;
        }), 1000);
  return /* () */0;
}

function RouteAlert(Props) {
  var match = useReducer(RouteAlertBehavior.initialState, RouteAlertBehavior.reducer, interpreter);
  var dispatch = match[1];
  var state = match[0];
  return React.createElement(React.Fragment, undefined, React.createElement("input", {
                  name: "start-point",
                  type: "text",
                  onChange: (function (e) {
                      return Curry._1(dispatch, dispatchEvent(RouteAlertBehavior.setOrigin, e));
                    })
                }), React.createElement("input", {
                  name: "destination",
                  type: "text",
                  onChange: (function (e) {
                      return Curry._1(dispatch, dispatchEvent(RouteAlertBehavior.setDestination, e));
                    })
                }), React.createElement("input", {
                  name: "destination",
                  type: "number",
                  onChange: (function (e) {
                      return Curry._1(dispatch, setMinutes(e));
                    })
                }), React.createElement("p", undefined, "Start: " + RouteAlertBehavior.displayString(state.origin)), React.createElement("p", undefined, "Destination: " + RouteAlertBehavior.displayString(state.destination)), React.createElement("p", undefined, "Minutes: " + RouteAlertBehavior.displayInt(state.minutes)), React.createElement("button", {
                  disabled: !RouteAlertBehavior.canFetch(state),
                  onClick: (function (param) {
                      return Curry._1(dispatch, /* FetchRoute */0);
                    })
                }, "Set alert"), React.createElement("p", undefined, "Route duration: " + Belt_Option.mapWithDefault(state.routeDuration, "None", (function (prim) {
                        return String(prim);
                      }))));
}

var make = RouteAlert;

exports.ReactReffect = ReactReffect;
exports.dispatchEvent = dispatchEvent;
exports.setMinutes = setMinutes;
exports.interpreter = interpreter;
exports.make = make;
/* react Not a pure module */
