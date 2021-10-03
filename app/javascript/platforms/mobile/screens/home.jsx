import { format } from "date-fns";
import SubtleTitle from "ui/typography/SubtleTitle";
import DefaultScreen from "platforms/mobile/screens/default";
import DayFieldWokeupAt from "entities/days/fields/wokeupAt";

import { useApiDay } from "generated/api";

export default function Home() {
  const { day, isLoading } = useApiDay("today");

  return (
    <>
      {!isLoading && (
        <DefaultScreen title={format(day.day, "E, MMM do")}>
          <DayFieldWokeupAt day={day} />
          <SubtleTitle> Doables </SubtleTitle>
          <SubtleTitle> Habits </SubtleTitle>
        </DefaultScreen>
      )}
    </>
  );
}
