import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { baseUrl } from '../../../../environments/environment.development';
import { APIS } from '../../../../app/core/constants/apis.constant';
@Injectable()
export class UsersService {
  constructor(private http: HttpClient) {}

  getUsers(page: number) {
    return this.http.get((baseUrl+APIS.users), {params: {page}}).pipe(map((data: any) => data));
  }

  getUserDetails(userId: string) {
    return this.http.get(baseUrl+APIS.users+'/'+userId).pipe(map((data: any) => data.data));
  }
}