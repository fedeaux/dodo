import { format, parse, formatDistanceToNow } from "date-fns";
import SubtleTitle from "ui/typography/SubtleTitle";
import DefaultScreen from "platforms/mobile/screens/default";
import DayFieldWokeupAt from "entities/days/fields/wokeupAt";
import DayFieldTurnedOffAt from "entities/days/fields/turnedOffAt";
import Button from "ui/controls/button";
import { TouchableOpacity, ScrollView } from "react-native";
import { useApiDodoables } from "generated/api";
import Drigger from "components/drigger";

import AbstractDodoableTrigger from "entities/dodoables/triggers/Abstract";
import UserContext from "lib/UserContext";

function IndependentDodoables() {
  const { dodoables, isLoading } = useApiDodoables({
    scopes: ["independent"],
    order: ["name"],
  });

  const sortedDodoables = useMemo(() => {
    if (isLoading) {
      return [];
    }

    return dodoables.sort((dodoableA, dodoableB) => {
      return dodoableA.rank - dodoableB.rank;
    });
  }, [dodoables, isLoading]);

  if (isLoading) return null;

  return (
    <ScrollView style={tw("flex-1")}>
      {sortedDodoables.map((dodoable) => {
        return <Drigger key={dodoable.id} dodoable={dodoable} />;
      })}
    </ScrollView>
  );
}

function HabitDodoables() {
  const { dodoables, isLoading } = useApiDodoables({ scopes: ["habit"] });

  const sortedDodoables = useMemo(() => {
    if (isLoading) {
      return [];
    }

    return dodoables.sort((dodoableA, dodoableB) => {
      return dodoableA.slug.localeCompare(dodoableB.slug);
    });
  }, [dodoables, isLoading]);

  if (isLoading) return null;

  return (
    <View style={tw("flex-row items-center justify-center")}>
      {sortedDodoables.map((dodoable) => {
        return <Drigger key={dodoable.id} dodoable={dodoable} />;
      })}
    </View>
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

function DopaminDetox() {
  const lastDopaminFuck = parse("14/11/2021", "dd/MM/yyyy", new Date());

  return (
    <View style={tw("text-center")}>
      <Text style={tw("text-lg text-blue-400 italic")}>
        {formatDistanceToNow(lastDopaminFuck)} without fucking up my dopamin
      </Text>
    </View>
  );
}

function Schedule({ day }) {
  // TODO: DRY here and mobile

  const sortedScheduleDodones = useMemo(() => {
    return day.scheduleDodones.sort((da, db) => {
      return da.timeRank - db.timeRank;
    });
  }, [day]);

  return (
    <>
      <ScrollView style={tw("flex-1 mb-4")}>
        <DayFieldWokeupAt day={day} />
        {sortedScheduleDodones.map((dodone) => {
          return <Drigger key={dodone.id} dodone={dodone} />;
        })}
        <DayFieldTurnedOffAt day={day} />
      </ScrollView>
      {<DopaminDetox />}
    </>
  );
}

function useHomeActiveTab() {
  const { homeActiveTab, setHomeActiveTab } = useContext(UserContext);

  return [homeActiveTab, setHomeActiveTab];
}

function DayAfterWakeup({ day }) {
  const [activeTab, setActiveTab] = useHomeActiveTab();

  return (
    <View style={tw("flex flex-1")}>
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
      <View style={tw("flex flex-1")}>
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
