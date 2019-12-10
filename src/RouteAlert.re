type action = 
  SetStartPoint(string) 
  | SetDestination(string)
  | SetMinutes(int);

type state = {
  startPoint: option(string),
  destination: option(string),
  minutes: option(int)
};

let initialState = { 
  startPoint: None, 
  destination: None,
  minutes: None
};

let reducer = (state, action) => {
  switch(action) {
  | SetStartPoint(point) => { ...state, startPoint: Some(point) }
  | SetDestination(dest) => { ...state, destination: Some(dest) }
  | SetMinutes(minutes) => { ...state, minutes: Some(minutes) }
  };
};

let displayString = (ostr) => {
  switch(ostr) {
  | Some(s) => s
  | None => "nothing"
  };
};

let displayInt = (i) => {
  Belt.Option.mapWithDefault(i, "nada", (n) => string_of_int(n));
}

let startPoint = (e) => {
  let s = switch(e->ReactEvent.Form.target##value) {
  | "" => "nada"
  | s => s  
  };

  SetStartPoint(s);
};

let destination = (e) => {
  let s = switch(e->ReactEvent.Form.target##value) {
  | "" => "nada"
  | s => s  
  };

  SetDestination(s);
};

let minutes = (e) => {
  SetMinutes(int_of_string(e->ReactEvent.Form.target##value))
};

[@react.component]
let make = () => {
  let (state, dispatch) = React.useReducer(reducer, initialState);

  <>
    <input name="start-point" type_="text" onChange={(e) => dispatch(startPoint(e))}/>
    <input name="destination" type_="text" onChange={(e) => dispatch(destination(e))}/>
    <input name="destination" type_="number" onChange={(e) => dispatch(minutes(e))}/>    

    <p> { React.string("Start: " ++ displayString(state.startPoint)) } </p>
    <p> { React.string("Destination: " ++ displayString(state.destination)) } </p>    
    <p> { React.string("Minutes: " ++ displayInt(state.minutes)) } </p>        
  </>;
};