import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  public blogs:any=[{
    id:1,
    postedBy:"admin",
    topic:"First post",
    date:"19:00, 16.01.2023",
    message:"Admin info: password-1234, email-admin@gmail.com"
  },{
    id:2,
    postedBy:"igor",
    topic:"Second post",
    date:"19:00, 16.01.2023",
    message:"Admin info: password-1234, email-igor@gmail.com"
  }];
  public users:any=[{
    id:1,
    userName:"admin",
    email:"admin@gmail.com",
    password:"1234"
  },
  {
    id:2,
    userName:"igor",
    email:"igor@gmail.com",
    password:"1234"
  }]
  public blog={}
  addUser(info:Object){
    this.users.push(info)
  }
  addPost(info:Object){
    this.blogs.push(info)
  }
  constructor() { }
}
