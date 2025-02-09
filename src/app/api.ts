import {fetchBaseQuery, retry} from "@reduxjs/toolkit/query/react";
import {BASE_URL} from "../constants";
import {createApi} from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl: `${BASE_URL}/`,
})

const baseQueryWithRetry = retry(baseQuery, {maxRetries: 1})

export const api = createApi({
    reducerPath: "baseApi",
    baseQuery: baseQueryWithRetry,
    endpoints: () => ({}),
})