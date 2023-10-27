import { ITokenData } from "../interfaces/auth.interface";

export type HandleErrorFunction = (statusCode: number, message: string) => void;
export type CheckSuccessfulLoginFunction = (id: string, token: ITokenData) => void;
