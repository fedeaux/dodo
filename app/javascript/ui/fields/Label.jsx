export default function FieldLabel({ label, tws = "" }) {
  return <Text style={tw("pb-1 text-blue-400", tws)}>{label}</Text>;
}
