import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {io, type Socket} from "socket.io-client";
import type {Match, Player} from "../types/types";
import {MAPS} from "../consts/maps";
import {Avatar} from "@nextui-org/react";
import {FaAngleRight} from "react-icons/fa";
import Container from "../components/Container";
import {useLazyGetFinishedMatchesQuery} from "../app/features/matches/matchesApi";
import MatchesCard from "../components/MatchesCard";
import MatchCard from "../components/MatchesCard";

const MainPage: React.FC = () => {
    const [matches, setMatches] = useState<Match[]>([]);
    const navigate = useNavigate();

    const [getAllFinishedMatches, {}] = useLazyGetFinishedMatchesQuery()
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

        getAllFinishedMatches().unwrap().then(res => {
            setFinishedMatches(res)
        })

        return () => {
            socket.disconnect();
        };
    }, []);



    return (
        <Container>
            <div className="min-h-screen p-6">
                <h1 className="text-3xl font-bold mb-4">All Matches</h1>

                <div className="flex flex-col gap-3">
                    {matches.map((match: Match) => {
                        return (
                            <MatchCard match={match}/>
                        );
                    })}
                </div>
                <div className="flex flex-col gap-3">
                    {finishedMatches.map((match: Match) => {
                        return (
                            <MatchCard match={match}/>
                        );
                    })}
                </div>
            </div>
        </Container>
    );
};

export default MainPage;
