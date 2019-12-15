'use strict';

var Block = require("bs-platform/lib/js/block.js");
var Belt_List = require("bs-platform/lib/js/belt_List.js");
var RouteAlert$ReasonReactExamples = require("./RouteAlert.bs.js");

function testActions(actions) {
  return Belt_List.reduce(actions, RouteAlert$ReasonReactExamples.initialState, (function (s, a) {
                return RouteAlert$ReasonReactExamples.reducer(s, a)[0];
              }));
}

function testPreventingAlertCreationWhenAllDataIsNotPresent(param) {
  var finalState = testActions(/* :: */[
        /* SetStartPoint */Block.__(0, ["origin"]),
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
  var finalState = testActions(/* :: */[
        /* SetStartPoint */Block.__(0, ["origin"]),
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

exports.testActions = testActions;
exports.testPreventingAlertCreationWhenAllDataIsNotPresent = testPreventingAlertCreationWhenAllDataIsNotPresent;
exports.testPreventingAlertCreationWhenAllDataIsPresent = testPreventingAlertCreationWhenAllDataIsPresent;
/* RouteAlert-ReasonReactExamples Not a pure module */
