import { TouchableOpacity } from "react-native";
import { Link, useHistory } from "lib/router";
import MainTitle from "ui/typography/MainTitle";
import UserContext from "lib/UserContext";
import PrimaryButton from "ui/controls/button/primary";
import TimeInput from "ui/inputs/time";
import { useApiCreateDodone } from "generated/api";
import ActionScreen from "platforms/mobile/screens/action";
import DodoneExperimentsSimpleForm from "entities/dodones/experiments/SimpleForm";
import Dodone from "models/dodone";

function SimpleFormDodoableExecutor({ dodoable }) {
  const { day } = useContext(UserContext);
  const { create, isLoading } = useApiCreateDodone();
  const history = useHistory();

  const [dodone, setDodone] = useState(
    new Dodone({
      dayId: day.id,
      dodoableId: dodoable.id,
      startedAt: new Date(),
      fields: Object.values(dodoable.fields)
        .map((field) => {
          return { value: field.default, ...field };
        })
        .reduce((fields, field) => {
          return { ...fields, [field.name]: field };
        }, {}),
    })
  );

  const save = useCallback(async () => {
    await create({ dodoneAttributes: dodone.serialize() });
    history.push("/");
  });

  return (
    <ActionScreen title={dodoable.name}>
      <View style={tw("flex flex-grow p-4")}>
        <View style={tw("flex-grow")}>
          <DodoneExperimentsSimpleForm dodone={dodone} setDodone={setDodone} />
        </View>
        <View style={tw("flex flex-row")}>
          <PrimaryButton
            label="Dodone!"
            size="large"
            color="success"
            block
            onClick={save}
          />
        </View>
      </View>
    </ActionScreen>
  );
}

export default function AbstractDodoableExecutor({ dodoable }) {
  return <SimpleFormDodoableExecutor dodoable={dodoable} />;
}
