import Icon from "react-native-vector-icons/FontAwesome";
import { TouchableOpacity } from "react-native";
import PrimaryButton from "ui/controls/button/primary";
import { useApiDestroyDodone } from "generated/api";
import { Link } from "lib/router";

export default function DodoneListItem({ dodone }) {
  const [confirmingDestroy, cancelConfirmDestroy, showConfirmDestroy] =
    useBoolState();

  const { destroy } = useApiDestroyDodone();

  const destroyDodone = useCallback(() => {
    return destroy({ dodoneId: dodone.id });
  });

  return (
    <View style={tw("secondary-dodoable-trigger flex-row items-center")}>
      {confirmingDestroy ? (
        <>
          <PrimaryButton
            label="Cancel"
            size="small"
            color="neutral"
            tws="flex-grow mr-1"
            onClick={cancelConfirmDestroy}
          />
          <PrimaryButton
            label="Destroy!"
            size="small"
            color="danger"
            tws="flex-grow ml-1"
            onClick={destroyDodone}
          />
        </>
      ) : (
        <>
          <Link style={tw("flex-grow")} to={`/dodones/${dodone.id}`}>
            <Text style={tw("secondary-dodoable-trigger-text")}>
              {dodone.id}
            </Text>
          </Link>
          <TouchableOpacity onPress={showConfirmDestroy}>
            <Icon name="trash" color={getColor("gray-400")} />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}
