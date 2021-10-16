import AbstractField from "ui/fields/Abstract";

export default function DodoneExperimentsSimpleForm({
  dodoneAttributes,
  setDodoneAttributes,
}) {
  const onDodoneFieldChanged = useCallback(
    (payload) => {
      const updatedFields = {};

      Object.entries(payload).forEach(([name, value]) => {
        const field = dodoneAttributes.fields[name];
        updatedFields[name] = { ...field, value };
      });

      setDodoneAttributes({
        ...dodoneAttributes,
        fields: {
          ...dodoneAttributes.fields,
          ...updatedFields,
        },
      });
    },
    [dodoneAttributes, setDodoneAttributes]
  );

  return (
    <>
      {Object.values(dodoneAttributes.fields)
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
