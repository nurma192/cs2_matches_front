import {api} from "../../api";
import type {Match} from "../../../types/types";

export const matchesApi = api.injectEndpoints({
    endpoints: build => ({
        getFinishedMatches: build.query<Match[], void>({
            query: body => ({
                url: "matches/finished",
                method: "GET",
            })
        }),
    })
})

export const {useGetFinishedMatchesQuery, useLazyGetFinishedMatchesQuery} = matchesApi