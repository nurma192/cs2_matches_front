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
    name: string;
    side: "CT" | "TT";
    winRounds: number;
    players: Player[];
}

export interface Match {
    matchId: number;
    mapId: number;
    timer: number;
    round: number;
    roundsHistory: number[];
    mode: number;
    team1: Team;
    team2: Team;
    killFeed: KillEvent[];
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
    killerId: string;
    victimId: string;
    weaponId: number;
    timestamp: number;
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