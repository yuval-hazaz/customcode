import * as React from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { AxiosError } from "axios";
import { Formik } from "formik";
import {
  Form,
  EnumFormStyle,
  Button,
  FormHeader,
  Snackbar,
  TextField,
} from "@amplication/design-system";
import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { Group } from "../api/group/Group";
import { GroupCreateInput } from "../api/group/GroupCreateInput";

const INITIAL_VALUES = {} as GroupCreateInput;

export const CreateGroup = (): React.ReactElement => {
  useBreadcrumbs("/groups/new", "Create group");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    Group,
    AxiosError,
    GroupCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/groups", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/groups"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: GroupCreateInput) => {
      void create(values);
    },
    [create]
  );
  return (
    <>
      <Formik initialValues={INITIAL_VALUES} onSubmit={handleSubmit}>
        <Form
          formStyle={EnumFormStyle.Horizontal}
          formHeaderContent={
            <FormHeader title={"Create group"}>
              <Button type="submit" disabled={isLoading}>
                Save
              </Button>
            </FormHeader>
          }
        >
          <div>
            <TextField label="name" name="name" />
          </div>
        </Form>
      </Formik>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
