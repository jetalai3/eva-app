import { IRace } from "./IRace";

export interface ICeo {
    id: number;
    name: string;
    birthday: Date;
    race?: IRace;
    race_id: number;
};
