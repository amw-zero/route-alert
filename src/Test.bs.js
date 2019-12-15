'use strict';

var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Belt_List = require("bs-platform/lib/js/belt_List.js");
var RouteAlertBehavior = require("route-alert-behavior/src/RouteAlertBehavior.bs.js");

function testInterpreter(effect, dispatch) {
  return Curry._1(dispatch, Curry._1(effect[2], 90));
}

function reduceActions(actions) {
  var state = {
    contents: RouteAlertBehavior.initialState
  };
  return Belt_List.reduce(actions, RouteAlertBehavior.initialState, (function (param, action) {
                RouteAlertBehavior.Reffect.makeDispatch(state.contents, RouteAlertBehavior.reducer, testInterpreter, (function (s) {
                          state.contents = s;
                          return /* () */0;
                        }))(action);
                return state.contents;
              }));
}

function testPreventingAlertCreationWhenAllDataIsNotPresent(param) {
  var finalState = reduceActions(/* :: */[
        /* SetOrigin */Block.__(0, ["origin"]),
        /* :: */[
          /* SetDestination */Block.__(1, ["dest"]),
          /* [] */0
        ]
      ]);
  var match = finalState.routeFetchAbility;
  console.log(match ? "pass" : "fail");
  return /* () */0;
}

function testPreventingAlertCreationWhenAllDataIsPresent(param) {
  var finalState = reduceActions(/* :: */[
        /* SetOrigin */Block.__(0, ["origin"]),
        /* :: */[
          /* SetDestination */Block.__(1, ["dest"]),
          /* :: */[
            /* SetMinutes */Block.__(2, [5]),
            /* [] */0
          ]
        ]
      ]);
  var match = finalState.routeFetchAbility;
  console.log(match ? "fail" : "pass");
  return /* () */0;
}

function testCalculatingRouteDuration(param) {
  var finalState = reduceActions(/* :: */[
        /* SetOrigin */Block.__(0, ["origin"]),
        /* :: */[
          /* SetDestination */Block.__(1, ["dest"]),
          /* :: */[
            /* SetMinutes */Block.__(2, [5]),
            /* :: */[
              /* FetchRoute */0,
              /* [] */0
            ]
          ]
        ]
      ]);
  var match = finalState.routeDuration;
  console.log(match === 90 ? "pass" : "fail");
  return /* () */0;
}

exports.testInterpreter = testInterpreter;
exports.reduceActions = reduceActions;
exports.testPreventingAlertCreationWhenAllDataIsNotPresent = testPreventingAlertCreationWhenAllDataIsNotPresent;
exports.testPreventingAlertCreationWhenAllDataIsPresent = testPreventingAlertCreationWhenAllDataIsPresent;
exports.testCalculatingRouteDuration = testCalculatingRouteDuration;
/* No side effect */
