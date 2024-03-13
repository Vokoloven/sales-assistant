import {createApi} from "@reduxjs/toolkit/query/react";

import {AppConfig} from "../../AppConfig";
import type {IPaginatedRequestDTO} from "../../submodules/interfaces/dto/common/ipaginated-request.interface";
import type {IGetAllUpworkFeedRequest} from "../../submodules/interfaces/dto/upwork-feed/iget-all-upwork-feed-request.interface";
import {IUpworkResponseListFeedsDto} from "../../submodules/interfaces/dto/upwork-feed/iupwork-response-list-feeds.dto";
import {HTTP_METHODS} from "../utils";

import {baseQuery} from "./utils";

interface IGetAllUpworkFeedRequestWithPages extends IGetAllUpworkFeedRequest, IPaginatedRequestDTO {}

export const upworkFeedsApi = createApi({
  reducerPath: "upworkFeeds",
  baseQuery,
  endpoints: (builder) => ({
    getFeeds: builder.mutation<{data: IUpworkResponseListFeedsDto}, IGetAllUpworkFeedRequestWithPages>({
      query: (credentials) => ({
        url: AppConfig.GetFeed,
        method: HTTP_METHODS.POST,
        body: {...credentials},
      }),
    }),
  }),
});

export const {useGetFeedsMutation} = upworkFeedsApi;
