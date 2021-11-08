import { TouchableOpacity, ScrollView } from "react-native";
import PrimaryButton from "ui/controls/button/primary";
import UserContext from "lib/UserContext";
import ActionScreen from "platforms/mobile/screens/action";
import DodoneListItem from "entities/dodones/list/item";

function MealDodoableShow({ dodoable }) {
  const { day } = useContext(UserContext);

  return (
    <ActionScreen title={dodoable.name}>
      <View style={tw("flex flex-1 p-4")}>
        <ScrollView style={tw("flex-1 mb-4")}>
          {dodoable.dodones.map((dodone) => {
            return <DodoneListItem key={dodone.id} dodone={dodone} />;
          })}
        </ScrollView>
        <View style={tw("flex flex-row")}>
          <PrimaryButton
            color="success"
            size="large"
            tws="flex-grow"
            label="Dodoit"
            to={`/dodoables/${dodoable.id}/execute`}
          />
        </View>
      </View>
    </ActionScreen>
  );
}

export default function AbstractDodoableShow({ dodoable }) {
  return <MealDodoableShow dodoable={dodoable} />;
}
