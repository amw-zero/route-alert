'use strict';

var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Belt_Option = require("bs-platform/lib/js/belt_Option.js");
var Caml_format = require("bs-platform/lib/js/caml_format.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");

function useReducer(initialState, reducer, interpreter) {
  var match = React.useState((function () {
          return initialState;
        }));
  var setState = match[1];
  var state = match[0];
  var dispatch = function (action) {
    var match = Curry._2(reducer, state, action);
    var nextEffect = match[1];
    var nextState = match[0];
    Curry._1(setState, (function (param) {
            return nextState;
          }));
    if (nextEffect !== undefined) {
      return Curry._2(interpreter, Caml_option.valFromOption(nextEffect), dispatch);
    } else {
      return /* () */0;
    }
  };
  return /* tuple */[
          state,
          dispatch
        ];
}

var Reffect = {
  useReducer: useReducer
};

function setStartPoint(param_0) {
  return /* SetStartPoint */Block.__(0, [param_0]);
}

function setDestination(param_0) {
  return /* SetDestination */Block.__(1, [param_0]);
}

function fetchRoute(param_0) {
  return /* FetchRoute */Block.__(3, [param_0]);
}

var initialState = {
  startPoint: undefined,
  destination: undefined,
  minutes: undefined,
  routeFetchAbility: /* CannotFetch */1
};

function applyFetchAbility(stateEffect) {
  var state = stateEffect[0];
  var match = state.startPoint;
  var match$1 = state.destination;
  var match$2 = state.minutes;
  var routeFetchAbility = match !== undefined && match$1 !== undefined && match$2 !== undefined ? /* CanFetch */0 : /* CannotFetch */1;
  return /* tuple */[
          {
            startPoint: state.startPoint,
            destination: state.destination,
            minutes: state.minutes,
            routeFetchAbility: routeFetchAbility
          },
          stateEffect[1]
        ];
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

function dispatchEvent(actionCtor, e) {
  var s = e.target.value;
  var tmp = s === "" ? "nada" : s;
  return Curry._1(actionCtor, tmp);
}

function setMinutes(e) {
  return /* SetMinutes */Block.__(2, [Caml_format.caml_int_of_string(e.target.value)]);
}

function directionsApi(startPoint, destination) {
  return "https://maps.googleapis.com/maps/api/directions/json?origin=" + (startPoint + ("&destination=" + (destination + "&key=AIzaSyC6AfIwElNGcfmzz-XyBHUb3ftWb2SL2vU")));
}

function dispatchFetchDirections(state) {
  var match = state.startPoint;
  var match$1 = state.destination;
  if (match !== undefined && match$1 !== undefined) {
    return /* FetchRoute */Block.__(3, [{
                startPoint: match,
                destination: match$1
              }]);
  } else {
    return /* Noop */0;
  }
}

function canFetch(state) {
  var match = state.routeFetchAbility;
  if (match) {
    return false;
  } else {
    return true;
  }
}

function effectReducer(state, action) {
  var tmp;
  if (typeof action === "number") {
    tmp = /* tuple */[
      state,
      undefined
    ];
  } else {
    switch (action.tag | 0) {
      case /* SetStartPoint */0 :
          tmp = /* tuple */[
            {
              startPoint: action[0],
              destination: state.destination,
              minutes: state.minutes,
              routeFetchAbility: state.routeFetchAbility
            },
            undefined
          ];
          break;
      case /* SetDestination */1 :
          tmp = /* tuple */[
            {
              startPoint: state.startPoint,
              destination: action[0],
              minutes: state.minutes,
              routeFetchAbility: state.routeFetchAbility
            },
            undefined
          ];
          break;
      case /* SetMinutes */2 :
          tmp = /* tuple */[
            {
              startPoint: state.startPoint,
              destination: state.destination,
              minutes: action[0],
              routeFetchAbility: state.routeFetchAbility
            },
            undefined
          ];
          break;
      case /* FetchRoute */3 :
          tmp = /* tuple */[
            state,
            undefined
          ];
          break;
      
    }
  }
  return applyFetchAbility(tmp);
}

function interpreter(effect, dispatch) {
  return /* () */0;
}

function RouteAlert(Props) {
  var match = useReducer(initialState, effectReducer, interpreter);
  var dispatchE = match[1];
  var stateE = match[0];
  return React.createElement(React.Fragment, undefined, React.createElement("input", {
                  name: "start-point",
                  type: "text",
                  onChange: (function (e) {
                      return Curry._1(dispatchE, dispatchEvent(setStartPoint, e));
                    })
                }), React.createElement("input", {
                  name: "destination",
                  type: "text",
                  onChange: (function (e) {
                      return Curry._1(dispatchE, dispatchEvent(setDestination, e));
                    })
                }), React.createElement("input", {
                  name: "destination",
                  type: "number",
                  onChange: (function (e) {
                      return Curry._1(dispatchE, setMinutes(e));
                    })
                }), React.createElement("p", undefined, "Start: " + Belt_Option.mapWithDefault(stateE.startPoint, "nada", (function (s) {
                        return s;
                      }))), React.createElement("p", undefined, "Destination: " + Belt_Option.mapWithDefault(stateE.destination, "nada", (function (s) {
                        return s;
                      }))), React.createElement("p", undefined, "Minutes: " + displayInt(stateE.minutes)), React.createElement("button", {
                  disabled: !canFetch(stateE),
                  onClick: (function (param) {
                      return Curry._1(dispatchE, dispatchFetchDirections(stateE));
                    })
                }, "Set alert"));
}

var noop = /* Noop */0;

var make = RouteAlert;

exports.Reffect = Reffect;
exports.setStartPoint = setStartPoint;
exports.setDestination = setDestination;
exports.fetchRoute = fetchRoute;
exports.noop = noop;
exports.initialState = initialState;
exports.applyFetchAbility = applyFetchAbility;
exports.displayString = displayString;
exports.displayInt = displayInt;
exports.dispatchEvent = dispatchEvent;
exports.setMinutes = setMinutes;
exports.directionsApi = directionsApi;
exports.dispatchFetchDirections = dispatchFetchDirections;
exports.canFetch = canFetch;
exports.effectReducer = effectReducer;
exports.interpreter = interpreter;
exports.make = make;
/* react Not a pure module */
