import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { AppModule } from './app.module';
import { User } from './bean/user';

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  beforeEach(() => {
    let spy= jasmine.createSpyObj('HttpClinet',['get']);
    TestBed.configureTestingModule({
      imports: [
        AppModule,HttpClientModule
      ],
      providers:[{provide :HttpClient,useValue: spy}]
    });
    service = TestBed.inject(UserService);    
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should be call the Http Client', () => { 
    httpClientSpy=TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;   
    const mockUserList=[{id:1,name:'Thanu',age:44}];
    //spyOn(HttpClient,'get').and.returnValue(of(mockUserList));
    httpClientSpy.get.and.returnValue(of(mockUserList));
    let userList:User[];
    service.getUserList().subscribe(list =>{
      userList =list;
      expect(userList[0].name).toEqual('Thanu');
    });   
    expect(httpClientSpy.get).toHaveBeenCalled();   
  });
});
