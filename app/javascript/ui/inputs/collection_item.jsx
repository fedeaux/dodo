import AbstractField from "ui/fields/Abstract";
import CircleButton from "ui/controls/button/circle";

export default function CollectionInputItem({
  value,
  index,
  fields,
  onChange,
  removeItem,
  fieldsOptions = {},
  ...props
}) {
  const handleOnChange = useCallback((payload) => {
    onChange({ ...payload, index: index });
  });

  const removeInputItem = useCallback(() => {
    removeItem(index);
  });

  const s =
    fieldsOptions.variant == "compact"
      ? {
          rowWrapper: "items-end",
          fieldsWrapper: "flex-row",
          fieldWrapper: "pr-4",
        }
      : {
          rowWrapper: "items-center",
          fieldsWrapper: "flex-col pr-2",
          fieldWrapper: "",
        };

  return (
    <View style={tw("flex-row", s.rowWrapper)}>
      <View style={tw("flex-1", s.fieldsWrapper)}>
        {Object.values(fields)
          .sort((fa, fb) => {
            return fa.order - fb.order;
          })
          .map((field) => {
            return (
              <View key={field.name} style={tw("flex-grow", s.fieldWrapper)}>
                <AbstractField
                  onChange={handleOnChange}
                  value={value[field.name]}
                  {...fieldsOptions}
                  {...field}
                />
              </View>
            );
          })}
      </View>
      {removeItem && (
        <CircleButton
          onClick={removeInputItem}
          icon={{ name: "minus" }}
          color="danger"
          tws="mb-2"
        />
      )}
    </View>
  );
}
