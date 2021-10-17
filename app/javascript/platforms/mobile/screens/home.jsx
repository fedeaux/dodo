import { format } from "date-fns";
import SubtleTitle from "ui/typography/SubtleTitle";
import DefaultScreen from "platforms/mobile/screens/default";
import DayFieldWokeupAt from "entities/days/fields/wokeupAt";
import Button from "ui/controls/button";
import { TouchableOpacity } from "react-native";

import AbstractDodoableTrigger from "entities/dodoables/triggers/Abstract";
import UserContext from "lib/UserContext";

function OtherDodoables() {
  return <Text>Oe</Text>;
}

function TabTrigger({ setActiveTab, tab, label, activeTab }) {
  const isActive = tab == activeTab;

  const variation = isActive
    ? {
        wrapperStyle: "border-b border-blue-300",
        textStyle: "text-blue-300",
      }
    : {
        wrapperStyle: "",
        textStyle: "text-blue-500",
      };

  return (
    <TouchableOpacity
      style={tw("flex-grow pb-1", variation.wrapperStyle)}
      onPress={() => {
        return setActiveTab(tab);
      }}
    >
      <Text style={tw("text-center", variation.textStyle)}>{label}</Text>
    </TouchableOpacity>
  );
}

function DayAfterWakeup({ day }) {
  const [activeTab, setActiveTab] = useState("other");

  return (
    <View style={tw("flex")}>
      <View style={tw("flex-row")}>
        <TabTrigger
          setActiveTab={setActiveTab}
          tab={null}
          label="Schedule"
          activeTab={activeTab}
        />
        <TabTrigger
          setActiveTab={setActiveTab}
          tab="other"
          label="Other"
          activeTab={activeTab}
        />
      </View>
      <View style={tw("flex-grow")}>
        {!activeTab && (
          <>
            <DayFieldWokeupAt day={day} />
            {day.dodoables.map((dodoable) => {
              return (
                <AbstractDodoableTrigger
                  key={dodoable.id}
                  dodoable={dodoable}
                />
              );
            })}
          </>
        )}
        {activeTab == "other" && <OtherDodoables />}
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
