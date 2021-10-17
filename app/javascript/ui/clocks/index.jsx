import formatSeconds from "util/formatSeconds";

export default function Clock({ seconds, ...props }) {
  const formatedSeconds = formatSeconds(seconds);

  return <Text {...props}>{formatedSeconds}</Text>;
}
