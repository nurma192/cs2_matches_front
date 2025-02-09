import {api} from "../../api";
import type {CreateMatchParams, Match} from "../../../types/types";

export const matchesApi = api.injectEndpoints({
    endpoints: build => ({
        getFinishedMatches: build.query<Match[], void>({
            query: body => ({
                url: "matches/finished",
                method: "GET",
            })
        }),
        createMatches: build.mutation<Match, CreateMatchParams>({
            query: body => ({
                url: "matches",
                method: "POST",
                body: body
            })
        })
    })
})

export const {useGetFinishedMatchesQuery, useLazyGetFinishedMatchesQuery, useCreateMatchesMutation} = matchesApi