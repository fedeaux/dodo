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
          {/* <View style={tw("p-2 rounded bg-gray-900 bg-opacity-60")}> */}
          {/*   <Text style={tw("text-blue-300 text-xs")}>Wokeup @ 09:30</Text> */}
          {/* </View> */}
          <SubtleTitle> Doables </SubtleTitle>
          <SubtleTitle> Habits </SubtleTitle>
        </DefaultScreen>
      )}
    </>
  );
}
