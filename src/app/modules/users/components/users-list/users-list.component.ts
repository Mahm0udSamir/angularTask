import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserData } from '../../models/user.model';
import { UsersService } from '../../services/users.service';
import { LoadingService } from '../../../../core/services/loading.service';
import { ErrorService } from '../../../../core/services/error.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent {
  public usersData$!: Observable<UserData>|null;
  public user$!: Observable<User>|null;
  public isLoading$: Observable<boolean>|null = inject(LoadingService).loading$;
  public error$: Observable<string|null>|null = inject(ErrorService).error$;
    
  constructor(private _usersService: UsersService) { }
  
  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(currentPage = 1): void {
    this.usersData$ = this._usersService.getUsers(currentPage);
  }
  
  
  onPageChange(page: number): void {
    this.getUsers(page);
  }
  
  onSearchChange(userId: string): void {
    if (userId) {
      this.usersData$ = null;
      this.user$ = this._usersService.getUserDetails(userId);   
    } else {
      this.user$ = null;
      this.getUsers();
    }
  }

}
