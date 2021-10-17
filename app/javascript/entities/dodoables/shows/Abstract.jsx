import { TouchableOpacity } from "react-native";
import PrimaryButton from "ui/controls/button/primary";
import UserContext from "lib/UserContext";
import ActionScreen from "platforms/mobile/screens/action";
import DodoneListItem from "entities/dodones/list/item";

function MealDodoableShow({ dodoable }) {
  const { day } = useContext(UserContext);

  const dodoneToday = dodoable.dodones.find((dodone) => {
    return dodone.dayId == day.id;
  });

  console.log("dodoable.dodones", dodoable.dodones);

  return (
    <ActionScreen title={dodoable.name}>
      <View style={tw("flex h-full p-4")}>
        <View style={tw("flex-grow")}>
          {dodoable.dodones.map((dodone) => {
            return <DodoneListItem key={dodone.id} dodone={dodone} />;
          })}
        </View>
        <View style={tw("flex flex-row")}>
          {dodoneToday ? (
            <Text>Dodone!</Text>
          ) : (
            <PrimaryButton
              color="success"
              size="large"
              tws="flex-grow"
              label="Dodoit"
              to={`/dodoables/${dodoable.id}/executor`}
            />
          )}
        </View>
      </View>
    </ActionScreen>
  );
}

export default function AbstractDodoableShow({ dodoable }) {
  return <MealDodoableShow dodoable={dodoable} />;
}
