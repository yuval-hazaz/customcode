import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { Team } from "../api/team/Team";

type Props = { id: string };

export const TeamTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    Team,
    AxiosError,
    [string, string]
  >(["get-/api/teams", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/teams"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/teams"}/${id}`} className="entity-id">
      {data?.symbol && data?.symbol.length ? data.symbol : data?.id}
    </Link>
  );
};
