open Belt.List;
open RouteAlert;

let testInterpreter = (effect, dispatch) => {
  switch (effect) {
    | CalculateRoute(_, _, actionCtor) => dispatch(actionCtor(5))
  };
};

let reduceActions = (actions) => {
  let state = ref(initialState);
  actions->reduce(
    initialState,
    (_, action) => {
      let dispatch = Reffect.makeDispatch(state^, reducer, testInterpreter, s => state:= s);
      dispatch(action);

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
