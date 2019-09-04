import { Client } from './client';

export interface UserProfile {
    username: string;
    password: string;
    roles: string;
    person: Client;
}
