import { TouchableOpacity } from "react-native";
import PrimaryButton from "ui/controls/button/primary";
import ActionScreen from "platforms/mobile/screens/action";
import AbstractDisplay from "ui/displays/Abstract";
import { useApiDestroyDodone } from "generated/api";
import { useHistory } from "lib/router";

function MealDodoneShow({ dodone }) {
  const history = useHistory();

  const [confirmingDestroy, cancelConfirmDestroy, showConfirmDestroy] =
    useBoolState();

  const { destroy } = useApiDestroyDodone();

  const destroyDodone = useCallback(async () => {
    await destroy({ dodoneId: dodone.id });
    history.push(`/dodoables/${dodone.dodoableId}`);
  });

  return (
    <ActionScreen title={dodone.name}>
      <View style={tw("flex flex-grow p-4")}>
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
          {confirmingDestroy ? (
            <>
              <PrimaryButton
                label="Cancel"
                color="neutral"
                tws="flex-grow mr-1"
                onClick={cancelConfirmDestroy}
              />
              <PrimaryButton
                label="Destroy!"
                color="danger"
                tws="flex-grow ml-1"
                onClick={destroyDodone}
              />
            </>
          ) : (
            <>
              <PrimaryButton
                label="Destroy!"
                color="danger"
                tws="flex-grow mr-1"
                onClick={showConfirmDestroy}
              />
              <PrimaryButton
                label="Edit"
                color="neutral"
                tws="flex-grow ml-1"
                to={`/dodones/${dodone.id}/edit`}
              />
            </>
          )}
        </View>
      </View>
    </ActionScreen>
  );
}

export default function AbstractDodoneShow({ dodone }) {
  return <MealDodoneShow dodone={dodone} />;
}
