import { TouchableOpacity } from "react-native";
import Modal from "ui/controls/modal";
import TextDisplay from "ui/displays/text";

export default function SelectInput({ value, options, onChange, label }) {
  const [showingModal, hideModal, showModal] = useBoolState(false);

  const selectOption = useCallback(
    (value) => {
      onChange({ value });
      hideModal();
    },
    [value, onChange]
  );

  const selectedOption = options.find((option) => {
    return option.value == value;
  });

  return (
    <>
      <TouchableOpacity onPress={showModal}>
        <TextDisplay value={selectedOption?.label} />
      </TouchableOpacity>
      <Modal
        showingModal={showingModal}
        hideModal={hideModal}
        showModal={showingModal}
        title={label}
      >
        {options.map((option) => {
          const style =
            option.value == selectedOption?.value
              ? "bg-gray-600 text-green-300"
              : "bg-gray-900 text-blue-300";

          return (
            <TouchableOpacity
              key={option.label}
              onPress={() => {
                return selectOption(option.value);
              }}
            >
              <Text
                style={tw(
                  "text-xl py-2 px-4 rounded mb-4 bg-opacity-30",
                  style
                )}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </Modal>
    </>
  );
}
