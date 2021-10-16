import { TouchableOpacity } from "react-native";
import { Link, useHistory } from "lib/router";
import MainTitle from "ui/typography/MainTitle";
import UserContext from "lib/UserContext";
import PrimaryButton from "ui/controls/button/primary";
import TimeInput from "ui/inputs/time";
import { useApiCreateDodone } from "generated/api";
import ActionScreen from "platforms/mobile/screens/action";

function MealDodoableExecutor({ dodoable }) {
  const { day } = useContext(UserContext);
  const { create, isLoading } = useApiCreateDodone();
  const history = useHistory();

  const [dodoneAttributes, setDodoneAttributes] = useState({
    dayId: day.id,
    dodoableId: dodoable.id,
  });

  const save = useCallback(async () => {
    await create({ dodoneAttributes });
    history.push("/");
  });

  return (
    <ActionScreen title={dodoable.name}>
      <View style={tw("flex h-full p-4")}>
        <View style={tw("flex-grow")}>
          <Text>At</Text>
          <TimeInput
            value={new Date()}
            onChange={({ value }) => {
              setDodoneAttributes({ ...dodoneAttributes, startedAt: value });
            }}
          />
        </View>
        <View style={tw("flex flex-row")}>
          <PrimaryButton
            label="Dodone!"
            size="large"
            color="success"
            tws="flex-grow"
            onClick={save}
          />
        </View>
      </View>
    </ActionScreen>
  );
}

export default function AbstractDodoableExecutor({ dodoable }) {
  return <MealDodoableExecutor dodoable={dodoable} />;
}
