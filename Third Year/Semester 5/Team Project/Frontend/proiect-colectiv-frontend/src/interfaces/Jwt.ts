import {JwtPayload} from 'jwt-decode';

export interface Jwt extends JwtPayload {
  nameid?: string;
}