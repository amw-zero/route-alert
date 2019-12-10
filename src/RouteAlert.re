[@bs.deriving accessors]
type action =
  | SetStartPoint(string)
  | SetDestination(string)
  | SetMinutes(int);

type routeFetchAbility =
  | CanFetch
  | CannotFetch;

type state = {
  startPoint: option(string),
  destination: option(string),
  minutes: option(int),
  routeFetchAbility
};

let initialState = {startPoint: None, destination: None, minutes: None, routeFetchAbility: CannotFetch };

let reducer = (state, action) => {
  switch (action) {
  | SetStartPoint(point) => {...state, startPoint: Some(point)}
  | SetDestination(dest) => {...state, destination: Some(dest)}
  | SetMinutes(minutes) => {...state, minutes: Some(minutes)}
  };
};

let displayString = ostr => {
  Belt.Option.mapWithDefault(ostr, "nada", s => s);
};

let displayInt = i => {
  Belt.Option.mapWithDefault(i, "nada", n => string_of_int(n));
};

let dispatchEvent = (action, e) => {
  let s =
    switch (e->ReactEvent.Form.target##value) {
    | "" => "nada"
    | s => s
    };

  action(s);
};

let setMinutes = e => {
  SetMinutes(int_of_string(e->ReactEvent.Form.target##value));
};

let directionsApi = (startPoint, destination) => {
  "https://maps.googleapis.com/maps/api/directions/json?origin=" ++ startPoint ++ "&destination=" ++ destination ++ "&key=AIzaSyC6AfIwElNGcfmzz-XyBHUb3ftWb2SL2vU";
};

let fetchDirections = (state, _) => {
  switch((state.startPoint, state.destination)) {
    | (Some(sp), Some(d)) => Some(directionsApi(sp, d))
    | _ => None
  };
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
//    <button onClick={fetchDirections(state)}>{React.string("Set alert")}</button>
  </>;
};
