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
    <View style={tw("mr-2")}>
      <Component name={dodoable.trigger.icon.name} {...props} />
    </View>
  );
}

function BeingTrackedDrigger({ dodone, style }) {
  const currentTime = useCurrentTime();

  return (
    <Chronometer
      currentTime={currentTime}
      startedAt={dodone.startedAt}
      style={style}
    />
  );

  // <View style={tw("flex")}>
  //   <Text style={tw(style, "text-3xs text-center")}>
  //     {format(dodone.startedAt, "HH:mm")}
  //   </Text>
  // </View>
}

function DriggerTimeInfo({ dodoable, dodone, v }) {
  if (dodoable.executor.finishedAtBehaviour == "instantaneous") {
    return null;
  }

  if (dodone.scheduledTo && !dodone.startedAt) {
    return (
      <Text style={tw(v.text.style, "text-3xs mb-1")}>
        Scheduled to {format(dodone.scheduledTo, "HH:mm")}
      </Text>
    );
  }

  if (dodone.startedAt && dodone.finishedAt) {
    return (
      <View style={tw("flex-row items-center mb-1")}>
        <Text style={tw(v.text.style, "text-3xs mr-1")}>
          {format(dodone.startedAt, "HH:mm")}
        </Text>
        <IconMC name="arrow-right" size={8} color={v.actionIcon.color} />
        <Text style={tw(v.text.style, "text-3xs ml-1")}>
          {format(dodone.finishedAt, "HH:mm")}
        </Text>
      </View>
    );
  }

  return null;
}

function Drigger({
  dodoable,
  dodone,
  actionIconName,
  text = dodoable.name,
  variation = "pending",
}) {
  variation = dodone.isBeingTracked ? "beingTracked" : variation;

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
      <View style={tw("flex flex-grow")}>
        <DriggerTimeInfo dodoable={dodoable} dodone={dodone} v={v} />
        <View style={tw("flex flex-row items-center")}>
          <DodoableIcon
            dodoable={dodoable}
            size={14}
            color={v.actionIcon.color}
          />
          <Text style={tw("flex-grow", v.text.style)}>{text}</Text>
        </View>
      </View>
      {dodone.isBeingTracked ? (
        <BeingTrackedDrigger
          dodone={dodone}
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

function BadHabitDrigger({ dodoable, dodone }) {
  let text = `${dodoable.trigger.label} never!`;

  if (dodone) {
    text = `${formatDistanceToNow(dodone.finishedAt)} ${
      dodoable.trigger.label
    }`;
  }

  return <Drigger dodoable={dodoable} text={text} variation="secondary" />;
}

function TodosDrigger({ dodoable, dodone }) {
  let consideredDodone = null;

  const todoCount = Object.values(dodoable.fields).filter((field) => {
    return field.type == "bool";
  }).length;

  let doneCount = 0;

  if (dodone) {
    doneCount = Object.values(dodone.fields).filter((field) => {
      return field.type == "bool" && field.value == true;
    }).length;
  }

  const text = `${dodoable.name} - ${doneCount}/${todoCount}`;
  let variation = dodone.isFinished ? "success" : "pending";

  return (
    <Drigger
      dodoable={dodoable}
      dodone={dodone}
      text={text}
      variation={variation}
    />
  );
}

function MealDrigger({ dodoable, dodone }) {
  let variation = "pending";

  if (dodone?.isFinished) {
    if (dodone.fields.status.value == "Ate it") {
      variation = "success";
    } else {
      variation = "failed";
    }
  }

  return <Drigger dodoable={dodoable} dodone={dodone} variation={variation} />;
}

const triggerMap = {
  BadHabit: BadHabitDrigger,
  Todos: TodosDrigger,
  Meal: MealDrigger,
};

export default function AbstractDrigger({ dodoable, dodone }) {
  if (dodone && !dodoable) {
    dodoable = dodone.dodoable;
  } else if (dodoable && !dodone) {
    dodone =
      dodoable.beingTrackedDodone || dodoable.todaysDodones.length > 0
        ? dodoable.todaysDodones[dodoable.todaysDodones.length - 1]
        : null;
  }

  let Trigger = triggerMap[dodoable.trigger.display];
  let variation = "pending";

  if (Trigger == null) {
    Trigger = Drigger;

    if (dodone.isFinished) {
      variation = "success";
    }
  }

  return <Trigger dodoable={dodoable} dodone={dodone} variation={variation} />;
}
