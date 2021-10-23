import UserContext from "lib/UserContext";
import SimpleFormExecutor from "components/drexecutor/SimpleFormExecutor";

export default function Drexecutor({ dodoable, dodone }) {
  const { day } = useContext(UserContext);
  const Executor = SimpleFormExecutor;

  if (dodone && !dodoable) {
    dodoable = dodone.dodoable;
  } else if (dodoable) {
    dodone = dodoable.beingTrackedDodone || dodoable.buildDodone({ day });
  }

  return <Executor dodoable={dodoable} dodone={dodone} />;
}
