import {useEffect} from "react";
import {useParams, Link} from "react-router-dom";
import {io, type Socket} from "socket.io-client";
import type {Match} from "../types/types";
import {useAppDispatch, useAppSelector} from '../app/hooks';
import {setMatch, updateMatch} from "../store/matchSlice";
import type {RootState} from "../store/store";
import Container from "../components/Container";

const MatchPage: React.FC = () => {
    const {id} = useParams();
    const dispatch = useAppDispatch()

    const match = useAppSelector((state: RootState) => state.match.match);

    useEffect(() => {
        if (!id) return;

        fetch(`http://localhost:4000/matches/${id}`)
            .then((res) => res.json())
            .then((data) => {
                dispatch(setMatch(data));
            })
            .catch((err) => console.error(err));

        const socket: Socket = io("http://localhost:4000");

        socket.on("matchUpdate", (updatedMatch: Match) => {
            if (updatedMatch.matchId === id) {
                dispatch(updateMatch(updatedMatch));
            }
        });

        return () => {
            socket.disconnect();
        };
    }, [id]);

    if (!match) {
        return (
            <div className="bg-gray-100 p-6">
                <Link
                    to="/"
                    className="inline-block mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Back to Main
                </Link>
                <p>Loading match data...</p>
            </div>
        );
    }

    const {team1, team2, round, timer, mapId, matchId, killFeed} = match;

    return (
        <Container>
            <div className="bg-gray-100">
                <Link
                    to="/"
                    className="inline-block mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Back to Main
                </Link>

                <div className="py-4 rounded shadow-md">
                    <h1 className="text-2xl font-bold mb-4">Match Details</h1>
                    <p className="mb-2">Match ID: {matchId}</p>
                    <p className="mb-2">Map ID: {mapId}</p>
                    <p className="mb-2">Round: {round} | Timer: {timer}</p>
                    <p className="mb-2">
                        Score: Team1 ({team1.winRounds}) : Team2 ({team2.winRounds})
                    </p>

                    <div className="flex flex-col md:flex-row gap-6 mt-6">
                        <div className="flex-1">
                            <h2 className="text-xl font-semibold mb-2">
                                Team1 - {team1.side}
                            </h2>
                            <div className="space-y-2">
                                {team1.players.map((player) => (
                                    <div
                                        key={player.id}
                                        className="border-b pb-2 flex items-center justify-between"
                                    >
                                        <div>
                                            <span className="font-medium">{player.name}</span>{" "}
                                            {player.dead && (
                                                <span className="text-red-500 ml-2">DEAD</span>
                                            )}
                                            <div className="text-sm text-gray-600">
                                                Kills: {player.kills}, Deaths: {player.deaths}, KD:{" "}
                                                {player.kd}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex-1">
                            <h2 className="text-xl font-semibold mb-2">
                                Team2 - {team2.side}
                            </h2>
                            <div className="space-y-2">
                                {team2.players.map((player) => (
                                    <div
                                        key={player.id}
                                        className="border-b pb-2 flex items-center justify-between"
                                    >
                                        <div>
                                            <span className="font-medium">{player.name}</span>{" "}
                                            {player.dead && (
                                                <span className="text-red-500 ml-2">DEAD</span>
                                            )}
                                            <div className="text-sm text-gray-600">
                                                Kills: {player.kills}, Deaths: {player.deaths}, KD:{" "}
                                                {player.kd}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {killFeed && killFeed.length > 0 && (
                        <div className="mt-6">
                            <h3 className="text-xl font-semibold">Killfeed</h3>
                            <div className="bg-gray-50 p-3 rounded mt-2 max-h-64 overflow-auto">
                                {[...killFeed].reverse().map((kf) => {
                                    const allPlayers = [...team1.players, ...team2.players];
                                    const killer = allPlayers.find((p) => p.id === kf.killerId);
                                    const victim = allPlayers.find((p) => p.id === kf.victimId);
                                    return (
                                        <div key={kf.timestamp} className="text-sm my-1">
                                            <span className="font-medium text-red-500">{killer?.name}</span>{" "}
                                            killed{" "}
                                            <span className="font-medium text-blue-600">
                      {victim?.name}
                    </span>{" "}
                                            with weapon {kf.weaponId} at{" "}
                                            {new Date(kf.timestamp).toLocaleTimeString()}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </Container>
    );
};

export default MatchPage;
