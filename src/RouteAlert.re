[@bs.val] external setTimeout: (unit => unit, int) => float = "setTimeout";
open Belt.Option;
open Js.Promise;

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
  | FetchedRoute(int)
  | Noop;

type routeFetchAbility =
  | CanFetch
  | CannotFetch;

type dataLoadingState =
  | Loading
  | NotLoading;

type state = {
  startPoint: option(string),
  destination: option(string),
  minutes: option(int),
  routeFetchAbility,
  dataLoadingState,
  routeDuration: option(int)
};

let initialState = {
  startPoint: None,
  destination: None,
  minutes: None,
  routeFetchAbility: CannotFetch,
  dataLoadingState: NotLoading,
  routeDuration: None
};

let applyFetchAbility = stateEffect => {
  let state = fst(stateEffect);
  let routeFetchAbility =
    switch (state.startPoint, state.destination, state.minutes) {
    | _ => CanFetch
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

type googleDuration = {value: int};

type googleLeg = {duration: googleDuration};

type googleRoute = {legs: array(googleLeg)};

type googleDirections = {routes: array(googleRoute)};

// Reffect model

type startPoint = string;
type destination = string;

type effect('a) =
  | CalculateRoute(startPoint, destination, int => 'a);

let effectReducer = (state, action) => {
  let res =
    switch (action) {
    | SetStartPoint(point) => ({...state, startPoint: Some(point)}, None)
    | SetDestination(dest) => ({...state, destination: Some(dest)}, None)
    | SetMinutes(minutes) => ({...state, minutes: Some(minutes)}, None)
    | FetchRoute(route) => (
        {...state, dataLoadingState: Loading},
        Some(
          CalculateRoute(
            state.startPoint->getExn,
            state.destination->getExn,
            fetchedRoute,
          ),
        ),
      )
    | FetchedRoute(i) =>
      Js.log(string_of_int(i));
      ({...state, routeDuration: Some(i)}, None)
    | Noop => (state, None)
    };

  applyFetchAbility(res);
};

let interpreter = (effect, dispatch) => {
  switch (effect) {
  | CalculateRoute(startPoint, destination, actionCtor) =>
    let api = directionsApi(startPoint, destination);
    Js.log(api);
    Fetch.fetch(api)
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
    Reffect.useReducer(initialState, effectReducer, interpreter);

  <>
    <input
      name="start-point"
      type_="text"
      onChange={e => dispatch(dispatchEvent(setStartPoint, e))}
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
    <p> {React.string("Start: " ++ displayString(state.startPoint))} </p>
    <p>
      {React.string("Destination: " ++ displayString(state.destination))}
    </p>
    <p> {React.string("Minutes: " ++ displayInt(state.minutes))} </p>
    <button
      disabled={!canFetch(state)}
      onClick={_ => dispatch(dispatchFetchDirections(state))}>
      {React.string("Set alert")}
    </button>
    <p>{React.string("Route duration: " ++ state.routeDuration->mapWithDefault("None", string_of_int))}</p>
  </>;
};
