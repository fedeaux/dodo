import DayTimeField from "entities/days/fields/time";

export default function DayFieldWokeupAt({ day }) {
  return (
    <DayTimeField
      day={day}
      prefix="Wokeup @"
      name="wokeupAt"
      triggerText="Track Woke Up"
    />
  );
}
