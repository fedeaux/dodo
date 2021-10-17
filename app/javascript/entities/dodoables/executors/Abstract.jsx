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

function formatSeconds(seconds) {
  const hours = parseInt(seconds / 3600);
  const minutes = parseInt((seconds - hours * 3600) / 60);
  seconds = parseInt(seconds - minutes * 60 - hours * 3600);

  return [hours > 0 ? hours : -1, minutes, seconds]
    .filter((unit) => {
      return unit >= 0;
    })
    .map((unit) => {
      return unit > 9 ? unit : `0${unit}`;
    })
    .join(":");
}

class Chronometer extends React.Component {
  constructor() {
    super();
  }

  render() {
    const seconds = formatSeconds(
      differenceInSeconds(this.props.currentTime, this.props.startedAt)
    );

    return (
      <View style={tw("text-center w-full")}>
        <Text style={tw("text-6xl")}>{seconds}</Text>
      </View>
    );
  }
}

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
          <Chronometer startedAt={dodone.startedAt} currentTime={currentTime} />
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

  if (dodoable.beingTrackedDodones.length > 0) {
    dodone = dodoable.beingTrackedDodones[0];
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
