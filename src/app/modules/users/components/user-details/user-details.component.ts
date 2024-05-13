import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from '../../../../core/services/loading.service';
import { ErrorService } from '../../../../core/services/error.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent {
  public user$!: Observable<User>|null;
  public isLoading$: Observable<boolean>|null = inject(LoadingService).loading$;
  public error$: Observable<string | null> | null = inject(ErrorService).error$;
  
  constructor(private _usersService: UsersService, private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getUser();
    this.getUserId()
  }

  getUser(): void{
    const userId = this.getUserId()
    this.user$ = this._usersService.getUserDetails(userId);   
  }

  getUserId() : string {
     return this._route.snapshot.params?.['id'];
  }

}
