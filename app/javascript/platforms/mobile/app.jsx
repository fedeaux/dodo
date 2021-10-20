import Home from "platforms/mobile/screens/home";
import { Router, Switch, Route, Link } from "lib/router";
import UserContext from "lib/UserContext";
import DodoableShow from "platforms/mobile/screens/dodoables/show";
import DodoneShow from "platforms/mobile/screens/dodones/show";
import { useApiDay } from "generated/api";
import BackgroundTimer from "lib/background-timer";

// import Metronome from "experiments/metronome";

export default function App() {
  const { day, isLoading } = useApiDay("today");
  const [homeActiveTab, setHomeActiveTab] = useState("independent");

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = BackgroundTimer.setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => BackgroundTimer.clearInterval(timer);
  }, []);

  if (isLoading) return null;

  return (
    <UserContext.Provider
      value={{ day, currentTime, homeActiveTab, setHomeActiveTab }}
    >
      <Router>
        <Switch>
          <Route path="/dodoables/:id" component={DodoableShow} />
          <Route path="/dodones/:id" component={DodoneShow} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}
