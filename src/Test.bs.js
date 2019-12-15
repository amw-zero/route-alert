'use strict';

var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Belt_List = require("bs-platform/lib/js/belt_List.js");
var RouteAlert$ReasonReactExamples = require("./RouteAlert.bs.js");

function testInterpreter(effect, dispatch) {
  return Curry._1(dispatch, Curry._1(effect[2], 5));
}

function reduceActions(actions) {
  var state = {
    contents: RouteAlert$ReasonReactExamples.initialState
  };
  return Belt_List.reduce(actions, RouteAlert$ReasonReactExamples.initialState, (function (param, action) {
                var dispatch = RouteAlert$ReasonReactExamples.Reffect.makeDispatch(state.contents, RouteAlert$ReasonReactExamples.reducer, testInterpreter, (function (s) {
                        state.contents = s;
                        return /* () */0;
                      }));
                Curry._1(dispatch, action);
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

exports.testInterpreter = testInterpreter;
exports.reduceActions = reduceActions;
exports.testPreventingAlertCreationWhenAllDataIsNotPresent = testPreventingAlertCreationWhenAllDataIsNotPresent;
exports.testPreventingAlertCreationWhenAllDataIsPresent = testPreventingAlertCreationWhenAllDataIsPresent;
/* RouteAlert-ReasonReactExamples Not a pure module */
