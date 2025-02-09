import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import type { Team } from "../types/types";

type Props = {
    team: Team
}

function StatsTable({ team }: Props): JSX.Element {
    const sortedPlayers = [...team.players].sort((a, b) => {
        const ratioA = a.deaths === 0 ? a.kills : a.kills / a.deaths;
        const ratioB = b.deaths === 0 ? b.kills : b.kills / b.deaths;
        return ratioB - ratioA;
    });

    return (
        <Table
            aria-label="Example static collection table"
            bgcolor="white"
            classNames={{
                wrapper: "bg-transperent",
                tr: "data-[odd=true]:bg-secondary dark:data-[odd=true]:bg-opacity-50",
                th: "bg-secondary bg-opacity-50",
            }}
        >
            <TableHeader>
                <TableColumn>Player</TableColumn>
                <TableColumn>K</TableColumn>
                <TableColumn>D</TableColumn>
                <TableColumn>A</TableColumn>
                <TableColumn>+/-</TableColumn>
                <TableColumn>K/D</TableColumn>
                <TableColumn>HS%</TableColumn>
            </TableHeader>
            <TableBody>
                {sortedPlayers.map((player) => (
                    <TableRow key={player.id}>
                        <TableCell>{player.name}</TableCell>
                        <TableCell>{player.kills}</TableCell>
                        <TableCell>{player.deaths}</TableCell>
                        <TableCell>{player.assists}</TableCell>
                        <TableCell>{player.kills - player.deaths}</TableCell>
                        <TableCell>
                            {Number(
                                (player.deaths === 0 ? player.kills : player.kills / player.deaths).toFixed(2)
                            )}
                        </TableCell>
                        <TableCell>
                            {player.kills !== 0 ? Math.round((player.headshots / player.kills) * 100) : 0}%
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

export { StatsTable };
