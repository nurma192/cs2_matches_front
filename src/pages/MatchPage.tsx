import {useEffect} from "react";
import {useParams, Link} from "react-router-dom";
import {io, type Socket} from "socket.io-client";
import type {Match, Player} from "../types/types";
import {useAppDispatch, useAppSelector} from '../app/hooks';
import {setMatch, updateMatch} from "../store/matchSlice";
import type {RootState} from "../store/store";
import Container from "../components/Container";
import {StatsTable} from "../components/StatsTable";
import {WEAPONS} from "../consts/weapons";

import { FaTrophy } from "react-icons/fa";
import RoundsHistory from "../components/RoundsHistory";
import PlayerCard from "../components/PlayerCard";

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
    useEffect(() => {
        if (match) {
            console.log(match)
        }
    }, [match]);

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
                    <div className="flex flex-col 2xl:flex-row justify-between items-center">
                        <div className="hidden xs:flex gap-4 items-center">
                            {team1.players.map((player: Player) => (
                                <PlayerCard player={player} key={player.id} />
                            ))}
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <div className="flex items-center gap-2">
                                {team1.winRounds >= 13 && <FaTrophy fill={"#63b44b"} className={"w-[35px] h-[35px]"}/>}
                                <p className="text-[40px] font-bold">{team1.winRounds} : {team2.winRounds}</p>
                                {team2.winRounds >= 13 && <FaTrophy fill={"#63b44b"} className={"w-[35px] h-[35px]"}/>}
                            </div>
                            <div className="flex flex-col items-center">
                                <p>{!match.finished ? (match.round < 13 ? "1-я полавина" : "2-я полавина") : `Winners ${team1.winRounds >= 13 ? team1.name : team2.name}`}</p>
                                {/*<p>timer</p>*/}
                            </div>
                        </div>
                        <div className="hidden xs:flex gap-4 items-center">
                            {team2.players.map((player: Player) => (
                                <PlayerCard player={player} key={player.id} />
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-5">
                        <StatsTable team={team1}/>
                        <RoundsHistory match={match} />
                        <StatsTable team={team2}/>
                    </div>


                    {killFeed && killFeed.length > 0 && (
                        <div className="mt-6">
                            <h3 className="text-xl font-semibold">Last 15 kills:</h3>
                            <div
                                className="bg-gray-50 flex flex-col gap-2 items-start p-3 rounded mt-2 max-h-80 overflow-auto">
                                {[...killFeed].reverse().map((killEvent) => (
                                    <div
                                        className={'flex gap-3 items-start bg-secondary border-2 border-danger justify-between p-2 rounded'}
                                        key={killEvent.killerName + killEvent.victimName + killEvent.timestamp}>
                                        <p className={`${killEvent.killerSide === "CT" ? "text-ct" : "text-tt"} font-bold`}>{killEvent.killerName}</p>
                                        <img className={"h-[20px] text-white"}
                                             src={`/images/weapons/svg_normal/${WEAPONS[killEvent.weaponId].svgIcon}`}
                                             alt={killEvent.weaponId + ""}/>
                                        <p className={`${killEvent.victimSide === "CT" ? "text-ct" : "text-tt"} font-bold`}>{killEvent.victimName}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </Container>
    );
};

export default MatchPage;
