// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from "react";
import ReactDOM from "react-dom";
import WebApp from "../platforms/web/app";
import MobileApp from "../platforms/mobile/app";

import FontAwesome from "react-native-vector-icons/Fonts/FontAwesome.ttf";
import FontAwesome5_Regular from "react-native-vector-icons/Fonts/FontAwesome5_Regular.ttf";
import FontAwesome5_Solid from "react-native-vector-icons/Fonts/FontAwesome5_Solid.ttf";
// import DigitalDismay from "./assets/fonts/DigitalDismay.otf";
import BraindamageApiProvider from "braindamage/api/provider";

const FontFaces = `
@font-face {
  src: url(/#{FontAwesome});
  font-family: FontAwesome;
}

@font-face {
  src: url(/#{FontAwesome5_Regular});
  font-family: FontAwesome5_Regular;
}

@font-face {
  src: url(/#{FontAwesome5_Solid});
  font-family: FontAwesome5_Solid;
}

`;

// @font-face {
//   src: url(/#{DigitalDismay});
//   font-family: DigitalDismay;
// }

const App = MobileApp;

function Root() {
  return (
    <BraindamageApiProvider>
      <App />
    </BraindamageApiProvider>
  );
}

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<Root />, document.querySelector("#spa"));

  // Create stylesheet
  const style = document.createElement("style");
  style.type = "text/css";

  if (style.styleSheet) style.styleSheet.cssText = FontFaces;
  else style.appendChild(document.createTextNode(FontFaces));

  // Inject stylesheet
  document.head.appendChild(style);
});
