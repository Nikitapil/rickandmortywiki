import * as Url from "url";

export interface ICharacter {
    id: number;
    name:string;
    status:string;
    species:string;
    gender:string;
    origin: IOrigin;
    location: IOrigin;
    image: string;
    episode: IEpisode[];
    type: string;
}
export interface ILocation {
    id: number;
    name:string;
    type:string;
    dimension:string;
    residents:ICharacter[];
}
export interface IEpisode {
    id: number;
    name:string;
    air_date:string;
    episode:string;
    characters:ICharacter[];
}
export interface ISingleParams {
    pageType: string;
    id:string;
}
interface IOrigin {
    name: string;
    url: string;
}
