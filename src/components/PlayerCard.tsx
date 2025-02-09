import type {Player} from "../types/types";
import { Avatar } from '@nextui-org/react';
type Props = {
    player: Player;
}
function PlayerCard({player}: Props) {
    return (
        <div className="flex flex-col items-center " key={player.id}>
            <Avatar size={'lg'} name={player.name} className={"w-[50px] h-[50px] xs:w-[75px] xs:h-[75px]"}/>
            <p>{player.name}</p>
        </div>
    );
}

export default PlayerCard;
