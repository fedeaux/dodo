import {
  format,
  getHours,
  getMinutes,
  isValid,
  setHours,
  setMinutes,
  setSeconds,
} from "date-fns";
import { TouchableOpacity } from "react-native";
import PrimaryButton from "ui/controls/button/primary";
import Modal from "ui/controls/modal";
import TimeDisplay from "ui/displays/time";
import AbstractField from "ui/fields/Abstract";

export default function TimeInput({
  value,
  onChange,
  onConfirm,
  onCancel,
  label,
  Display = TimeDisplay,
}) {
  const [showingModal, hideModal, showModal] = useBoolState(false);
  const hour = isValid(value) ? getHours(value) : 0;
  const minutes = isValid(value) ? getMinutes(value) : 0;

  const hourChanged = useCallback(({ hour }) => {
    let newValue = isValid(value) ? value : new Date();
    onChange({ value: setSeconds(setHours(newValue, hour), 0) });
  });

  const minutesChanged = useCallback(({ minutes }) => {
    let newValue = isValid(value) ? value : new Date();
    onChange({ value: setSeconds(setMinutes(newValue, minutes), 0) });
  });

  const confirm = useCallback(() => {
    if (onConfirm) onConfirm();

    hideModal();
  });

  const cancel = useCallback(() => {
    if (onCancel) onCancel();

    hideModal();
  });

  const setValueToNow = useCallback(() => {
    onChange({ value: new Date() });
  });

  const clearValue = useCallback(() => {
    onChange({ value: null });
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
        <AbstractField
          value={hour}
          onChange={hourChanged}
          type="number"
          name="hour"
          label="Hour"
        />
        <AbstractField
          value={minutes}
          onChange={minutesChanged}
          type="number"
          name="minutes"
          label="Minutes"
        />

        <View style={tw("flex-row mt-4")}>
          <PrimaryButton
            label="Clear"
            color="danger"
            block
            tws="mr-1"
            onClick={clearValue}
          />
          <PrimaryButton
            label="Now"
            block
            tws="ml-1 mr-1"
            onClick={setValueToNow}
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
