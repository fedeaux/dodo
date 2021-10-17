import AbstractField from "ui/fields/Abstract";

export default function DodoneExperimentsSimpleForm({ dodone, setDodone }) {
  const onDodoneFieldChanged = useCallback(
    (payload) => {
      const fields = dodone.fields;

      Object.entries(payload).forEach(([name, value]) => {
        fields[name].value = value;
      });

      dodone.fields = fields;
      setDodone(dodone.clone());
    },
    [dodone, setDodone]
  );

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

      {Object.values(dodone.fields)
        .sort((fa, fb) => {
          return fa.order - fb.order;
        })
        .map((field) => {
          return (
            <AbstractField
              key={field.name}
              onChange={onDodoneFieldChanged}
              {...field}
            />
          );
        })}
      {dodone.finishedAt && (
        <AbstractField
          type="time"
          name="finishedAt"
          value={dodone.finishedAt}
          label="Finished At"
          onChange={onDodoneChanged}
        />
      )}
    </>
  );
}
