import {createApi} from "@reduxjs/toolkit/query/react";

import {AppConfig} from "../../AppConfig";
import type {IPaginatedRequestDTO} from "../../submodules/interfaces/dto/common/ipaginated-request.interface";
import type {IGetAllUpworkFeedRequest} from "../../submodules/interfaces/dto/upwork-feed/iget-all-upwork-feed-request.interface";
import type {IUpworkFeedDetailItemDTO} from "../../submodules/interfaces/dto/upwork-feed/iupwork-feed-detail-item.dto";
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
    getFeedsDetail: builder.mutation<{data: IUpworkFeedDetailItemDTO}, {id?: string}>({
      query: ({id}) => ({
        url: `${AppConfig.Feeds}/${id}`,
        method: HTTP_METHODS.GET,
      }),
    }),
  }),
});

export const {useGetFeedsMutation, useGetFeedsDetailMutation} = upworkFeedsApi;
