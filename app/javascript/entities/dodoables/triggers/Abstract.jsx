import { TouchableOpacity } from "react-native";
import { Link } from "lib/router";
import UserContext from "lib/UserContext";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon5 from "react-native-vector-icons/FontAwesome5";
import { format, formatDistanceToNow } from "date-fns";
import useCurrentTime from "util/useCurrentTime";
import Chronometer from "ui/clocks/Chronometer";

function DodoableIcon({ dodoable, ...props }) {
  if (!dodoable.trigger.icon) return null;

  // Javascript is so dumb it makes me angry
  const Component =
    {
      Icon: Icon,
      Icon5: Icon5,
    }[dodoable.trigger.icon.component] || Icon;

  return (
    <View style={tw("mr-3")}>
      <Component name={dodoable.trigger.icon.name} {...props} />
    </View>
  );
}

function DodoneDodoableTrigger({ dodoable, text = dodoable.name }) {
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
        <Text style={tw("dodone-dodoable-trigger-text flex-1")}>{text}</Text>
        <Icon size={15} name="check" color={getColor("green-300")} />
      </View>
    </Link>
  );
}

function BeingTrackedDodoableTrigger({ dodoable }) {
  const currentTime = useCurrentTime();

  return (
    <Chronometer
      currentTime={currentTime}
      startedAt={dodoable.beingTrackedDodone.startedAt}
      style={tw("text-blue-300")}
    />
  );
}

function PendingDodoableTrigger({
  dodoable,
  actionIconName = "play",
  text = dodoable.name,
}) {
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
        <Text style={tw("pending-dodoable-trigger-text flex-1")}>{text}</Text>
        {dodoable.beingTrackedDodone ? (
          <BeingTrackedDodoableTrigger dodoable={dodoable} />
        ) : (
          <Icon size={22} name={actionIconName} color={getColor("blue-600")} />
        )}
      </View>
    </Link>
  );
}

function SecondaryDodoableTrigger({
  dodoable,
  actionIconName = "play",
  text = dodoable.name,
}) {
  return (
    <Link
      to={`/dodoables/${dodoable.id}/executor`}
      style={tw("secondary-dodoable-trigger")}
    >
      <View style={tw("flex flex-row items-center")}>
        <DodoableIcon
          dodoable={dodoable}
          size={15}
          color={getColor("gray-500")}
        />
        <Text style={tw("secondary-dodoable-trigger-text flex-1")}>{text}</Text>
        {dodoable.beingTrackedDodone ? (
          <BeingTrackedDodoableTrigger dodoable={dodoable} />
        ) : (
          <Icon size={18} name={actionIconName} color={getColor("gray-500")} />
        )}
      </View>
    </Link>
  );
}

function FailedDodoableTrigger({
  dodoable,
  actionIconName = "close",
  text = dodoable.name,
}) {
  return (
    <Link
      to={`/dodoables/${dodoable.id}/executor`}
      style={tw("failed-dodoable-trigger")}
    >
      <View style={tw("flex flex-row items-center")}>
        <DodoableIcon
          dodoable={dodoable}
          size={15}
          color={getColor("red-600")}
        />
        <Text style={tw("failed-dodoable-trigger-text flex-1")}>{text}</Text>
        {dodoable.beingTrackedDodone ? (
          <BeingTrackedDodoableTrigger dodoable={dodoable} />
        ) : (
          <Icon size={18} name={actionIconName} color={getColor("red-600")} />
        )}
      </View>
    </Link>
  );
}

function BadHabitDodoableTrigger({ dodoable }) {
  let text = `${dodoable.trigger.label} never!`;

  if (dodoable.lastDodone) {
    text = `${dodoable.trigger.label} ${formatDistanceToNow(
      dodoable.lastDodone.finishedAt
    )} ago`;
  }

  return (
    <SecondaryDodoableTrigger
      dodoable={dodoable}
      actionIconName="plus"
      text={text}
    />
  );
}

function TodosDodoableTrigger({ dodoable }) {
  let consideredDodone = null;

  if (dodoable.beingTrackedDodone) {
    consideredDodone = dodoable.beingTrackedDodone;
  } else if (dodoable.todaysDodones.length > 0) {
    consideredDodone =
      dodoable.todaysDodones[dodoable.todaysDodones.length - 1];
  }

  const todoCount = Object.values(dodoable.fields).filter((field) => {
    return field.type == "bool";
  }).length;

  let doneCount = 0;

  if (consideredDodone) {
    doneCount = Object.values(consideredDodone.fields).filter((field) => {
      return field.type == "bool" && field.value == true;
    }).length;
  }

  const text = `${dodoable.name} - ${doneCount}/${todoCount}`;
  let Trigger;

  if (!dodoable.isDodoneToday || dodoable.beingTrackedDodone) {
    Trigger = PendingDodoableTrigger;
  } else {
    Trigger = DodoneDodoableTrigger;
  }

  return <Trigger dodoable={dodoable} text={text} />;
}

function MealDodoableTrigger({ dodoable }) {
  let consideredDodone = null;

  if (dodoable.beingTrackedDodone) {
    consideredDodone = dodoable.beingTrackedDodone;
  } else if (dodoable.todaysDodones.length > 0) {
    consideredDodone =
      dodoable.todaysDodones[dodoable.todaysDodones.length - 1];
  }

  let Trigger;

  if (!dodoable.isDodoneToday || dodoable.beingTrackedDodone) {
    Trigger = PendingDodoableTrigger;
  } else if (consideredDodone) {
    if (consideredDodone.fields.status.value == "Ate it") {
      Trigger = DodoneDodoableTrigger;
    } else {
      Trigger = FailedDodoableTrigger;
    }
  } else {
    Trigger = PendingDodoableTrigger;
  }

  return <Trigger dodoable={dodoable} />;
}

const triggerMap = {
  BadHabit: BadHabitDodoableTrigger,
  Todos: TodosDodoableTrigger,
  Meal: MealDodoableTrigger,
};

export default function AbstractDodoableTrigger({ dodoable }) {
  let Trigger = triggerMap[dodoable.trigger.display];

  if (Trigger == null) {
    // console.log("dodoable.trigger.display", dodoable.trigger.display);
    if (!dodoable.isDodoneToday || dodoable.beingTrackedDodone) {
      Trigger = PendingDodoableTrigger;
    } else {
      Trigger = DodoneDodoableTrigger;
    }
  }

  return <Trigger dodoable={dodoable} />;
}
