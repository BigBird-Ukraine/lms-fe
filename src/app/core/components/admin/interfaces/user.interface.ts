import {GroupModel} from './GroupModel';

export interface IUser {
    _id: string;
    email: string;
    name: string;
    surname: string;
    phone_number: string;
    role_id: number;
    status_id: number;
    created_at: Date;
    updated_at?: string;
    photo_path?: string;
    group?: GroupModel[];
    passed_test_id?: string; // for future
}
