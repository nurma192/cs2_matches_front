export interface Player {
    id: string;
    name: string;
    kills: number;
    deaths: number;
    helps: number;
    kd: number;
    dead: boolean;
    weaponId: number;
    moneyCount: number;
}

export interface Team {
    side: "CT" | "TT";
    winRounds: number;
    players: Player[];
}

export interface Match {
    matchId: string;
    mapId: number;
    timer: number;
    round: number;
    roundsHistory: number[];
    team1: Team;
    team2: Team;
    killFeed: KillEvent[]; // <--- добавили массив событий
}
// Параметры для создания матча
export interface CreateMatchParams {
    mapId: number;
    team1: string[];
    team2: string[];
    teamPlayersCount: number;
}

export interface KillEvent {
    killerId: string;
    victimId: string;
    weaponId: number;
    timestamp: number;
}