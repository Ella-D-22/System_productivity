import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { User } from '../Models/user/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/auth/`);
    }

    getById(id: number) {
        return this.http.get<User>(`${environment.apiUrl}/auth/userId/${id}`);
    }
}
