import formatSeconds from "util/formatSeconds";

export default function Clock({ seconds, style, ...props }) {
  const formatedSeconds = formatSeconds(seconds);

  return (
    <Text style={tw(style, "font-digital")} {...props}>
      {formatedSeconds}
    </Text>
  );
}
