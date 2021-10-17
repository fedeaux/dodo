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

function SimpleFormDodoableExecutorActions({
  dodoable,
  dodone,
  saveFormDodone,
  currentTime,
  finishTracking,
}) {
  if (
    dodoable.executor.finishedAtBehaviour == "instantaneous" ||
    dodone.finishedAt
  ) {
    return (
      <View>
        <PrimaryButton
          label="Dodone!"
          size="large"
          color="success"
          block
          onClick={saveFormDodone}
        />
      </View>
    );
  } else if (dodoable.executor.finishedAtBehaviour == "chronometer") {
    if (dodone.isNewRecord) {
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
          <View style={tw("text-center w-full")}>
            <Chronometer
              style={tw("text-6xl")}
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

  const saveDodone = useCallback(async (dodoneToBeSaved) => {
    let savedDodone = null;

    if (dodoneToBeSaved.isNewRecord) {
      const { response } = await create({
        dodoneAttributes: dodone.serialize(),
      });

      savedDodone = response.dodone;
    } else {
      const { response } = await update({
        dodoneId: dodoneToBeSaved.id,
        dodoneAttributes: dodoneToBeSaved.serialize(),
      });

      savedDodone = response.dodone;
    }

    if (dodoable.executor.finishedAtBehaviour == "instantaneous") {
      history.push("/");
    } else {
      setFormDodone(savedDodone);
    }
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
