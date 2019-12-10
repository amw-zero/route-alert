type action = SetStartPoint(string) | SetDestination(string);

type state = {
  startPoint: option(string),
  destination: option(string)
};

let reducer = (state, action) => {
  switch(action) {
  | SetStartPoint(point) => { ...state, startPoint: Some(point) }
  | SetDestination(dest) => { ...state, destination: Some(dest) }
  };
};

let startString = (startPoint) => {
  switch(startPoint) {
  | Some(s) => s
  | None => "nothing"
  };
};

let start_point_of_input = (e) => {
  let s = switch(e->ReactEvent.Form.target##value) {
  | "" => "nada"
  | s => s  
  };

  SetStartPoint(s);
};

[@react.component]
let make = () => {
  let (state, dispatch) = React.useReducer(reducer, { startPoint: None, destination: None });

  <>
    <input name="start-point" type_="text" onChange={(e) => dispatch(start_point_of_input(e))}/>
    <p> { React.string(startString(state.startPoint)) } </p>
  </>;
};