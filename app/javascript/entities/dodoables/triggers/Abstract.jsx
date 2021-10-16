import { TouchableOpacity } from "react-native";
import { Link } from "lib/router";

function MealDodoableTrigger({ dodoable }) {
  return (
    <Link to={`/dodoables/${dodoable.id}`}>
      <Text>{dodoable.name}</Text>
    </Link>
  );
}

export default function AbstractDodoableTrigger({ dodoable }) {
  return <MealDodoableTrigger dodoable={dodoable} />;
}
