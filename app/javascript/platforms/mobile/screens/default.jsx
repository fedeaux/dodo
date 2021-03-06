import { ImageBackground, TouchableOpacity, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Button from "ui/controls/button";
import ENV from "env";
import { BraindamageApiContext } from "braindamage/api/provider";

function Menu({ closeMenu }) {
  const useWeb = useCallback(() => {
    localStorage.removeItem("useMobile");
    window.location.reload();
  });

  return (
    <View style={tw("w-full h-full flex-col bg-gray-900 bg-opacity-60 p-4")}>
      <Text style={tw("text-center text-xl mb-4")}>Menu</Text>
      <TouchableOpacity
        style={tw("mr-4 pt-1 text-blue-200 absolute top-4 right-2 pl-4")}
        onPress={closeMenu}
      >
        <Icon size={18} name="close" />
      </TouchableOpacity>
      {ENV.PLATFORM == "web" && <Button label="Use Web" onClick={useWeb} />}
    </View>
  );
}

export default function DefaultScreen({ children, title = null }) {
  const [showMenu, closeMenu, openMenu] = useBoolState();
  const { nukeCache } = useContext(BraindamageApiContext);

  const height = Dimensions.get("window").height;

  return (
    <ImageBackground
      source={{ uri: "https://iili.io/30TXeI.jpg" }}
      style={tw("w-full flex", {
        height: height,
        maxHeight: height,
      })}
    >
      {showMenu ? (
        <Menu closeMenu={closeMenu} />
      ) : (
        <View style={tw("w-full flex flex-1 bg-gray-900 bg-opacity-60")}>
          <View style={tw("flex flex-row px-4 pb-1 pt-4")}>
            <TouchableOpacity
              style={tw("mr-4 pt-1 text-blue-200 absolute top-4 right-4")}
              onPress={openMenu}
            >
              <Icon size={16} name="ellipsis-v" color={getColor("blue-300")} />
            </TouchableOpacity>
            <TouchableOpacity
              style={tw("mr-4 pt-1 text-blue-200 absolute top-4 right-12")}
              onPress={nukeCache}
            >
              <Icon size={16} name="refresh" color={getColor("blue-300")} />
            </TouchableOpacity>
            <Text style={tw("text-blue-300 pt-1")}>{title}</Text>
          </View>
          <View style={tw("flex flex-1 p-4")}>{children}</View>
        </View>
      )}
    </ImageBackground>
  );
}
