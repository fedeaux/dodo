import Icon from "react-native-vector-icons/FontAwesome";
import { TouchableOpacity } from "react-native";
import PrimaryButton from "ui/controls/button/primary";
import { useApiDestroyDodone } from "generated/api";
import { Link } from "lib/router";
import { format } from "date-fns";

export default function DodoneListItem({ dodone }) {
  const [confirmingDestroy, cancelConfirmDestroy, showConfirmDestroy] =
    useBoolState();

  const [destroyed, , setDestroyed] = useBoolState();

  const { destroy } = useApiDestroyDodone();

  const destroyDodone = useCallback(() => {
    destroy({ dodoneId: dodone.id });
    setDestroyed(true);
  });

  if (destroyed) return null;

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
          <Link
            style={tw("flex-1 flex flex-row items-center")}
            to={`/dodones/${dodone.id}`}
          >
            <Text style={tw("secondary-dodoable-trigger-text")}>
              {format(dodone.createdAt, "E, MMM do")}
            </Text>
            <View style={tw("flex-1")} />
            <Text style={tw("secondary-dodoable-trigger-text text-xs mr-2")}>
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
