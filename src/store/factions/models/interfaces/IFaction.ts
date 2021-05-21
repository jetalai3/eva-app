import { ICorporation } from "./ICorporation";

export interface IFaction {
    corporation_id: number;
    corporation: Partial<ICorporation>,
    description: string;
    name: string;
    solar_system_name: string;
    solar_system_id: number;
};
