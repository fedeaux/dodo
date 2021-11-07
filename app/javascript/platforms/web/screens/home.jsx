import {
  parseISO,
  addMinutes,
  isBefore,
  format,
  differenceInMinutes,
} from "date-fns";

import ENV from "env";

import { useApiDays } from "generated/api";
import { useCallback } from "react";
import TimeInput from "ui/inputs/time";
import Button from "ui/controls/button";

function Menu() {}

function evalTimeslots(start, minutesStep) {
  const slots = [];
  const finish = addMinutes(start, 15 * 60);
  let current = new Date(start.getTime());

  while (isBefore(current, finish)) {
    slots.push(current);
    current = addMinutes(current, minutesStep);
  }

  return slots;
}

const pxPerMinute = 1;
const minutesPerSlot = 60;

function Timeslot({ signature }) {
  return (
    <View
      style={{
        ...tw("border-b border-gray-200"),
        height: minutesPerSlot * pxPerMinute,
      }}
    >
      <Text style={tw("text-xs text-gray-400 font-thin")}>{signature}</Text>
    </View>
  );
}

function DodoneTimeslot({ dodone, start }) {
  const top = differenceInMinutes(dodone.startedAt, start) * pxPerMinute;
  const height =
    differenceInMinutes(dodone.finishedAt, dodone.startedAt) * pxPerMinute;

  return (
    <View
      style={{
        height,
        top,
        left: 50,
        width: 280,
        ...tw("bg-gray-100 rounded absolute p-2"),
      }}
    >
      <Text>{dodone.title}</Text>
    </View>
  );
}

function DayTimeslots({ day }) {
  if (!day.wokeupAt) return null;

  const timeslots = evalTimeslots(day.wokeupAt, minutesPerSlot);

  return (
    <View style={tw("relative")}>
      {timeslots.map((timeslot) => {
        const signature = format(timeslot, "HH:mm");

        return <Timeslot key={signature} signature={signature} />;
      })}
      {dodones.map((dodone) => {
        return (
          <DodoneTimeslot
            start={day.wokeupAt}
            key={dodone.id}
            dodone={dodone}
          />
        );
      })}
    </View>
  );
}

function DayHeaderWokeupAt({ day }) {
  const { apiUpdateDay } = useApiUpdateDay();
  const [editing, setEditing] = useState(false);
  const [wokeupAt, setWokeupAt] = useState(
    day.wokeupAt ? day.wokeupAt : new Date()
  );

  const updateDay = useCallback(() => {
    apiUpdateDay(day.id, { wokeupAt });
    setEditing(false);
  });

  if (editing) {
    return (
      <View>
        <TimeInput value={wokeupAt} onChange={setWokeupAt} />
        <button onClick={updateDay}>Save</button>
      </View>
    );
  }

  return (
    <View style={tw("p-4")} onClick={() => setEditing(true)}>
      {day.wokeupAt ? (
        <Text>{format(day.wokeupAt, "HH:mm")}</Text>
      ) : (
        <Text>Start Day!</Text>
      )}
    </View>
  );
}

function DayHeader({ day }) {
  return (
    <View>
      <View style={tw("p-4")}>
        <Text style={tw("p-4")}>{format(day.day, "EEE, LLL do")}</Text>
        <DayHeaderWokeupAt day={day} />
      </View>
    </View>
  );
}

function Day() {
  const { day, isLoading } = useApiDay("today");

  if (isLoading) return null;

  return (
    <View>
      <DayHeader day={day} />
      <DayTimeslots day={day} />
    </View>
  );
}

export default function Home() {
  const { days, isLoading } = useApiDays();

  const useMobile = useCallback(() => {
    localStorage.setItem("useMobile", true);
    window.location.reload();
  });

  if (isLoading) return null;

  return (
    <View style={tw("flex flex-col h-full")}>
      <Button label="Use Mobile" onClick={useMobile} />
      <View style={tw("flex flex-row flex-grow")}>
        {days.map((day) => {
          return (
            <View key={day.id} style={tw("w-40 px-4")}>
              <Text>{format(day.day, "E, MMM do")}</Text>
              {day.wokeupAt && <Text>{format(day.wokeupAt, "HH:mm")}</Text>}

              {day.scheduleDodones.map((dodone) => {
                return (
                  <Text style={tw("py-2")} key={dodone.id}>
                    {dodone.dodoable.name}
                  </Text>
                );
              })}
            </View>
          );
        })}
      </View>
    </View>
  );
}
