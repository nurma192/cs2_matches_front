export interface Player {
    id: string;
    name: string;
    kills: number;
    deaths: number;
    assists: number;
    dead: boolean;
    weaponId: number;
    moneyCount: number;
    headshots: number;
}

export interface Team {
    name: string;
    side: "CT" | "TT";
    winRounds: number;
    players: Player[];
}

export interface Match {
    matchId: string;
    mapId: number;
    timer: number;
    round: number;
    roundsHistory: Round[];
    mode: number;
    team1: Team;
    team2: Team;
    killFeed: KillEvent[];
    finished?: boolean;
    currentRoundKillEvents: KillEvent[];
    createdAt: Date;
}
export interface Round {
    round: number;
    team1Win: boolean;
    team1WinRounds: number;
    team2WinRounds: number;
    killEvents: KillEvent[];
}

export interface CreateMatchParams {
    mapId: number;
    team1: {
        name: string;
        players: string[];
    }
    team2: {
        name: string;
        players: string[];
    }
    teamPlayersCount: number;
}

export interface KillEvent {
    killerName: string;
    killerSide: "CT" | "TT"
    victimName: string;
    victimSide: "CT" | "TT"
    weaponId: number;
    timestamp: number;
    headshot?: boolean;
    assistId?: string;
}


export interface Weapon {
    id: number;
    name: string;
    svgIcon: string;
}

export interface Map {
    id: number;
    name: string;
    image: string;
}

