import ActionScreen from "platforms/mobile/screens/action";
import BackgroundTimer from "lib/background-timer";
import Chronometer from "ui/clocks/Chronometer";
import DodoneForm from "entities/dodones/form";
import PrimaryButton from "ui/controls/button/primary";
import Timer from "ui/clocks/Timer";
import useCurrentTime from "util/useCurrentTime";
import { Link, useHistory } from "lib/router";
import { TouchableOpacity, ScrollView } from "react-native";
import { useApiCreateDodone, useApiUpdateDodone } from "generated/api";
import FieldLabel from "ui/fields/Label";

function SimpleFormDodoableExecutorActions({
  dodoable,
  dodone,
  saveDodone,
  currentTime,
  history,
}) {
  const finishTracking = useCallback(() => {
    dodone.finishedAt = currentTime;
    saveDodone(dodone);
  });

  const save = useCallback(() => {
    saveDodone(dodone);
  });

  const saveDodoneAndBack = useCallback(async () => {
    await saveDodone(dodone);

    history.push("/");
  });

  const startTracking = useCallback(async () => {
    if (!dodone.startedAt) {
      dodone.startedAt = new Date();
    }

    await saveDodone(dodone);
  });

  if (dodoable.isInstantaneous) {
    return (
      <View>
        <PrimaryButton
          label="Dodone!"
          size="large"
          color="success"
          block
          onClick={saveDodoneAndBack}
        />
      </View>
    );
  } else if (dodone.finishedAt) {
    return (
      <View style={tw("flex-row")}>
        <PrimaryButton
          label="Save"
          size="large"
          color="neutral"
          tws="mr-1"
          block
          onClick={save}
        />
        <PrimaryButton
          label="Dodone"
          size="large"
          color="success"
          tws="ml-1"
          block
          onClick={saveDodoneAndBack}
        />
      </View>
    );
  } else if (!dodone.startedAt) {
    return (
      <View style={tw("flex-col")}>
        <PrimaryButton
          label="Start Tracking"
          size="large"
          color="success"
          block
          onClick={startTracking}
        />
        {dodone.isStatusable && !dodone.isPending && (
          <PrimaryButton
            label="Save"
            color="neutral"
            tws="mt-2"
            block
            onClick={save}
          />
        )}
      </View>
    );
  } else {
    return (
      <View style={tw("flex-col")}>
        <PrimaryButton
          label="Finish Tracking"
          color="success"
          tws="mb-2"
          block
          onClick={finishTracking}
        />
        <View style={tw("w-full py-2")}>
          <Chronometer
            style={tw("text-6xl text-center")}
            startedAt={dodone.startedAt}
            currentTime={currentTime}
          />
        </View>
      </View>
    );
  }
}

function DodoableInstructions({ dodoable }) {
  if (!dodoable.executor.instructions) return null;

  return (
    <View style={tw("mt-6")}>
      <FieldLabel label="Instructions" />
      {dodoable.executor.instructions.map((instruction) => {
        return (
          <Text key={instruction} style={tw("mb-1")}>
            {instruction}
          </Text>
        );
      })}
    </View>
  );
}

export default function SimpleFormExecutor({ dodone, dodoable }) {
  const { create } = useApiCreateDodone();
  const { update } = useApiUpdateDodone();
  const history = useHistory();
  const currentTime = useCurrentTime();

  const [formDodone, setFormDodone] = useState(dodone);
  const [autosaveTimer, setAutosaveTimer] = useState(null);

  const saveFormDodone = useCallback(async () => {
    await saveDodone(formDodone);
  });

  const autosave = useCallback(() => {
    if (formDodone.isPersisted) {
      update({
        dodoneId: formDodone.id,
        dodoneAttributes: formDodone.serialize(),
      });
    }
  });

  const resetAutosave = useCallback(() => {
    if (autosaveTimer) {
      BackgroundTimer.clearTimeout(autosaveTimer);
    }

    setAutosaveTimer(BackgroundTimer.setTimeout(autosave, 1000));
  });

  const saveFormDodoneAndBack = useCallback(async () => {
    await saveFormDodone();

    history.push("/");
  });

  const saveDodone = useCallback(async (dodoneToBeSaved) => {
    let savedDodone = null;

    if (dodoneToBeSaved.isNewRecord) {
      const { response } = await create({
        dodoneAttributes: dodoneToBeSaved.serialize(),
      });

      savedDodone = response.dodone;
    } else {
      const { response } = await update({
        dodoneId: dodoneToBeSaved.id,
        dodoneAttributes: dodoneToBeSaved.serialize(),
      });

      savedDodone = response.dodone;
    }

    setFormDodone(savedDodone);
  });

  const onFormDodoneChanged = useCallback((changedDodone) => {
    setFormDodone(changedDodone);

    if (dodoable.executor.saveOnFieldChanged && changedDodone.isPersisted) {
      resetAutosave();
    }
  });

  return (
    <ActionScreen title={dodoable.name}>
      <View style={tw("flex flex-1 p-4")}>
        <ScrollView style={tw("flex-1")}>
          <DodoneForm dodone={formDodone} setDodone={onFormDodoneChanged} />
          {<DodoableInstructions dodoable={dodoable} />}
        </ScrollView>
        <SimpleFormDodoableExecutorActions
          dodoable={dodoable}
          dodone={formDodone}
          saveDodone={saveDodone}
          currentTime={currentTime}
          history={history}
        />
      </View>
    </ActionScreen>
  );
}
