import { TouchableOpacity } from "react-native";
import { Link } from "lib/router";
import UserContext from "lib/UserContext";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon5 from "react-native-vector-icons/FontAwesome5";
import { format } from "date-fns";

function DodoableIcon({ dodoable, ...props }) {
  if (!dodoable.trigger.icon) return null;

  // Javascript is so dumb it makes me angry
  const Component = {
    Icon: Icon,
    Icon5: Icon5,
  }[dodoable.trigger.icon.component];

  return (
    <View style={tw("mr-3")}>
      <Component name={dodoable.trigger.icon.name} {...props} />
    </View>
  );
}

function DodoneDodoableTrigger({ dodoable }) {
  return (
    <Link
      to={`/dodoables/${dodoable.id}`}
      style={tw("dodone-dodoable-trigger")}
    >
      <View style={tw("flex flex-row items-center")}>
        <DodoableIcon
          dodoable={dodoable}
          size={12}
          color={getColor("green-300")}
        />
        <Text style={tw("dodone-dodoable-trigger-text flex-1")}>
          {dodoable.name}
        </Text>
        <Icon size={15} name="check" color={getColor("green-300")} />
      </View>
    </Link>
  );
}

function PendingDodoableTrigger({ dodoable }) {
  return (
    <Link
      to={`/dodoables/${dodoable.id}/executor`}
      style={tw("pending-dodoable-trigger")}
    >
      <View style={tw("flex flex-row items-center")}>
        <DodoableIcon
          dodoable={dodoable}
          size={15}
          color={getColor("blue-300")}
        />
        <Text style={tw("pending-dodoable-trigger-text flex-1")}>
          {dodoable.name}
        </Text>
        <Icon size={22} name="play" color={getColor("blue-600")} />
      </View>
    </Link>
  );
}

export default function AbstractDodoableTrigger({ dodoable }) {
  const Trigger = dodoable.isDodoneToday
    ? DodoneDodoableTrigger
    : PendingDodoableTrigger;

  return <Trigger dodoable={dodoable} />;
}
