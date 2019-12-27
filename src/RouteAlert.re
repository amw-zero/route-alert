open RouteAlertBehavior;
open Belt.Option;
open Js.Promise;

[@bs.val] external setTimeout: (unit => unit, int) => float = "setTimeout";

let networkBridge = (request: serverRequest, respond) => {
  switch (request.path) {
  | "/route_alerts" =>
    let _ =
      Fetch.fetchWithInit(
        "http://localhost:3000/route_alerts",
        Fetch.RequestInit.make(
          ~method_=Post,
          ~body=getExn(request.body)->Json.stringify->Fetch.BodyInit.make,
          ~headers=
            Fetch.HeadersInit.make({"Content-Type": "application/json"}),
          (),
        ),
      )
      |> then_(Fetch.Response.json)
      |> then_(jsonString => jsonString->respond->resolve)
      |> catch(_ => {
           errorResponseEncoder({message: "error"})->respond->resolve
         });
    ();
  | _ => errorResponseEncoder({message: "bad route"})->respond
  };
};

module ReactReffect = {
  let useReducer =
      (
        initialState: 's,
        reducer: Reffect.reducerFunc('s, 'a),
        environment: env,
      )
      : ('s, Reffect.dispatchFunc('a)) => {
    let (state, setState) = React.useState(() => initialState);
    let dispatch =
      Reffect.makeDispatch(state, reducer, environment, s => setState(_ => s));

    (state, dispatch);
  };
};

let dispatchEvent = (actionCtor, e) => {
  let s =
    switch (e->ReactEvent.Form.target##value) {
    | "" => "nada"
    | s => s
    };

  actionCtor(s);
};

let displayString = ostr => {
  mapWithDefault(ostr, "nada", s => s);
};

let displayInt = i => {
  mapWithDefault(i, "nada", n => string_of_int(n));
};

let setMinutes = e => {
  SetMinutes(int_of_string(e->ReactEvent.Form.target##value));
};

let loadingIndicator = (dataLoadingState) => {
  switch (dataLoadingState) {
    | Loading => <p>{React.string("Loading")}</p>
    | _ => ReasonReact.null
  };
};

[@react.component]
let make = () => {
  let (state, dispatch) = 
    ReactReffect.useReducer(initialState, reducer, { networkBridge: networkBridge });

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
    <button disabled={!canFetch(state)} onClick={_ => dispatch(FetchRoute)}>
      {React.string("Set alert")}
    </button>
    {loadingIndicator(state.dataLoadingState)}
    <p>
      {React.string(
         "Route duration: "
         ++ state.routeDuration->mapWithDefault("None", string_of_int),
       )}
    </p>
  </>;
};
