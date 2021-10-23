import AbstractDodoableShow from "entities/dodoables/shows/Abstract";
import Drexecutor from "components/drexecutor";
import { useApiDodoable } from "generated/api";
import { Router, Switch, Route, Link } from "lib/router";

export default function DodoableShow(props) {
  const id = props.match.params.id;
  const path = props.match.path;
  const { dodoable, isLoading } = useApiDodoable(id);

  if (isLoading) return null;

  return (
    <Switch>
      <Route path={`${path}/execute`}>
        <Drexecutor dodoable={dodoable} />
      </Route>
      <Route path="">
        <AbstractDodoableShow dodoable={dodoable} />
      </Route>
    </Switch>
  );
}
