import ActionScreen from "platforms/mobile/screens/action";
import BackgroundTimer from "lib/background-timer";
import Chronometer from "ui/clocks/Chronometer";
import DodonesFieldsFields from "entities/dodones/fields/fields";
import PrimaryButton from "ui/controls/button/primary";
import Timer from "ui/clocks/Timer";
import useCurrentTime from "util/useCurrentTime";
import { Link, useHistory } from "lib/router";
import { TouchableOpacity, ScrollView } from "react-native";
import { useApiCreateDodone, useApiUpdateDodone } from "generated/api";
import IconMC from "react-native-vector-icons/MaterialCommunityIcons";
import CollectionInputItem from "ui/inputs/collection_item";
import Clock from "ui/clocks";

function ClockButton({ onPress, iconName }) {
  return (
    <TouchableOpacity onPress={onPress} style={tw("px-2")}>
      <IconMC name={iconName} size={48} />
    </TouchableOpacity>
  );
}

function RestableStepActions({
  restTime,
  leftRestTime,
  setLeftRestTime,
  next,
  finish,
  isLastItem,
  pauseTimer,
  timerInterval,
  startTimer,
  showingClockOptions,
  toogleClockOptions,
}) {
  if (leftRestTime >= 0) {
    return (
      <TouchableOpacity onPress={toogleClockOptions} style={tw("relative")}>
        {showingClockOptions && (
          <TouchableOpacity
            style={tw(
              "absolute flex-row justify-center items-center top-0 bottom-0 left-0 right-0 bg-white bg-opacity-40"
            )}
            onPress={toogleClockOptions}
          >
            <ClockButton
              onPress={() => {
                return setLeftRestTime(restTime);
              }}
              iconName="rewind"
            />
            {timerInterval ? (
              <ClockButton onPress={pauseTimer} iconName="pause" />
            ) : (
              <ClockButton onPress={startTimer} iconName="play" />
            )}
            <ClockButton
              onPress={() => {
                return setLeftRestTime(-1);
              }}
              iconName="fast-forward"
            />
          </TouchableOpacity>
        )}
        <Clock
          style={tw("text-7xl text-center bg-black bg-opacity-20 p-2")}
          seconds={leftRestTime}
        />
      </TouchableOpacity>
    );
  }

  return (
    <View style={tw("p-4")}>
      {isLastItem ? (
        <PrimaryButton label="Dodone!" onClick={finish} />
      ) : (
        <PrimaryButton label="Next" onClick={next} />
      )}
    </View>
  );
}

function SimpleRepsExecutor({
  dodone,
  dodoable,
  setDodone,
  currentTime,
  saveFormDodoneAndBack,
}) {
  const sets = dodone.fields.sets.value;
  const restTime = parseInt(dodone.fields.rest.value);

  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [leftRestTime, setLeftRestTime] = useState(restTime);
  const [currentSet, setCurrentSet] = useState(sets[currentSetIndex]);
  const [timerInterval, setTimerInteval] = useState(null);
  const [showingClockOptions, hideClockOptions, , toogleClockOptions] =
    useBoolState();

  const isLastItem = currentSetIndex == sets.length - 1;

  const pauseTimer = useCallback(() => {
    BackgroundTimer.clearInterval(timerInterval);
    setTimerInteval(null);
  }, [timerInterval, setTimerInteval]);

  const startTimer = useCallback(() => {
    pauseTimer();
    setTimerInteval(
      BackgroundTimer.setInterval(() => {
        setLeftRestTime((leftRestTime) => leftRestTime - 1);
      }, 1000)
    );
  }, [timerInterval, setTimerInteval]);

  const next = useCallback(() => {
    sets.splice(currentSetIndex, 1, currentSet);
    dodone.fields.sets.value = sets;

    setCurrentSetIndex((currentSetIndex) => currentSetIndex + 1);
    setCurrentSet(sets[currentSetIndex + 1]);
    setLeftRestTime(restTime);
    setDodone(dodone);
    startTimer();
    hideClockOptions();
  }, [startTimer, currentSetIndex, dodone, currentSet]);

  const finish = useCallback(() => {
    sets.splice(currentSetIndex, 1, currentSet);
    dodone.fields.sets.value = sets;
    dodone.finishedAt = currentTime;
    setDodone(dodone);
    saveFormDodoneAndBack();
  }, [setDodone]);

  const handleOnChange = useCallback(({ index, ...payload }) => {
    setCurrentSet({ ...currentSet, ...payload });
  });

  useEffect(() => {
    startTimer();

    return pauseTimer;
  }, []);

  return (
    <View style={tw("flex flex-grow")}>
      <View style={tw("flex-grow p-4")}>
        <CollectionInputItem
          index={currentSetIndex}
          onChange={handleOnChange}
          {...dodone.fields.sets}
          value={currentSet}
        />
      </View>
      <RestableStepActions
        restTime={restTime}
        leftRestTime={leftRestTime}
        setLeftRestTime={setLeftRestTime}
        pauseTimer={pauseTimer}
        next={next}
        isLastItem={isLastItem}
        finish={finish}
        timerInterval={timerInterval}
        startTimer={startTimer}
        showingClockOptions={showingClockOptions}
        toogleClockOptions={toogleClockOptions}
      />
    </View>
  );
}

function SetupStep({ dodone, dodoable, setDodone, saveDodone, start }) {
  return (
    <View style={tw("p-4")}>
      <ScrollView style={tw("flex-1 mb-4")}>
        <DodonesFieldsFields dodone={dodone} setDodone={setDodone} />
      </ScrollView>
      <PrimaryButton
        label="Start"
        size="large"
        color="success"
        onClick={start}
      />
    </View>
  );
}

export default function StepsExecutor({ dodone, dodoable }) {
  const { create } = useApiCreateDodone();
  const { update } = useApiUpdateDodone();
  const history = useHistory();
  const currentTime = useCurrentTime();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

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

  const start = useCallback(async () => {
    if (!dodone.startedAt) {
      dodone.startedAt = new Date();
    }

    await saveDodone(dodone);

    setCurrentStepIndex(1);
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
    return savedDodone;
  });

  const onFormDodoneChanged = useCallback((changedDodone) => {
    setFormDodone(changedDodone);

    if (dodoable.executor.saveOnFieldChanged && changedDodone.isPersisted) {
      resetAutosave();
    }
  });

  return (
    <ActionScreen title={dodoable.name}>
      <View style={tw("flex flex-1")}>
        {currentStepIndex ? (
          <SimpleRepsExecutor
            dodone={formDodone}
            dodoable={dodoable}
            setDodone={onFormDodoneChanged}
            saveFormDodoneAndBack={saveFormDodoneAndBack}
            currentTime={currentTime}
          />
        ) : (
          <SetupStep
            dodone={formDodone}
            dodoable={dodoable}
            setDodone={onFormDodoneChanged}
            saveDodone={saveDodone}
            start={start}
          />
        )}
      </View>
    </ActionScreen>
  );
}
