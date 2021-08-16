import SubtleTitle from "ui/typography/SubtleTitle";
import DefaultScreen from "platforms/mobile/screens/default";

export default function Home() {
  return (
    <DefaultScreen>
      <View style={tw("p-2 rounded bg-gray-900 bg-opacity-60")}>
        <Text style={tw("text-blue-300 text-xs")}>Wokeup @ 09:30</Text>
      </View>
      <SubtleTitle> Doables </SubtleTitle>
      <SubtleTitle> Habits </SubtleTitle>
    </DefaultScreen>
  );
}
