open Belt.Option;

module Reffect = {
  let useReducer =
      (
        initialState: 's,
        reducer: ('s, 'a) => ('s, option('e)),
        interpreter: ('e, 'a => unit) => unit,
      )
      : ('s, 'a => unit) => {
    let (state, setState) = React.useState(() => initialState);

    let rec dispatch = (action: 'a): unit => {
      let (nextState, nextEffect) = reducer(state, action);
      setState(_ => nextState);
      switch (nextEffect) {
      | Some(effect) => interpreter(effect, dispatch)
      | None => ()
      };
    };

    (state, dispatch);
  };
};

type route = {
  startPoint: string,
  destination: string,
};

[@bs.deriving accessors]
type action =
  | SetStartPoint(string)
  | SetDestination(string)
  | SetMinutes(int)
  | FetchRoute(route)
  | Noop;

type routeFetchAbility =
  | CanFetch
  | CannotFetch;

type state = {
  startPoint: option(string),
  destination: option(string),
  minutes: option(int),
  routeFetchAbility,
};

let initialState = {
  startPoint: None,
  destination: None,
  minutes: None,
  routeFetchAbility: CannotFetch,
};

let applyFetchAbility = stateEffect => {
  let state = fst(stateEffect);
  let routeFetchAbility =
    switch (state.startPoint, state.destination, state.minutes) {
    | (Some(_), Some(_), Some(_)) => CanFetch
    | _ => CannotFetch
    };

  ({...state, routeFetchAbility}, snd(stateEffect));
};

let displayString = ostr => {
  mapWithDefault(ostr, "nada", s => s);
};

let displayInt = i => {
  mapWithDefault(i, "nada", n => string_of_int(n));
};

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

let directionsApi = (startPoint, destination) => {
  "https://maps.googleapis.com/maps/api/directions/json?origin="
  ++ startPoint
  ++ "&destination="
  ++ destination
  ++ "&key=AIzaSyC6AfIwElNGcfmzz-XyBHUb3ftWb2SL2vU";
};

let dispatchFetchDirections = state => {
  switch (state.startPoint, state.destination) {
  | (Some(sp), Some(d)) => FetchRoute({startPoint: sp, destination: d})
  | _ => Noop
  };
};

let canFetch = state =>
  switch (state.routeFetchAbility) {
  | CanFetch => true
  | CannotFetch => false
  };

// Reffect model

type effect =
  | CalculateRoute;

let effectReducer = (state, action) => {
  let res =
    switch (action) {
    | SetStartPoint(point) => ({...state, startPoint: Some(point)}, None)
    | SetDestination(dest) => ({...state, destination: Some(dest)}, None)
    | SetMinutes(minutes) => ({...state, minutes: Some(minutes)}, None)
    | FetchRoute(_) => (state, None)
    | Noop => (state, None)
    };

  applyFetchAbility(res);
};

let interpreter = (effect, dispatch) => {
  switch (effect) {
  | CalculateRoute => ()
  };
};

[@react.component]
let make = () => {
  let (stateE, dispatchE) =
    Reffect.useReducer(initialState, effectReducer, interpreter);

  <>
    <input
      name="start-point"
      type_="text"
      onChange={e => dispatchE(dispatchEvent(setStartPoint, e))}
    />
    <input
      name="destination"
      type_="text"
      onChange={e => dispatchE(dispatchEvent(setDestination, e))}
    />
    <input
      name="destination"
      type_="number"
      onChange={e => dispatchE(setMinutes(e))}
    />
    <p> {React.string("Start: " ++ displayString(stateE.startPoint))} </p>
    <p>
      {React.string("Destination: " ++ displayString(stateE.destination))}
    </p>
    <p> {React.string("Minutes: " ++ displayInt(stateE.minutes))} </p>
    <button
      disabled={!canFetch(stateE)}
      onClick={_ => dispatchE(dispatchFetchDirections(stateE))}>
      {React.string("Set alert")}
    </button>
  </>;
};
