import UserContext from "lib/UserContext";

export default function useCurrentTime() {
  const { currentTime } = useContext(UserContext);

  return currentTime;
}
