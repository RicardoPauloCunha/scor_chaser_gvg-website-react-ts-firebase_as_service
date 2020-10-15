export interface Guild {
    name: string;
    email_recovery: string;
    players: string[];
}

export interface KeysGuild {
    uid_guild: string;
    key_member: string;
    key_admin: string;
}

export interface ResultGvgs {
    adversary_guild: string;
    points: number;
    result: string;
    stars: number;
    start_date: string;
    players_points: PlayerPoints[];
}

export interface PlayerPoints {
    name_player: string;
    atk_point: number;
    dfs_point: number;
}

