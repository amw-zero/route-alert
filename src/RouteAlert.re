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

let applyFetchAbility = state => {
  let routeFetchAbility =
    switch (state.startPoint, state.destination, state.minutes) {
    | (Some(_), Some(_), Some(_)) => CanFetch
    | _ => CannotFetch
    };

  {...state, routeFetchAbility};
};

let reducer = (state, action) => {
  applyFetchAbility(
    switch (action) {
    | SetStartPoint(point) => {...state, startPoint: Some(point)}
    | SetDestination(dest) => {...state, destination: Some(dest)}
    | SetMinutes(minutes) => {...state, minutes: Some(minutes)}
    | FetchRoute(_) => state
    | Noop => state
    },
  );
};

let displayString = ostr => {
  Belt.Option.mapWithDefault(ostr, "nada", s => s);
};

let displayInt = i => {
  Belt.Option.mapWithDefault(i, "nada", n => string_of_int(n));
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

[@react.component]
let make = () => {
  let (state, dispatch) = React.useReducer(reducer, initialState);

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
  </>;
};
