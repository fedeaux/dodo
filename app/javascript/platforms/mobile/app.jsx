import Home from "platforms/mobile/screens/home";
import { Router, Switch, Route, Link } from "lib/router";
import UserContext from "lib/UserContext";
import DodoableShow from "platforms/mobile/screens/dodoables/show";
import { useApiDay } from "generated/api";

// import Metronome from "experiments/metronome";

export default function App() {
  const { day, isLoading } = useApiDay("today");

  if (isLoading) return null;

  return (
    <UserContext.Provider value={{ day }}>
      <Router>
        <Switch>
          <Route path="/dodoables/:id" component={DodoableShow} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}
