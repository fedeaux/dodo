import {
  parseISO,
  addMinutes,
  isBefore,
  format,
  differenceInMinutes,
} from "date-fns";

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

function Day() {
  const day = {
    wokeupAt: parseISO("2021-08-24T12:00:00.999Z"),
  };

  const timeslots = evalTimeslots(day.wokeupAt, minutesPerSlot);

  const dodones = [
    {
      id: 1,
      title: "Investment Operations and Art",
      startedAt: parseISO("2021-08-24T12:30:00.999Z"),
      finishedAt: parseISO("2021-08-24T13:55:00.999Z"),
    },
    {
      id: 2,
      title: "Exercise and Meditation",
      startedAt: parseISO("2021-08-24T14:00:00.999Z"),
      finishedAt: parseISO("2021-08-24T15:55:00.999Z"),
    },
    {
      id: 3,
      title: "Wordable",
      startedAt: parseISO("2021-08-24T16:00:00.999Z"),
      finishedAt: parseISO("2021-08-24T21:25:00.999Z"),
    },
  ];

  return (
    <View>
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

export default function Home() {
  return (
    <View style={tw("flex flex-col h-full")}>
      <View style={tw("flex px-4 py-2")} />
      <View style={tw("flex px-4 py-2 flex-grow")}>
        <Day />
      </View>
    </View>
  );
}
