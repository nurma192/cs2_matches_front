import {MAPS} from "../consts/maps";
import type {Match, Player} from "../types/types";
import {FaAngleRight} from "react-icons/fa";
import { Avatar } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import {formatTimeAgo} from "../utils/getData";

type Params = {
    match: Match;
}

function MatchCard({match}:Params) {
    const navigate = useNavigate()
    const {matchId, mapId, mode, team1, team2} = match;

    const handleTODetailsClicked = (matchId: string) => {
        navigate(`/match/${matchId}`)
    }

    return (
        <div
            key={matchId}
            className="bg-secondary text-white shadow-md group rounded p-4 flex items-center cursor-pointer border-3 transition border-transparent hover:border-third"
            onClick={() => handleTODetailsClicked(matchId)}
        >
            <div className="w-[120px]">
                <img src={`/images/maps/${MAPS[mapId].image}`} className={"object-cover rounded-sm"}
                     alt="Mirage"/>
            </div>
            <div className="w-full flex items-center justify-around">
                <div className="flex flex-col ml-2">
                    <h3 className={"text-gray"}>Карта</h3>
                    <p className="">{MAPS[mapId].name}</p>
                </div>
                <div className="flex flex-col ml-2">
                    <h3 className={"text-gray"}>Регион</h3>
                    <p className="">{"Алматы"}</p>
                </div>
                <div className="flex flex-col ml-2">
                    <h3 className={"text-gray"}>Режим</h3>
                    <p className="">{`${mode}v${mode}`}</p>
                </div>
                <div className="flex flex-col">
                    <h3 className={"text-gray"}>Счёт</h3>
                    <p className="">{`${team1.winRounds}-${team2.winRounds}`}</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="">
                        <p className={'text-center text-gray font-bold'}>{team1.name}</p>
                        <div className="flex gap-2">
                            {team1.players.map((player: Player) => (
                                <Avatar size={"sm"} name={player.name} key={player.id}/>
                            ))}
                        </div>
                    </div>
                    :
                    <div className="">
                        <p className={'text-center text-gray font-bold'}>{team2.name}</p>
                        <div className="flex gap-2">
                            {team2.players.map((player: Player) => (
                                <Avatar size={"sm"} name={player.name} key={player.id}/>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="">
                    <p className={'text-sm'}>{formatTimeAgo(match.createdAt)}</p>
                </div>
            </div>


            <div className="relative flex flex-col items-center gap-2">
                <FaAngleRight className={"transition-all relative right-1 group-hover:right-0"}/>
            </div>

        </div>
    );
}

export default MatchCard;
