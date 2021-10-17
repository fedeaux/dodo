import { differenceInSeconds } from "date-fns";
import Clock from "ui/clocks";

export default function Chronometer({ currentTime, startedAt, ...props }) {
  const seconds = differenceInSeconds(currentTime, startedAt);

  return <Clock seconds={seconds} {...props} />;
}
