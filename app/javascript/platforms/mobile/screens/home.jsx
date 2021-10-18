import { format } from "date-fns";
import SubtleTitle from "ui/typography/SubtleTitle";
import DefaultScreen from "platforms/mobile/screens/default";
import DayFieldWokeupAt from "entities/days/fields/wokeupAt";
import DayFieldTurnedOffAt from "entities/days/fields/turnedOffAt";
import Button from "ui/controls/button";
import { TouchableOpacity } from "react-native";
import { useApiDodoables } from "generated/api";

import AbstractDodoableTrigger from "entities/dodoables/triggers/Abstract";
import UserContext from "lib/UserContext";

function IndependentDodoables() {
  const { dodoables, isLoading } = useApiDodoables({ scopes: ["independent"] });

  if (isLoading) return null;

  return (
    <>
      {dodoables.map((dodoable) => {
        return (
          <AbstractDodoableTrigger key={dodoable.id} dodoable={dodoable} />
        );
      })}
    </>
  );
}

function HabitDodoables() {
  const { dodoables, isLoading } = useApiDodoables({ scopes: ["habit"] });

  if (isLoading) return null;

  return (
    <>
      {dodoables.map((dodoable) => {
        return (
          <AbstractDodoableTrigger key={dodoable.id} dodoable={dodoable} />
        );
      })}
    </>
  );
}

function TabTrigger({ setActiveTab, tab, label, activeTab }) {
  const isActive = tab == activeTab;

  const variation = isActive
    ? {
        wrapperStyle: "border-b border-blue-300",
      }
    : {
        wrapperStyle: "opacity-60",
      };

  return (
    <TouchableOpacity
      style={tw("flex-grow pb-1", variation.wrapperStyle)}
      onPress={() => {
        return setActiveTab(tab);
      }}
    >
      <Text style={tw("text-center text-blue-300")}>{label}</Text>
    </TouchableOpacity>
  );
}

function Schedule({ day }) {
  return (
    <View style={tw("flex flex-grow")}>
      <DayFieldWokeupAt day={day} />
      {day.dodoables.map((dodoable) => {
        return (
          <AbstractDodoableTrigger key={dodoable.id} dodoable={dodoable} />
        );
      })}
      <DayFieldTurnedOffAt day={day} />
      <View style={tw("flex-grow")} />
      <HabitDodoables />
    </View>
  );
}

function DayAfterWakeup({ day }) {
  const [activeTab, setActiveTab] = useState();
  // const [activeTab, setActiveTab] = useState("independent");

  return (
    <View style={tw("flex flex-grow")}>
      <View style={tw("flex-row")}>
        <TabTrigger
          setActiveTab={setActiveTab}
          tab={null}
          label="Schedule"
          activeTab={activeTab}
        />
        <TabTrigger
          setActiveTab={setActiveTab}
          tab="independent"
          label="Independent"
          activeTab={activeTab}
        />
      </View>
      <View style={tw("flex flex-grow")}>
        {!activeTab && <Schedule day={day} />}
        {activeTab == "independent" && <IndependentDodoables />}
      </View>
    </View>
  );
}

export default function Home() {
  const { day } = useContext(UserContext);

  return (
    <DefaultScreen title={format(day.day, "E, MMM do")}>
      {!day.wokeupAt && <DayFieldWokeupAt day={day} />}
      {day.wokeupAt && <DayAfterWakeup day={day} />}
    </DefaultScreen>
  );
}
