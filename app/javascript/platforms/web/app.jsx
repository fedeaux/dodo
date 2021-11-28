import DaysIndex from "platforms/web/screens/home";
import WeeksIndex from "platforms/web/screens/weeks";
import { Router, Switch, Route, Link } from "lib/router";
import UserContext from "lib/UserContext";
import BackgroundTimer from "lib/background-timer";

// Stolen from mobile
import DodoableShow from "platforms/mobile/screens/dodoables/show";
import DodoneShow from "platforms/mobile/screens/dodones/show";

export default function App() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = BackgroundTimer.setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => BackgroundTimer.clearInterval(timer);
  }, []);

  return (
    <UserContext.Provider value={{ currentTime }}>
      <Router>
        <Switch>
          <Route path="/dodoables/:id" component={DodoableShow} />
          <Route path="/dodones/:id" component={DodoneShow} />
          <Route path="/days" component={DaysIndex} />
          <Route path="/" component={WeeksIndex} />
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}
