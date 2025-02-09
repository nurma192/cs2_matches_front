import {WEAPONS} from "../consts/weapons";
import type {Match} from "../types/types";
import { Tooltip } from '@nextui-org/react';

type Props = {
    match: Match
}

function RoundsHistory({match}: Props) {
    return (
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
                                    key={killEvent.killerName + killEvent.victimName + killEvent.timestamp}>
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
    );
}

export default RoundsHistory;
