import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import { io, type Socket } from "socket.io-client";
import type { Match } from "../types/types";
import MyButton from "../components/ui/MyButton";

const MainPage: React.FC = () => {
    const [matches, setMatches] = useState<Match[]>([]);
    const navigate = useNavigate();

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

        return () => {
            socket.disconnect();
        };
    }, []);

    const handleTODetailsClicked = (matchId: string) => {
        navigate(`/match/${matchId}`)
    }

    const handleCreateMatchClicked = () => {
        navigate(`/create`)
    }

    return (
        <div className="min-h-screen p-6">
            <h1 className="text-3xl font-bold mb-4">Main Menu  (All Matches)</h1>

            <MyButton color={"secondary"}
                      onClick={() => handleCreateMatchClicked()}>
                Create a New Match
            </MyButton>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {matches.map((match) => {
                    const { matchId, mapId } = match;
                    const team1Score = match.team1.winRounds;
                    const team2Score = match.team2.winRounds;

                    return (
                        <div
                            key={matchId}
                            className="bg-white shadow-md rounded p-4 flex flex-col justify-between"
                        >
                            <div>
                                <h2 className="text-xl font-semibold">
                                    Match ID: {matchId.slice(0, 8)}...
                                </h2>
                                <p className="text-gray-700">Map ID: {mapId}</p>
                                <p className="text-gray-700">
                                    Score: {team1Score} : {team2Score}
                                </p>
                                <p className="text-gray-700">Round: {match.round}</p>
                            </div>


                            <MyButton className={"bg-red-500"} color={"primary"} onClick={() => handleTODetailsClicked(matchId)}>
                                    Go to Details
                            </MyButton>


                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MainPage;
