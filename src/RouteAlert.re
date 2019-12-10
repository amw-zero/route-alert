type action = SetStartPoint(string) | SetDestination(string);

let setStartPoint = (c) => {
  let x = 5;
};


type state = {
  startPoint: option(string),
  destination: option(string)
};

let reducer = (state, action) => {
  {
    startPoint: Some("test"),
    destination: Some("test")
  };
};

let startString = (startPoint) => {
  switch(startPoint) {
  | Some(s) => s
  | None => "nothing"
  };
};

[@react.component]
let make = () => {
  let (state, dispatch) = React.useReducer(reducer, { startPoint: None, destination: None });

  <>
    <input name="start-point" type_="text" onChange={(_) => dispatch(SetStartPoint("new"))}/>
    <p> { React.string(startString(state.startPoint)) } </p>
  </>;
};