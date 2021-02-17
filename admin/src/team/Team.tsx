import * as React from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery, useMutation } from "react-query";
import { Formik } from "formik";
import pick from "lodash.pick";

import {
  Form,
  EnumFormStyle,
  Button,
  FormHeader,
  Snackbar,
  EnumButtonStyle,
  TextField,
} from "@amplication/design-system";

import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { CitySelect } from "../city/CitySelect";
import { UserSelect } from "../user/UserSelect";
import { Team as TTeam } from "../api/team/Team";
import { TeamUpdateInput } from "../api/team/TeamUpdateInput";

export const Team = (): React.ReactElement => {
  const match = useRouteMatch<{ id: string }>("/teams/:id/");
  const id = match?.params?.id;
  const history = useHistory();

  const { data, isLoading, isError, error } = useQuery<
    TTeam,
    AxiosError,
    [string, string]
  >(["get-/api/teams", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/teams"}/${id}`);
    return response.data;
  });

  const [deleteEntity] = useMutation<TTeam, AxiosError>(
    async (data) => {
      const response = await api.delete(`${"/api/teams"}/${id}`, data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push("//teams");
      },
    }
  );

  const [
    update,
    { error: updateError, isError: updateIsError, isLoading: updateIsLoading },
  ] = useMutation<TTeam, AxiosError, TeamUpdateInput>(async (data) => {
    const response = await api.patch(`${"/api/teams"}/${id}`, data);
    return response.data;
  });

  const handleSubmit = React.useCallback(
    (values: TeamUpdateInput) => {
      void update(values);
    },
    [update]
  );

  useBreadcrumbs(match?.url, data?.symbol);

  const handleDelete = React.useCallback(() => {
    void deleteEntity();
  }, [deleteEntity]);

  const errorMessage =
    updateError?.response?.data?.message || error?.response?.data?.message;

  const initialValues = React.useMemo(
    () => pick(data, ["city", "symbol", "users"]),
    [data]
  );

  if (isLoading) {
    return <span>Loading...</span>;
  }

  return (
    <>
      {data && (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form
            formStyle={EnumFormStyle.Horizontal}
            formHeaderContent={
              <FormHeader
                title={`${"team"} ${
                  data?.symbol && data?.symbol.length ? data.symbol : data?.id
                }`}
              >
                <Button
                  type="button"
                  disabled={updateIsLoading}
                  buttonStyle={EnumButtonStyle.Secondary}
                  icon="trash_2"
                  onClick={handleDelete}
                >
                  Delete
                </Button>
                <Button type="submit" disabled={updateIsLoading}>
                  Save
                </Button>
              </FormHeader>
            }
          >
            <div>
              <CitySelect label="city" name="city.id" />
            </div>
            <div>
              <TextField label="symbol" name="symbol" />
            </div>
            <div>
              <UserSelect label="users" name="users.id" />
            </div>
          </Form>
        </Formik>
      )}
      <Snackbar open={isError || updateIsError} message={errorMessage} />
    </>
  );
};
