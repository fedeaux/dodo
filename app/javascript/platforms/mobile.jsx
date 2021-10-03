import Platfrom from "platforms/index";
import MobileApp from "platforms/mobile/app";

export default function () {
  return <Platfrom App={MobileApp} />;
}
