import React, { useEffect } from "react";
import CanvanBoardContainer from "./CanvanBoardContainer";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useQuery } from "react-query";
import axios, { AxiosResponse } from "axios";
import { useParams } from "react-router-dom";
import { setList } from "../../store/canvan";
import { List } from "../../types";

function CanvanBoard() {
  const dispatch = useAppDispatch();
  const listArray = useAppSelector((state) => state.canvan);
  const params = useParams();
  const { isLoading, isError, data } = useQuery<List[], Error>(
    "List",
    async () => {
      const response: AxiosResponse<List[]> = await axios.get("/list");
      return response.data;
    },
    {
      refetchOnMount: true,
      onSuccess: (data) => {
        dispatch(setList(data));
      },
    }
  );
  useEffect(() => {
    console.log(params);
  }, [params]);
  useEffect(() => {
    console.log(data);
  }, [data]);
  useEffect(() => {}, [listArray]);
  return isLoading ? (
    <div>로딩중입니다.</div>
  ) : isError ? (
    <div>에러입니다.</div>
  ) : (
    <CanvanBoardContainer listArray={listArray} />
  );
}

export default CanvanBoard;
