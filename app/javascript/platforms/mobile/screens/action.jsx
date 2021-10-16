import Icon from "react-native-vector-icons/FontAwesome";
import { ImageBackground } from "react-native";
import { Link } from "lib/router";
import { useHistory } from "lib/router";

export default function ActionScreen({ children, backTo, title = null }) {
  const history = useHistory();
  const back = useCallback(() => {
    history.goBack();
  });

  return (
    <ImageBackground
      source={{ uri: "https://iili.io/30Thbt.jpg" }}
      style={{ width: "100%", height: "100%" }}
      style={tw("w-full h-full")}
    >
      <View style={tw("w-full h-full flex-col bg-gray-900 bg-opacity-60")}>
        <View style={tw("px-4 pb-1 pt-4")}>
          <Link to="/" style={tw("pt-1 text-blue-200 absolute top-4 left-4")}>
            <Icon size={18} name="chevron-left" />
          </Link>
          <Text style={tw("ml-8 text-blue-300 pt-1")}>{title}</Text>
          <Link to="/" style={tw("pt-1 text-blue-200 absolute top-4 right-4")}>
            <Icon size={18} name="home" />
          </Link>
        </View>
        <View style={tw("flex-grow")}>{children}</View>
      </View>
    </ImageBackground>
  );
}
