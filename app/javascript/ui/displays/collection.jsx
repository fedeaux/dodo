import PrimaryButton from "ui/controls/button/primary";
import CollectionDisplayItem from "ui/displays/collection_item";

export default function CollectionDisplay({ value, fields, ...props }) {
  if (typeof value.map != "function") {
    return null;
  }

  return (
    <View style={tw("mb-4")}>
      {value.map((valueItem, valueIndex) => {
        return (
          <CollectionDisplayItem
            key={valueIndex}
            index={valueIndex}
            value={valueItem}
            fields={fields}
            {...props}
          />
        );
      })}
    </View>
  );
}
