import AbstractField from "ui/fields/Abstract";
import CircleButton from "ui/controls/button/circle";

export default function CollectionInputItem({
  value,
  index,
  fields,
  onChange,
  removeItem,
}) {
  const handleOnChange = useCallback((payload) => {
    onChange({ ...payload, index: index });
  });

  const removeInputItem = useCallback(() => {
    removeItem(index);
  });

  return (
    <View key={index} style={tw("px-2 flex-row items-center")}>
      <View key={index} style={tw("pr-2 flex-grow")}>
        {Object.values(fields)
          .sort((fa, fb) => {
            return fa.order - fb.order;
          })
          .map((field) => {
            return (
              <AbstractField
                key={field.name}
                onChange={handleOnChange}
                value={value[field.name]}
                {...field}
                name={field.name}
              />
            );
          })}
      </View>
      {removeItem && (
        <CircleButton
          onClick={removeInputItem}
          icon={{ name: "minus" }}
          color="danger"
        />
      )}
    </View>
  );
}
