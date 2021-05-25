import { IRace } from "../races/IRace";

export interface ICeo {
    id: number;
    name: string;
    birthday: Date;
    race?: IRace;
    race_id: number;
};
