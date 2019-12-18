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

function setMinutes(e) {
  return /* SetMinutes */Block.__(2, [Caml_format.caml_int_of_string(e.target.value)]);
}

function networkBridge(request, respond) {
  var match = request.path;
  if (match === "/route_alerts") {
    setTimeout((function (param) {
            return Curry._1(respond, RouteAlertBehavior.routeAlertEncoder({
                            origin: "one",
                            destination: "two",
                            durationMinutes: 5
                          }));
          }), 1000);
    return /* () */0;
  } else {
    return Curry._1(respond, RouteAlertBehavior.errorResponseEncoder({
                    message: "bad route"
                  }));
  }
}

function appInterpreter(param, param$1) {
  return RouteAlertBehavior.behaviorInterpreter(networkBridge, param, param$1);
}

function RouteAlert(Props) {
  var match = useReducer(RouteAlertBehavior.initialState, RouteAlertBehavior.reducer, appInterpreter);
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
                }), React.createElement("p", undefined, "Start: " + Belt_Option.mapWithDefault(state.origin, "nada", (function (s) {
                        return s;
                      }))), React.createElement("p", undefined, "Destination: " + Belt_Option.mapWithDefault(state.destination, "nada", (function (s) {
                        return s;
                      }))), React.createElement("p", undefined, "Minutes: " + displayInt(state.minutes)), React.createElement("button", {
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
exports.displayString = displayString;
exports.displayInt = displayInt;
exports.setMinutes = setMinutes;
exports.networkBridge = networkBridge;
exports.appInterpreter = appInterpreter;
exports.make = make;
/* react Not a pure module */
