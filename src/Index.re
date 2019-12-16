[@bs.val] external document: Js.t({..}) = "document";

let style = document##createElement("style");
document##head##appendChild(style);
style##innerHTML #= ExampleStyles.style;

ReactDOMRe.renderToElementWithId(<RouteAlert />, "route-alert-app");
