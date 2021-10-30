import { limitString } from "@/config/constants";
import { Player } from "@/types";

interface PlayerRankProps {
    player: Player;
    no: number;
}

export default function PlayerRank({ player, no }: PlayerRankProps): JSX.Element {
    return (
        <li className="flex items-center space-x-3">
            <span className="font-semibold">{no}.</span>
            <div className="flex items-center space-x-2">
                <span style={{ backgroundColor: player.color }}
                    className="h-10 w-10 rounded-full border border2 border-white shadow uppercase font-semibold grid place-items-center">
                    {player.username[0]}
                </span>
                <h6 className="font-semibold">{limitString(player.username, 21)}</h6>
            </div>
        </li>
    )
}
