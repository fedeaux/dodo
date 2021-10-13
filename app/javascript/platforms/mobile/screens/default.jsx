import { ImageBackground, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Button from "ui/controls/button";
import useBoolState from "util/useBoolState";
import ENV from "env";

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
      <Button label="Reload" />
      {ENV.PLATFORM == "web" && <Button label="Use Web" onClick={useWeb} />}
    </View>
  );
}

export default function DefaultScreen({ children, title = null }) {
  const [showMenu, closeMenu, openMenu] = useBoolState();

  return (
    <ImageBackground
      source={{ uri: "https://iili.io/30TXeI.jpg" }}
      style={{ width: "100%", height: "100%" }}
      style={tw("w-full h-full")}
    >
      {showMenu ? (
        <Menu closeMenu={closeMenu} />
      ) : (
        <View style={tw("w-full h-full flex-col bg-gray-900 bg-opacity-60")}>
          <View style={tw("flex flex-row px-4 pb-1 pt-4")}>
            <TouchableOpacity
              style={tw("mr-4 pt-1 text-blue-200 absolute top-4 right-2 pl-4")}
              onPress={openMenu}
            >
              <Icon size={18} name="ellipsis-v" />
            </TouchableOpacity>
            <Text style={tw("text-blue-300 pt-1")}>{title}</Text>
          </View>
          <View style={tw("flex-grow p-4")}>{children}</View>
        </View>
      )}
    </ImageBackground>
  );
}
