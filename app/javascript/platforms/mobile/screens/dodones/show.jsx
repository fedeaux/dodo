import AbstractDodoneShow from "entities/dodones/shows/Abstract";
import AbstractDodoneEdit from "entities/dodones/edits/Abstract";
import { useApiDodone } from "generated/api";
import { Router, Switch, Route, Link } from "lib/router";

export default function DodoneShow(props) {
  const id = props.match.params.id;
  const path = props.match.path;
  const { dodone, isLoading } = useApiDodone(id);

  if (isLoading) return null;

  return (
    <Switch>
      <Route path={`${path}/edit`}>
        <AbstractDodoneEdit dodone={dodone} />
      </Route>
      <Route path="">
        <AbstractDodoneShow dodone={dodone} />
      </Route>
    </Switch>
  );
}
