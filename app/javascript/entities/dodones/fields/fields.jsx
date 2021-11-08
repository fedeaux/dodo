import AbstractField from "ui/fields/Abstract";

export default function DodonesFieldsFields({ dodone, setDodone }) {
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

  return (
    <>
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
    </>
  );
}
