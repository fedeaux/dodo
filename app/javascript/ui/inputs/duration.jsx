import { TouchableOpacity } from "react-native";
import PrimaryButton from "ui/controls/button/primary";
import Modal from "ui/controls/modal";
import DurationDisplay from "ui/displays/duration";
import AbstractField from "ui/fields/Abstract";

export default function DurationInput({
  value,
  onChange,
  onConfirm,
  onCancel,
  label,
  Display = DurationDisplay,
}) {
  value = value ? parseInt(value) : 10;
  const [showingModal, hideModal, showModal] = useBoolState(false);
  const hour = Number.isInteger(value) ? parseInt(value / 60) : 0;
  const minutes = Number.isInteger(value) ? value - hour * 60 : 0;

  const hourChanged = useCallback(({ hour }) => {
    onChange({ value: hour * 60 + minutes });
  });

  const minutesChanged = useCallback(({ minutes }) => {
    onChange({ value: hour * 60 + minutes });
  });

  const confirm = useCallback(() => {
    if (onConfirm) onConfirm();

    hideModal();
  });

  const cancel = useCallback(() => {
    if (onCancel) onCancel();

    hideModal();
  });

  const clearValue = useCallback(() => {
    onChange({ value: 0 });
  });

  return (
    <>
      <TouchableOpacity onPress={showModal}>
        <View>
          <Display value={value} />
        </View>
      </TouchableOpacity>
      <Modal
        showingModal={showingModal}
        hideModal={hideModal}
        showModal={showingModal}
        title={label}
      >
        <View style={tw("flex-row")}>
          <AbstractField
            value={hour}
            onChange={hourChanged}
            wrapperTws="mr-1 flex-grow"
            type="number"
            name="hour"
            label="Hour"
          />
          <AbstractField
            value={minutes}
            onChange={minutesChanged}
            wrapperTws="ml-1 flex-grow"
            type="number"
            name="minutes"
            label="Minutes"
          />
        </View>

        <View style={tw("flex-row mt-4")}>
          <PrimaryButton
            label="Clear"
            color="danger"
            block
            tws="mr-1"
            onClick={clearValue}
          />
          <PrimaryButton
            label="OK"
            color="success"
            block
            tws="ml-1"
            onClick={confirm}
          />
        </View>
      </Modal>
    </>
  );
}
