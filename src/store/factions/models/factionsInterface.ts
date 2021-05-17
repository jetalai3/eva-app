export interface ICeo {
    name: string;
    birthday: Date;
    race_id: number;
    race_name: string;
}

interface ICorporation {
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
