import {useEffect} from "react";
import {useParams, Link} from "react-router-dom";
import {io, type Socket} from "socket.io-client";
import type {Match, Player} from "../types/types";
import {useAppDispatch, useAppSelector} from '../app/hooks';
import {setMatch, updateMatch} from "../store/matchSlice";
import type {RootState} from "../store/store";
import Container from "../components/Container";
import {Avatar, Tooltip} from "@nextui-org/react";
import {StatsTable} from "../components/StatsTable";
import {WEAPONS} from "../consts/weapons";

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
                                <div className="flex flex-col items-center" key={player.id}>
                                    <Avatar size={'lg'} name={player.name} className={"w-[80px] h-[80px]"}/>
                                    <p>{player.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-5">
                        <StatsTable team={team1}/>
                        <div className="flex items-center w-full overflow-auto pb-5 gap-1">
                            {match.roundsHistory.map((round) => (
                                <div key={round.round} className={`flex flex-col items-center`}>
                                    <div
                                        className={`flex flex-col px-3 border-b-3 ${round.team1Win ? "border-tt" : "border-transparent"}`}
                                        style={{
                                            background: `${round.team1Win ? "linear-gradient(0deg, rgba(187,151,70,0.2) 1%, rgba(0,212,255,0) 100%)" : ""}`,
                                        }}
                                    >
                                        {round.team1WinRounds}
                                    </div>
                                    <Tooltip content={
                                        <div className={'flex flex-col gap-2 '}>
                                            {round.killEvents.map((killEvent) => (
                                                <div
                                                    className={'flex gap-3 bg-secondary border-2 border-danger justify-between p-2 rounded'}
                                                    key={killEvent.killerName + killEvent.victimName}>
                                                    <p className={`${killEvent.killerSide === "CT" ? "text-ct" : "text-tt"} font-bold`}>{killEvent.killerName}</p>
                                                    <img className={"h-[20px] text-white"}
                                                         src={`/images/weapons/svg_normal/${WEAPONS[killEvent.weaponId].svgIcon}`}
                                                         alt={killEvent.weaponId + ""}/>
                                                    <p className={`${killEvent.victimSide === "CT" ? "text-ct" : "text-tt"} font-bold`}>{killEvent.victimName}</p>
                                                </div>
                                            ))}
                                        </div>
                                    }>
                                        <div
                                            className="rounded-full flex items-center justify-center w-[25px] h-[25px] my-4 bg-white bg-opacity-40 hover:bg-opacity-100 hover:text-black transition cursor-pointer aspect-square">
                                            {round.round}
                                        </div>
                                    </Tooltip>
                                    <div
                                        className={`flex flex-col px-3 border-t-3 ${!round.team1Win ? "border-ct" : "border-transparent"}`}
                                        style={{
                                            background: `${!round.team1Win ? "linear-gradient(180deg, rgba(108,155,201,0.3) 1%, rgba(0,212,255,0) 100%)" : ""}`,
                                        }}
                                    >
                                        {round.team2WinRounds}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <StatsTable team={team2}/>
                    </div>


                    {killFeed && killFeed.length > 0 && (
                        <div className="mt-6">
                            <h3 className="text-xl font-semibold">Last 15 kills:</h3>
                            <div className="bg-gray-50 flex flex-col gap-2 items-start p-3 rounded mt-2 max-h-80 overflow-auto">
                                {[...killFeed].reverse().map((killEvent) => (
                                    <div
                                        className={'flex gap-3 items-start bg-secondary border-2 border-danger justify-between p-2 rounded'}
                                        key={killEvent.killerName + killEvent.victimName}>
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
