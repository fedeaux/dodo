import { TouchableOpacity } from "react-native";
import PrimaryButton from "ui/controls/button/primary";
import ActionScreen from "platforms/mobile/screens/action";
import AbstractDisplay from "ui/displays/Abstract";

function MealDodoneShow({ dodone }) {
  return (
    <ActionScreen title={dodone.name}>
      <View style={tw("flex h-full p-4")}>
        <View style={tw("flex-grow")}>
          <AbstractDisplay
            type="time"
            value={dodone.startedAt}
            label="Started at"
          />
          <AbstractDisplay
            type="time"
            value={dodone.finishedAt}
            label="Finished at"
          />

          {Object.values(dodone.fields)
            .sort((fa, fb) => {
              return fa.order - fb.order;
            })
            .map((field) => {
              return <AbstractDisplay key={field.name} {...field} />;
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
