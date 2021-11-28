import {
  parseISO,
  addMinutes,
  isBefore,
  format,
  differenceInMinutes,
} from "date-fns";
import { useApiWeeks } from "generated/api";

function Week({ week }) {
  return (
    <View style={tw("w-80 px-4")}>
      <View style={tw("flex flex-row")}>
        <Text>{format(week.startDay, "MMM do")}</Text>
        <Text>{format(week.endDay, "MMM do")}</Text>
      </View>
      {week.statistics.map((statistic) => {
        return (
          <View key={statistic.key}>
            <Text>{statistic.label}</Text>
            <Text>{statistic.value}</Text>
          </View>
        );
      })}
    </View>
  );
}

export default function WeeksIndex() {
  const { weeks, isLoading } = useApiWeeks();

  if (isLoading) return null;

  return (
    <View style={tw("flex flex-col h-full bg-gray-600")}>
      <View style={tw("flex flex-row flex-grow")}>
        {weeks.map((week) => {
          return <Week key={week.id} week={week} />;
        })}
      </View>
    </View>
  );
}
