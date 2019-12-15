open Belt.List;
open RouteAlert;

let testInterpreter = (effect, dispatch) => {
  switch (effect) {
    | CalculateRoute(_, _, actionCtor) => dispatch(actionCtor(90))
  };
};

let reduceActions = (actions) => {
  let state = ref(initialState);
  actions->reduce(
    initialState,
    (_, action) => {
      Reffect.makeDispatch(state^, reducer, testInterpreter, s => state:= s)(action);

      state^
    }
  );
};

let testPreventingAlertCreationWhenAllDataIsNotPresent = () => {
  let finalState = reduceActions([
    SetOrigin("origin"), 
    SetDestination("dest")
  ])

  Js.log(switch (finalState.routeFetchAbility) {
    | CanFetch => "fail"
    | CannotFetch => "pass"
  });
};

let testPreventingAlertCreationWhenAllDataIsPresent = () => {
  let finalState = reduceActions([
    SetOrigin("origin"), 
    SetDestination("dest"), 
    SetMinutes(5)
  ]);

  Js.log(switch(finalState.routeFetchAbility) {
    | CanFetch => "pass"
    | CannotFetch => "fail"
  });
};

let testCalculatingRouteDuration = () => {
  let finalState = reduceActions([
    SetOrigin("origin"), 
    SetDestination("dest"), 
    SetMinutes(5),
    FetchRoute
  ]);

  Js.log(switch(finalState.routeDuration) {
    | Some(90) => "pass"
    | _ => "fail"
  });
};
