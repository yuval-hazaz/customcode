import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { Group } from "../api/group/Group";

type Props = { id: string };

export const GroupTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    Group,
    AxiosError,
    [string, string]
  >(["get-/api/groups", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/groups"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/groups"}/${id}`} className="entity-id">
      {data?.name && data?.name.length ? data.name : data?.id}
    </Link>
  );
};
