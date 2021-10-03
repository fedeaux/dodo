import BraindamageApiProvider from "braindamage/api/provider";
axios.defaults.baseURL = "https://fedeaux.ngrok.io";
axios.defaults.headers.post["Content-Type"] = "application/json";

export default function Platform({ App }) {
  return (
    <BraindamageApiProvider>
      <App />
    </BraindamageApiProvider>
  );
}
