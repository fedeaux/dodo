import DayTimeField from "entities/days/fields/time";

export default function DayFieldTurnedOffAt({ day }) {
  return (
    <DayTimeField
      day={day}
      prefix="Turned Off @"
      name="turnedOffAt"
      triggerText="Turn off :)"
    />
  );
}
