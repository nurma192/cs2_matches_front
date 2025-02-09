import {MAPS} from "../consts/maps";
import type {Match, Player} from "../types/types";
import {FaAngleRight, FaTrophy} from "react-icons/fa";
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
            <div className="hidden w-[120px] xs:block">
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
                <div className="md:flex flex-col hidden">
                    <h3 className={"text-gray"}>Команды</h3>
                    <div className="flex">
                        <div className="flex items-center gap-1">
                            {team1.winRounds >= 13 && <FaTrophy fill={"#63b44b"} className={"w-[17px] h-[17px]"}/>}
                            <p className="font-bold">{team1.name}</p>
                        </div>
                        -
                        <div className="flex items-center gap-1">
                            <p className="font-bold">{team2.name}</p>
                            {team2.winRounds >= 13 && <FaTrophy fill={"#63b44b"} className={"w-[17px] h-[17px]"}/>}
                        </div>
                    </div>
                </div>

                {/*<div className="hidden items-center justify-center gap-2 w-[350px] xl:flex">*/}
                {/*    <div className="flex flex-col items-center">*/}
                {/*        <div className="flex items-center gap-2">*/}
                {/*        <p className={'text-center text-gray font-bold'}>{team1.name}</p>*/}
                {/*        </div>*/}
                {/*        <div className="flex gap-2">*/}
                {/*            {team1.players.map((player: Player) => (*/}
                {/*                <Avatar size={"sm"} name={player.name} key={player.id}/>*/}
                {/*            ))}*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*    :*/}
                {/*    <div className="flex flex-col items-center">*/}
                {/*        <div className="flex items-center gap-2">*/}
                {/*            <p className={'text-center text-gray font-bold'}>{team2.name}</p>*/}
                {/*        </div>*/}
                {/*        <div className="flex gap-2">*/}
                {/*            {team2.players.map((player: Player) => (*/}
                {/*                <Avatar size={"sm"} name={player.name} key={player.id}/>*/}
                {/*            ))}*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}

                <div className="">
                    <p className={'hidden md:inline text-[10px] md:text-sm'}>{formatTimeAgo(match.createdAt)}</p>
                </div>
            </div>


            <div className="relative flex flex-col items-center gap-2">
                <FaAngleRight className={"transition-all relative right-1 group-hover:right-0"}/>
            </div>

        </div>
    );
}

export default MatchCard;
