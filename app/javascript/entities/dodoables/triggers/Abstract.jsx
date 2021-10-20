import { TouchableOpacity } from "react-native";
import { Link, useHistory } from "lib/router";
import UserContext from "lib/UserContext";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon5 from "react-native-vector-icons/FontAwesome5";
import IconMC from "react-native-vector-icons/MaterialCommunityIcons";
import { format, formatDistanceToNow } from "date-fns";
import useCurrentTime from "util/useCurrentTime";
import Chronometer from "ui/clocks/Chronometer";

const variations = {
  success: {
    wrapper: { style: "dodone-dodoable-trigger" },
    text: { style: "dodone-dodoable-trigger-text" },
    actionIcon: { color: getColor("green-300"), size: 15, name: "check" },
  },
  secondary: {
    wrapper: { style: "secondary-dodoable-trigger" },
    text: { style: "secondary-dodoable-trigger-text" },
    actionIcon: { color: getColor("gray-500"), size: 15, name: "plus" },
  },
  failed: {
    wrapper: { style: "failed-dodoable-trigger" },
    text: { style: "failed-dodoable-trigger-text" },
    actionIcon: { color: getColor("red-600"), size: 15, name: "close" },
  },
  pending: {
    wrapper: { style: "pending-dodoable-trigger" },
    text: { style: "pending-dodoable-trigger-text" },
    actionIcon: { color: getColor("blue-300"), size: 18, name: "play" },
  },
  beingTracked: {
    wrapper: { style: "being-tracked-dodoable-trigger" },
    text: { style: "being-tracked-dodoable-trigger-text" },
    actionIcon: { color: getColor("blue-300"), size: 18, name: "play" },
  },
};

function DodoableIcon({ dodoable, ...props }) {
  if (!dodoable.trigger.icon) return null;

  // Javascript is so dumb it makes me angry
  const Component =
    {
      Icon: Icon,
      Icon5: Icon5,
      IconMC: IconMC,
    }[dodoable.trigger.icon.component] || Icon;

  return (
    <View style={tw("mr-3")}>
      <Component name={dodoable.trigger.icon.name} {...props} />
    </View>
  );
}

function BeingTrackedDodoableTrigger({ dodoable, style }) {
  const currentTime = useCurrentTime();

  return (
    <Chronometer
      currentTime={currentTime}
      startedAt={dodoable.beingTrackedDodone.startedAt}
      style={style}
    />
  );
}

function DodoableTrigger({
  dodoable,
  actionIconName,
  text = dodoable.name,
  variation = "pending",
}) {
  variation = dodoable.beingTrackedDodone ? "beingTracked" : variation;

  const v = variations[variation];
  const history = useHistory();

  const gotoExecute = useCallback(() => {
    history.push(`/dodoables/${dodoable.id}/executor`);
  });

  const gotoShow = useCallback(() => {
    history.push(`/dodoables/${dodoable.id}`);
  });

  return (
    <TouchableOpacity
      onPress={gotoExecute}
      onLongPress={gotoShow}
      style={tw("flex flex-row items-center", v.wrapper.style)}
    >
      <DodoableIcon dodoable={dodoable} size={14} color={v.actionIcon.color} />
      <Text style={tw("flex-grow", v.text.style)}>{text}</Text>

      {dodoable.beingTrackedDodone ? (
        <BeingTrackedDodoableTrigger
          dodoable={dodoable}
          style={tw(v.text.style, "text-sm")}
        />
      ) : (
        <Icon
          size={v.actionIcon.size}
          name={actionIconName || v.actionIcon.name}
          color={v.actionIcon.color}
        />
      )}
    </TouchableOpacity>
  );
}

function BadHabitDodoableTrigger({ dodoable }) {
  let text = `${dodoable.trigger.label} never!`;

  if (dodoable.lastDodone) {
    text = `${formatDistanceToNow(dodoable.lastDodone.finishedAt)} ${
      dodoable.trigger.label
    }`;
  }

  return (
    <DodoableTrigger dodoable={dodoable} text={text} variation="secondary" />
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
  let variation =
    !dodoable.isDodoneToday || dodoable.beingTrackedDodone
      ? "pending"
      : "success";

  return (
    <DodoableTrigger dodoable={dodoable} text={text} variation={variation} />
  );
}

function MealDodoableTrigger({ dodoable }) {
  let consideredDodone = null;

  if (dodoable.beingTrackedDodone) {
    consideredDodone = dodoable.beingTrackedDodone;
  } else if (dodoable.todaysDodones.length > 0) {
    consideredDodone =
      dodoable.todaysDodones[dodoable.todaysDodones.length - 1];
  }

  let variation = "pending";

  if (!dodoable.beingTrackedDodone && consideredDodone) {
    if (consideredDodone.fields.status.value == "Ate it") {
      variation = "success";
    } else {
      variation = "failed";
    }
  }

  return <DodoableTrigger dodoable={dodoable} variation={variation} />;
}

const triggerMap = {
  BadHabit: BadHabitDodoableTrigger,
  Todos: TodosDodoableTrigger,
  Meal: MealDodoableTrigger,
};

export default function AbstractDodoableTrigger({ dodoable }) {
  let Trigger = triggerMap[dodoable.trigger.display];
  let variation = "pending";

  if (Trigger == null) {
    Trigger = DodoableTrigger;

    if (dodoable.isDodoneToday && !dodoable.beingTrackedDodone) {
      variation = "success";
    }
  }

  return <Trigger dodoable={dodoable} variation={variation} />;
}
