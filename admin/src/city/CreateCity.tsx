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
import { City } from "../api/city/City";
import { CityCreateInput } from "../api/city/CityCreateInput";

const INITIAL_VALUES = {} as CityCreateInput;

export const CreateCity = (): React.ReactElement => {
  useBreadcrumbs("/cities/new", "Create city");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    City,
    AxiosError,
    CityCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/cities", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/cities"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: CityCreateInput) => {
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
            <FormHeader title={"Create city"}>
              <Button type="submit" disabled={isLoading}>
                Save
              </Button>
            </FormHeader>
          }
        >
          <div>
            <TextField label="name" name="name" />
          </div>
          <div>
            <TextField
              type="number"
              step={1}
              label="population"
              name="population"
            />
          </div>
          <div>
            <TextField label="state" name="state" />
          </div>
        </Form>
      </Formik>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
