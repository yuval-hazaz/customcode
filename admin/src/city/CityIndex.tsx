import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { CityList } from "./CityList";
import { CreateCity } from "./CreateCity";
import { City } from "./City";

export const CityIndex = (): React.ReactElement => {
  useBreadcrumbs("/cities/", "cities");

  return (
    <Switch>
      <PrivateRoute exact path={"/cities/"} component={CityList} />
      <PrivateRoute path={"/cities/new"} component={CreateCity} />
      <PrivateRoute path={"/cities/:id"} component={City} />
    </Switch>
  );
};
