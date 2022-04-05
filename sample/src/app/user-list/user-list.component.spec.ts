import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { AppModule } from '../app.module';
import { User } from '../bean/user';
import { UserService } from '../user.service';

import { UserListComponent } from './user-list.component';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let service: UserService;
  let fixture: ComponentFixture<UserListComponent>;
  let userServiceSpy : jasmine.SpyObj<UserService>;

  beforeEach(async () => {
   const spy=jasmine.createSpyObj('UserService',['getUserList']);
    await TestBed.configureTestingModule({
       declarations: [ UserListComponent ],
       imports: [
        AppModule
      ],
      providers:[{provide:UserService ,useValue:spy}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    const mockUserList=[{id:1,name:'Thanu',age:44}];
     userServiceSpy.getUserList.and.returnValue(of(mockUserList));     
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Ngoninit should call the service', () => {
    component.ngOnInit();
    expect(component.userList.length).toEqual(1);
    expect(component.userList[0].name).toEqual('Thanu');
  });
});
