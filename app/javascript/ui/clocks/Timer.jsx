import { differenceInSeconds } from "date-fns";
import Clock from "ui/clocks";

export default function Timer({ currentTime, startedAt, duration, ...props }) {
  const seconds = differenceInSeconds(currentTime, startedAt);

  return <Clock seconds={seconds} {...props} />;
}
