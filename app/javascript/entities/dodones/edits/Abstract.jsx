import { TouchableOpacity } from "react-native";
import PrimaryButton from "ui/controls/button/primary";
import ActionScreen from "platforms/mobile/screens/action";
import DodoneExperimentsSimpleForm from "entities/dodones/experiments/SimpleForm";
import { useApiUpdateDodone } from "generated/api";
import { useHistory } from "lib/router";

function SimpleFormDodoneEdit({ dodone }) {
  const [dodoneAttributes, setDodoneAttributes] = useState(dodone);
  const { update, isLoading } = useApiUpdateDodone();
  const history = useHistory();

  const save = useCallback(async () => {
    await update({ dodoneId: dodone.id, dodoneAttributes });
    history.push(`/dodones/${dodone.id}`);
  });

  return (
    <ActionScreen title={dodone.name}>
      <View style={tw("flex h-full p-4")}>
        <View style={tw("flex-grow")}>
          <DodoneExperimentsSimpleForm
            dodoneAttributes={dodoneAttributes}
            setDodoneAttributes={setDodoneAttributes}
          />
        </View>
        <View style={tw("flex-row")}>
          <PrimaryButton
            label="Cancel"
            color="neutral"
            tws="flex-grow mr-1"
            to={`/dodones/${dodone.id}`}
          />
          <PrimaryButton
            label="Save"
            color="success"
            tws="flex-grow ml-1"
            onClick={save}
          />
        </View>
      </View>
    </ActionScreen>
  );
}

export default function AbstractDodoneShow({ dodone }) {
  return <SimpleFormDodoneEdit dodone={dodone} />;
}
