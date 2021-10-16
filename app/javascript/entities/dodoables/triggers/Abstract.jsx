import { TouchableOpacity } from "react-native";
import { Link } from "lib/router";
import UserContext from "lib/UserContext";
import Icon from "react-native-vector-icons/FontAwesome";
import { format } from "date-fns";

function MealDodoableTrigger({ dodoable }) {
  const { day } = useContext(UserContext);

  const dodoneToday = dodoable.dodones.find((dodone) => {
    return dodone.dayId == day.id;
  });

  return (
    <Link
      to={
        dodoneToday
          ? `/dodoables/${dodoable.id}`
          : `/dodoables/${dodoable.id}/executor`
      }
      style={tw("py-2 px-4 rounded bg-gray-900 bg-opacity-60 mt-2")}
    >
      <View style={tw("flex flex-row")}>
        {dodoneToday ? (
          <>
            <Text style={tw("text-xs text-blue-300 flex-1")}>
              {dodoable.name} @
              {dodoneToday.startedAt && format(dodoneToday.startedAt, "HH:mm")}
            </Text>
            <Icon size={15} name="check" />
          </>
        ) : (
          <>
            <Text style={tw("text-xl text-blue-300 flex-1")}>
              {dodoable.name}
            </Text>
            <Icon size={26} name="play" />
          </>
        )}
      </View>
    </Link>
  );
}

export default function AbstractDodoableTrigger({ dodoable }) {
  return <MealDodoableTrigger dodoable={dodoable} />;
}
