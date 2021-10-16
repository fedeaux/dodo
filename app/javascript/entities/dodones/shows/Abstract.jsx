import { TouchableOpacity } from "react-native";
import PrimaryButton from "ui/controls/button/primary";
import ActionScreen from "platforms/mobile/screens/action";

function MealDodoneShow({ dodone }) {
  return (
    <ActionScreen title={dodone.name}>
      <View style={tw("flex h-full p-4")}>
        <View style={tw("flex-grow")}>
          {Object.values(dodone.fields)
            .sort((fa, fb) => {
              return fa.order - fb.order;
            })
            .map((field) => {
              return (
                <View key={field.name} style={tw("mt-2")}>
                  <Text style={tw("text-sm")}>{field.label}</Text>
                  <Text style={tw("text-lg")}>{field.value}</Text>
                </View>
              );
            })}
        </View>
        <View style={tw("flex-row")}>
          <PrimaryButton label="Destroy!" color="danger" tws="flex-grow mr-1" />
          <PrimaryButton
            label="Edit"
            color="neutral"
            tws="flex-grow ml-1"
            to={`/dodones/${dodone.id}/edit`}
          />
        </View>
      </View>
    </ActionScreen>
  );
}

export default function AbstractDodoneShow({ dodone }) {
  return <MealDodoneShow dodone={dodone} />;
}
