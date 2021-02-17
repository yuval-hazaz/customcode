import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { GroupList } from "./GroupList";
import { CreateGroup } from "./CreateGroup";
import { Group } from "./Group";

export const GroupIndex = (): React.ReactElement => {
  useBreadcrumbs("/groups/", "groups");

  return (
    <Switch>
      <PrivateRoute exact path={"/groups/"} component={GroupList} />
      <PrivateRoute path={"/groups/new"} component={CreateGroup} />
      <PrivateRoute path={"/groups/:id"} component={Group} />
    </Switch>
  );
};
