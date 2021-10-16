import { TouchableOpacity } from "react-native";
import { Link } from "lib/router";
import MainTitle from "ui/typography/MainTitle";
import UserContext from "lib/UserContext";

function MealDodoableShow({ dodoable }) {
  const { day } = useContext(UserContext);

  const dodoneToday = dodoable.dodones.find((dodone) => {
    return dodone.dayId == day.id;
  });

  return (
    <View>
      <MainTitle>{dodoable.name}</MainTitle>
      {dodoable.dodones.map((dodone) => {
        return (
          <View key={dodone.id}>
            <Text>{dodone.id}</Text>
          </View>
        );
      })}

      {dodoneToday ? (
        <Text>Dodone!</Text>
      ) : (
        <Link to={`/dodoables/${dodoable.id}/executor`}>
          <Text>Dodoit</Text>
        </Link>
      )}
    </View>
  );
}

export default function AbstractDodoableShow({ dodoable }) {
  return <MealDodoableShow dodoable={dodoable} />;
}
