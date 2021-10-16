import { TouchableOpacity } from "react-native";
import { Link } from "lib/router";
import MainTitle from "ui/typography/MainTitle";
import UserContext from "lib/UserContext";
import Button from "ui/controls/button";
import TimeInput from "ui/inputs/time";

function MealDodoableExecutor({ dodoable }) {
  const { day } = useContext(UserContext);
  const [dodoneAttributes, setDodoneAttributes] = useState({
    dayId: day.id,
    dodoableId: dodoable.id,
  });

  const save = useCallback(() => {
    console.log("dodoneAttributes", dodoneAttributes);
  });

  return (
    <View>
      <MainTitle>{dodoable.name}</MainTitle>
      <View>
        <Text>At</Text>
        <TimeInput
          value={new Date()}
          onChange={({ value }) => {
            setDodoneAttributes({ ...dodoneAttributes, startedAt: value });
          }}
        />
      </View>
      <Button label="Dodone!" onClick={save} />
    </View>
  );
}

export default function AbstractDodoableExecutor({ dodoable }) {
  return <MealDodoableExecutor dodoable={dodoable} />;
}
