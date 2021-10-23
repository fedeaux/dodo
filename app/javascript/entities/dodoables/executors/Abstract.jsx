import { TouchableOpacity } from "react-native";
import { Link, useHistory } from "lib/router";
import MainTitle from "ui/typography/MainTitle";
import UserContext from "lib/UserContext";
import PrimaryButton from "ui/controls/button/primary";
import TimeInput from "ui/inputs/time";
import { useApiCreateDodone, useApiUpdateDodone } from "generated/api";
import ActionScreen from "platforms/mobile/screens/action";
import DodoneExperimentsSimpleForm from "entities/dodones/experiments/SimpleForm";
import Dodone from "models/dodone";
import { differenceInSeconds } from "date-fns";
import useCurrentTime from "util/useCurrentTime";
import { useCallback } from "react";
import BackgroundTimer from "lib/background-timer";
import formatSeconds from "util/formatSeconds";
import Chronometer from "ui/clocks/Chronometer";
import Timer from "ui/clocks/Timer";

function SimpleFormDodoableExecutorActions({
  dodoable,
  dodone,
  saveFormDodone,
  currentTime,
  finishTracking,
  saveFormDodoneAndBack,
  startTimer,
}) {
  console.log("dodoable", dodoable);

  if (dodoable.isInstantaneous) {
    return (
      <View>
        <PrimaryButton
          label="Dodone!"
          size="large"
          color="success"
          block
          onClick={saveFormDodoneAndBack}
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
          onClick={saveFormDodone}
        />
        <PrimaryButton
          label="Dodone"
          size="large"
          color="success"
          tws="ml-1"
          block
          onClick={saveFormDodoneAndBack}
        />
      </View>
    );
  } else if (dodoable.isChronometrable) {
    if (!dodone.isStarted) {
      return (
        <View>
          <PrimaryButton
            label="Start Tracking"
            size="large"
            color="success"
            block
            onClick={saveFormDodone}
          />
        </View>
      );
    } else {
      return (
        <View style={tw("flex flex-col")}>
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
  } else if (dodoable.isDurable) {
    if (dodone.isNewRecord) {
      return (
        <View>
          <PrimaryButton
            label="Start Timer"
            size="large"
            color="success"
            block
            onClick={startTimer}
          />
        </View>
      );
    } else {
      return (
        <View style={tw("flex flex-col")}>
          <PrimaryButton
            label="Abort"
            color="success"
            tws="mb-2"
            block
            onClick={finishTracking}
          />
          <View style={tw("w-full py-2")}>
            <Timer
              style={tw("text-6xl text-center")}
              startedAt={dodone.startedAt}
              currentTime={currentTime}
            />
          </View>
        </View>
      );
    }
  } else {
    return null;
  }
}

function SimpleFormDodoableExecutor({ dodoable, dodone, save }) {
  const { create } = useApiCreateDodone();
  const { update } = useApiUpdateDodone();
  const history = useHistory();
  const currentTime = useCurrentTime();

  const [formDodone, setFormDodone] = useState(dodone);
  const [autosaveTimer, setAutosaveTimer] = useState(null);

  const saveFormDodone = useCallback(async () => {
    await saveDodone(formDodone);
  });

  const finishTracking = useCallback(() => {
    formDodone.finishedAt = currentTime;
    saveDodone(formDodone.clone());
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

  const startTimer = useCallback(async () => {
    console.log(
      "dodone.fields.duration.value",
      formDodone.fields.duration.value
    );
    // await saveFormDodone();

    // history.push("/");
  });

  const saveDodone = useCallback(async (dodoneToBeSaved) => {
    let savedDodone = null;
    if (!dodoneToBeSaved.startedAt) {
      dodoneToBeSaved.startedAt = new Date();
    }

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
      <View style={tw("flex flex-grow p-4")}>
        <View style={tw("flex-grow")}>
          <DodoneExperimentsSimpleForm
            dodone={formDodone}
            setDodone={onFormDodoneChanged}
          />
        </View>
        <SimpleFormDodoableExecutorActions
          dodoable={dodoable}
          dodone={formDodone}
          saveFormDodone={saveFormDodone}
          currentTime={currentTime}
          finishTracking={finishTracking}
          saveFormDodoneAndBack={saveFormDodoneAndBack}
          startTimer={startTimer}
        />
      </View>
    </ActionScreen>
  );
}

export default function AbstractDodoableExecutor({ dodoable }) {
  const { day } = useContext(UserContext);
  let dodone = null;

  if (dodoable.beingTrackedDodone) {
    dodone = dodoable.beingTrackedDodone;
  } else {
    dodone = new Dodone({
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
    });
  }

  return <SimpleFormDodoableExecutor dodoable={dodoable} dodone={dodone} />;
}
