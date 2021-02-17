import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { City } from "../api/city/City";

type Props = { id: string };

export const CityTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    City,
    AxiosError,
    [string, string]
  >(["get-/api/cities", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/cities"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/cities"}/${id}`} className="entity-id">
      {data?.name && data?.name.length ? data.name : data?.id}
    </Link>
  );
};
