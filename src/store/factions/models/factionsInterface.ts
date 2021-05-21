export interface ICeo {
    id: number;
    name: string;
    birthday: Date;
    race_id: number;
    race_name: string;
}

export interface ICorporation {
    id: number;
    name: string;
    member_count: number;
    ceo_id: number;
    ceo: Partial<ICeo>;
    description: string;
}

export interface IFaction {
    corporation_id: number;
    corporation: Partial<ICorporation>,
    description: string;
    name: string;
    solar_system_name: string;
    solar_system_id: number;
};
