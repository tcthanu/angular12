import { Component, OnInit } from '@angular/core';
import { User } from '../bean/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  userList:User[]=[];
  constructor(private service:UserService) { }

  ngOnInit(): void {
    this.service.getUserList().subscribe(data => {
      this.userList = data;
    });
  }

}
