import { ImageBackground } from "react-native";
// import Icon from "react-native-vector-icons/FontAwesome";

function Menu() {}

export default function DefaultScreen({ children, title = null }) {
  return (
    <ImageBackground
      source={{ uri: "https://iili.io/30TXeI.jpg" }}
      style={{ width: "100%", height: "100%" }}
      style={tw("w-full h-full")}
    >
      <View style={tw("w-full h-full flex-col bg-gray-900 bg-opacity-60")}>
        <View style={tw("flex items-center pb-2 pt-4")}>
          <Text style={tw("text-blue-200 font-thin italic")}>{title}</Text>
          {/* <Icon style={tw("text-blue-200")} name="ellipsis-v" /> */}
        </View>
        <View style={tw("flex-grow p-4")}>{children}</View>
      </View>
    </ImageBackground>
  );
}
