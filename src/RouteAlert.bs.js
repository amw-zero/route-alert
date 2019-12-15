'use strict';

var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Belt_Option = require("bs-platform/lib/js/belt_Option.js");
var Caml_format = require("bs-platform/lib/js/caml_format.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");

function makeDispatch(state, reducer, interpreter, onNextState) {
  var dispatch = function (action) {
    var match = Curry._2(reducer, state, action);
    var nextEffect = match[1];
    Curry._1(onNextState, match[0]);
    if (nextEffect !== undefined) {
      return Curry._2(interpreter, Caml_option.valFromOption(nextEffect), dispatch);
    } else {
      return /* () */0;
    }
  };
  return dispatch;
}

function useReducer(initialState, reducer, interpreter) {
  var match = React.useState((function () {
          return initialState;
        }));
  var setState = match[1];
  var state = match[0];
  var dispatch = makeDispatch(state, reducer, interpreter, (function (s) {
          return Curry._1(setState, (function (param) {
                        return s;
                      }));
        }));
  return /* tuple */[
          state,
          dispatch
        ];
}

var Reffect = {
  makeDispatch: makeDispatch,
  useReducer: useReducer
};

function setOrigin(param_0) {
  return /* SetOrigin */Block.__(0, [param_0]);
}

function setDestination(param_0) {
  return /* SetDestination */Block.__(1, [param_0]);
}

function fetchedRoute(param_0) {
  return /* FetchedRoute */Block.__(3, [param_0]);
}

var initialState = {
  origin: undefined,
  destination: undefined,
  minutes: undefined,
  routeFetchAbility: /* CannotFetch */1,
  dataLoadingState: /* NotLoading */1,
  routeDuration: undefined
};

function applyFetchAbility(stateEffect) {
  var state = stateEffect[0];
  var match = state.origin;
  var match$1 = state.destination;
  var match$2 = state.minutes;
  var routeFetchAbility = match !== undefined && match$1 !== undefined && match$2 !== undefined ? /* CanFetch */0 : /* CannotFetch */1;
  return /* tuple */[
          {
            origin: state.origin,
            destination: state.destination,
            minutes: state.minutes,
            routeFetchAbility: routeFetchAbility,
            dataLoadingState: state.dataLoadingState,
            routeDuration: state.routeDuration
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

function directionsApi(origin, destination) {
  return "https://maps.googleapis.com/maps/api/directions/json?origin=" + (origin + ("&destination=" + (destination + "&key=AIzaSyC6AfIwElNGcfmzz-XyBHUb3ftWb2SL2vU")));
}

function canFetch(state) {
  var match = state.routeFetchAbility;
  if (match) {
    return false;
  } else {
    return true;
  }
}

function reducer(state, action) {
  var tmp;
  if (typeof action === "number") {
    tmp = action === /* FetchRoute */0 ? /* tuple */[
        {
          origin: state.origin,
          destination: state.destination,
          minutes: state.minutes,
          routeFetchAbility: state.routeFetchAbility,
          dataLoadingState: /* Loading */0,
          routeDuration: state.routeDuration
        },
        /* CalculateRoute */[
          Belt_Option.getExn(state.origin),
          Belt_Option.getExn(state.destination),
          fetchedRoute
        ]
      ] : /* tuple */[
        state,
        undefined
      ];
  } else {
    switch (action.tag | 0) {
      case /* SetOrigin */0 :
          tmp = /* tuple */[
            {
              origin: action[0],
              destination: state.destination,
              minutes: state.minutes,
              routeFetchAbility: state.routeFetchAbility,
              dataLoadingState: state.dataLoadingState,
              routeDuration: state.routeDuration
            },
            undefined
          ];
          break;
      case /* SetDestination */1 :
          tmp = /* tuple */[
            {
              origin: state.origin,
              destination: action[0],
              minutes: state.minutes,
              routeFetchAbility: state.routeFetchAbility,
              dataLoadingState: state.dataLoadingState,
              routeDuration: state.routeDuration
            },
            undefined
          ];
          break;
      case /* SetMinutes */2 :
          tmp = /* tuple */[
            {
              origin: state.origin,
              destination: state.destination,
              minutes: action[0],
              routeFetchAbility: state.routeFetchAbility,
              dataLoadingState: state.dataLoadingState,
              routeDuration: state.routeDuration
            },
            undefined
          ];
          break;
      case /* FetchedRoute */3 :
          tmp = /* tuple */[
            {
              origin: state.origin,
              destination: state.destination,
              minutes: state.minutes,
              routeFetchAbility: state.routeFetchAbility,
              dataLoadingState: state.dataLoadingState,
              routeDuration: action[0]
            },
            undefined
          ];
          break;
      
    }
  }
  return applyFetchAbility(tmp);
}

function interpreter(effect, dispatch) {
  var actionCtor = effect[2];
  var api = directionsApi(effect[0], effect[1]);
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
  var match = useReducer(initialState, reducer, interpreter);
  var dispatch = match[1];
  var state = match[0];
  return React.createElement(React.Fragment, undefined, React.createElement("input", {
                  name: "start-point",
                  type: "text",
                  onChange: (function (e) {
                      return Curry._1(dispatch, dispatchEvent(setOrigin, e));
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
                }), React.createElement("p", undefined, "Start: " + Belt_Option.mapWithDefault(state.origin, "nada", (function (s) {
                        return s;
                      }))), React.createElement("p", undefined, "Destination: " + Belt_Option.mapWithDefault(state.destination, "nada", (function (s) {
                        return s;
                      }))), React.createElement("p", undefined, "Minutes: " + displayInt(state.minutes)), React.createElement("button", {
                  disabled: !canFetch(state),
                  onClick: (function (param) {
                      return Curry._1(dispatch, /* FetchRoute */0);
                    })
                }, "Set alert"), React.createElement("p", undefined, "Route duration: " + Belt_Option.mapWithDefault(state.routeDuration, "None", (function (prim) {
                        return String(prim);
                      }))));
}

var fetchRoute = /* FetchRoute */0;

var noop = /* Noop */1;

var make = RouteAlert;

exports.Reffect = Reffect;
exports.setOrigin = setOrigin;
exports.setDestination = setDestination;
exports.fetchRoute = fetchRoute;
exports.fetchedRoute = fetchedRoute;
exports.noop = noop;
exports.initialState = initialState;
exports.applyFetchAbility = applyFetchAbility;
exports.displayString = displayString;
exports.displayInt = displayInt;
exports.dispatchEvent = dispatchEvent;
exports.setMinutes = setMinutes;
exports.directionsApi = directionsApi;
exports.canFetch = canFetch;
exports.reducer = reducer;
exports.interpreter = interpreter;
exports.make = make;
/* react Not a pure module */
