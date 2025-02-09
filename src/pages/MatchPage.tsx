import {useEffect} from "react";
import {useParams, Link} from "react-router-dom";
import {io, type Socket} from "socket.io-client";
import type {Match, Player} from "../types/types";
import {useAppDispatch, useAppSelector} from '../app/hooks';
import {setMatch, updateMatch} from "../store/matchSlice";
import type {RootState} from "../store/store";
import Container from "../components/Container";
import { Avatar } from "@nextui-org/react";
import {StatsTable} from "../components/StatsTable";

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
                    <div className="w-full flex justify-between mb-5">
                        <h2 className={"text-2xl font-bold"}>{match.team1.name}</h2>
                        <h2 className={"text-2xl font-bold"}>{match.team2.name}</h2>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex gap-4 items-center">
                            {team1.players.map((player: Player) => (
                                <div className="flex flex-col items-center " key={player.id}>
                                    <Avatar size={'lg'} name={player.name} className={"w-[80px] h-[80px]"}/>
                                    <p>{player.name}</p>
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <p className="text-[40px] font-bold">{team1.winRounds} : {team2.winRounds}</p>
                            <div className="flex flex-col items-center">
                                <p>1-я полавина</p>
                                <p>timer</p>
                            </div>
                        </div>
                        <div className="flex gap-4 items-center">
                            {team2.players.map((player: Player) => (
                                <div className="flex flex-col items-center" key={player.id} >
                                    <Avatar size={'lg'} name={player.name} className={"w-[80px] h-[80px]"}/>
                                    <p>{player.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-5">
                        <StatsTable team={team1} />
                        <div className="">
                            {match.roundsHistory.join(",")}
                        </div>
                        <StatsTable team={team2} />
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
