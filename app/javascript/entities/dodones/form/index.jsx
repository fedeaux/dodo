import AbstractField from "ui/fields/Abstract";
import DodonesFieldsFields from "entities/dodones/fields/fields";

export default function DodoneForm({ dodone, setDodone }) {
  const onDodoneChanged = useCallback(
    (payload) => {
      Object.entries(payload).forEach(([name, value]) => {
        dodone[name] = value;
      });

      setDodone(dodone.clone());
    },
    [dodone, setDodone]
  );

  return (
    <>
      <AbstractField
        type="time"
        name="startedAt"
        value={dodone.startedAt}
        label="Started At"
        onChange={onDodoneChanged}
      />
      <DodonesFieldsFields dodone={dodone} setDodone={setDodone} />
      {dodone.finishedAt && (
        <AbstractField
          type="time"
          name="finishedAt"
          value={dodone.finishedAt}
          label="Finished At"
          onChange={onDodoneChanged}
        />
      )}
      {dodone.isStatusable && (
        <AbstractField
          type="select"
          name="status"
          value={dodone.status}
          label="Status"
          onChange={onDodoneChanged}
          options={dodone.statusesAsOptions}
        />
      )}
    </>
  );
}
