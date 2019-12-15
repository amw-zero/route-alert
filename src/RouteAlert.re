open RouteAlertBehavior;
open Belt.Option;
open Js.Promise;

module ReactReffect {
  let useReducer =
      (
        initialState: 's,
        reducer: Reffect.reducerFunc('s, 'a, 'e),
        interpreter: ('e, Reffect.dispatchFunc('a)) => unit,
      )
      : ('s, Reffect.dispatchFunc('a)) => {
    let (state, setState) = React.useState(() => initialState);
    let dispatch =
      Reffect.makeDispatch(state, reducer, interpreter, s => setState(_ => s));

    (state, dispatch);
  }; 
}

let dispatchEvent = (actionCtor, e) => {
  let s =
    switch (e->ReactEvent.Form.target##value) {
    | "" => "nada"
    | s => s
    };

  actionCtor(s);
};

let setMinutes = e => {
  SetMinutes(int_of_string(e->ReactEvent.Form.target##value));
};

let interpreter = (effect, dispatch) => {
  switch (effect) {
  | CalculateRoute(origin, destination, actionCtor) =>
    let api = directionsApi(origin, destination);
    Js.log(api);
    let _ = Fetch.fetch(api)
    |> then_(Fetch.Response.json)
    |> then_(json => Js.log(json) |> resolve);

    let _ =
      setTimeout(
        () => {
          Js.log("test");
          dispatch(actionCtor(5));
          ();
        },
        1_000,
      );
    ();
  };
};

[@react.component]
let make = () => {
  let (state, dispatch) =
    ReactReffect.useReducer(initialState, reducer, interpreter);

  <>
    <input
      name="start-point"
      type_="text"
      onChange={e => dispatch(dispatchEvent(setOrigin, e))}
    />
    <input
      name="destination"
      type_="text"
      onChange={e => dispatch(dispatchEvent(setDestination, e))}
    />
    <input
      name="destination"
      type_="number"
      onChange={e => dispatch(setMinutes(e))}
    />
    <p> {React.string("Start: " ++ displayString(state.origin))} </p>
    <p>
      {React.string("Destination: " ++ displayString(state.destination))}
    </p>
    <p> {React.string("Minutes: " ++ displayInt(state.minutes))} </p>
    <button
      disabled={!canFetch(state)}
      onClick={_ => dispatch(FetchRoute)}>
      {React.string("Set alert")}
    </button>
    <p>
      {React.string(
         "Route duration: "
         ++ state.routeDuration->mapWithDefault("None", string_of_int),
       )}
    </p>
  </>;
};
