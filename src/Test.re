let testActions = (actions) => {
  Belt.List.reduce(actions, RouteAlert.initialState, (s, a) => RouteAlert.reducer(s, a) |> fst);
};

let testPreventingAlertCreationWhenAllDataIsNotPresent = () => {
  let finalState = testActions([RouteAlert.SetStartPoint("origin"), SetDestination("dest")]);

  Js.log(switch(finalState.routeFetchAbility) {
    | CanFetch => "fail"
    | CannotFetch => "pass"
  });
};

let testPreventingAlertCreationWhenAllDataIsPresent = () => {
  let finalState = testActions([RouteAlert.SetStartPoint("origin"), SetDestination("dest"), SetMinutes(5)]);

  Js.log(switch(finalState.routeFetchAbility) {
    | CanFetch => "pass"
    | CannotFetch => "fail"
  });
};
