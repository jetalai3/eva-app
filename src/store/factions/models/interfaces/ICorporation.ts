import { ICeo } from "./ICeo";

export interface ICorporation {
    id: number;
    name: string;
    member_count: number;
    ceo_id: number;
    ceo: Partial<ICeo>;
    description: string;
};
