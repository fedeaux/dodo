import AbstractDisplay from "ui/displays/Abstract";

export default function CollectionInputItem({
  value,
  index,
  fields,
  fieldsOptions = {},
  ...props
}) {
  const s =
    fieldsOptions.variant == "compact"
      ? {
          rowWrapper: "items-end",
          fieldsWrapper: "flex-row",
          fieldWrapper: "",
        }
      : {
          rowWrapper: "items-center",
          fieldsWrapper: "flex-col pr-2",
          fieldWrapper: "",
        };

  return (
    <View style={tw("flex-1", s.fieldsWrapper)}>
      {Object.values(fields)
        .sort((fa, fb) => {
          return fa.order - fb.order;
        })
        .map((field) => {
          return (
            <View key={field.name} style={tw("flex-grow", s.fieldWrapper)}>
              <AbstractDisplay
                value={value[field.name]}
                {...fieldsOptions}
                {...field}
              />
            </View>
          );
        })}
    </View>
  );
}
