import {useEffect, useState} from "react";
import type React from "react";
import {io, type Socket} from "socket.io-client";
import type {Match} from "../types/types";
import {FaSpinner} from "react-icons/fa";
import Container from "../components/Container";
import {useLazyGetFinishedMatchesQuery} from "../app/features/matches/matchesApi";
import MatchCard from "../components/MatchesCard";

const MainPage: React.FC = () => {
    const [matches, setMatches] = useState<Match[]>([]);

    const [getAllFinishedMatches, {isLoading}] = useLazyGetFinishedMatchesQuery()
    const [finishedMatches, setFinishedMatches] = useState<Match[]>([]);


    useEffect(() => {
        const socket: Socket = io("http://localhost:4000");

        socket.on("allMatches", (data: Match[]) => {
            setMatches(data);
        });

        socket.on("matchUpdate", (updatedMatch: Match) => {
            setMatches((prev) =>
                prev.map((m) => (m.matchId === updatedMatch.matchId ? updatedMatch : m))
            );
        });

        getAllFinishedMatches().unwrap()
            .then(res => {
                setFinishedMatches(res)
            })
            .catch(err => {
                console.log(err)
            })

        return () => {
            socket.disconnect();
        };
    }, []);


    return (
        <Container>
            <div className="min-h-screen p-6">
                {matches.length > 0 && <h1 className="text-3xl font-bold mb-4">All Matches</h1>}

                <div className="flex flex-col gap-3">
                    {matches.reverse().map((match: Match) => {
                        return (
                            <MatchCard match={match} key={match.matchId}/>
                        );
                    })}
                </div>
                <div className="flex flex-col gap-3 mt-5">
                    {finishedMatches.length > 0 && <h1 className="text-3xl font-bold mb-4">Finished Matches</h1>}
                    {isLoading && <div className="bg-gray-100 p-6 flex justify-center items-center h-screen">
		                <FaSpinner className="animate-spin text-4xl text-blue-500"/>
	                </div>}
                    {finishedMatches.slice().reverse().map((match: Match) => {
                        return (
                            <MatchCard match={match} key={match.matchId}/>
                        );
                    })}
                </div>
            </div>
        </Container>
    );
};

export default MainPage;
