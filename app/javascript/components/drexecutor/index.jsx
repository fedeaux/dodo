import UserContext from "lib/UserContext";
import SimpleFormExecutor from "components/drexecutor/SimpleFormExecutor";
import SessionExecutor from "components/drexecutor/SessionExecutor";
import StepsExecutor from "components/drexecutor/StepsExecutor";

const executorMap = {
  SimpleForm: SimpleFormExecutor,
  Session: SessionExecutor,
  Steps: StepsExecutor,
};

export default function Drexecutor({ dodoable, dodone }) {
  const { day } = useContext(UserContext);

  if (dodone && !dodoable) {
    dodoable = dodone.dodoable;
  } else if (dodoable) {
    dodone = dodoable.beingTrackedDodone || dodoable.buildDodone({ day });
  }

  const Executor = executorMap[dodoable.executor.type];

  return <Executor dodoable={dodoable} dodone={dodone} />;
}
