import { format } from "date-fns";
import SubtleTitle from "ui/typography/SubtleTitle";
import DefaultScreen from "platforms/mobile/screens/default";
import DayFieldWokeupAt from "entities/days/fields/wokeupAt";
import Button from "ui/controls/button";
import { TouchableOpacity } from "react-native";

import { useApiDodoables } from "generated/api";
import AbstractDodoableTrigger from "entities/dodoables/triggers/Abstract";
import UserContext from "lib/UserContext";

export default function Home() {
  const { dodoables, isLoading } = useApiDodoables();
  const { day } = useContext(UserContext);

  return (
    <>
      {!isLoading && (
        <DefaultScreen title={format(day.day, "E, MMM do")}>
          <DayFieldWokeupAt day={day} />

          {dodoables.map((dodoable) => {
            return (
              <AbstractDodoableTrigger key={dodoable.id} dodoable={dodoable} />
            );
          })}
        </DefaultScreen>
      )}
    </>
  );
}
