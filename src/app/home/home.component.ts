import { getLocaleDateFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public userCheck!:number;
  public adminCheck = false;
  public addPostCheck = false;
  public clickCheck = false;
  public signInCheck = false;
  public signUpCheck = false;
  public editCheck = false;
  public Sign = true;
  public userName!: string;
  public block1 = false;
  public block2 = false;
  public email!: string;
  public password!: string;
  public UserName!: string;
  public postText!: string;
  public title!:string;
  public test1 = /^[a-zA-Z]{4,15}$/;
  public test2 = /^[\w.\-_]{4,15}$/;
  public test3 = /^[\w\-.]+@[a-z.]+$/;
  public postNum!:number;
  public date=new Date()
  clear() {
    this.password = "";
    this.email = "";
    this.UserName = "";
  }
  signIn() {
    this.signInCheck = true;
    this.clickCheck = true;
    this.block2 = true;
  }
  signUp() {
    this.signUpCheck = true;
    this.clickCheck = true;
    this.block1 = true;
  }
  close() {
    this.clickCheck = false;
    this.addPostCheck = false;
    this.editCheck = false;
    this.signInCheck = false;
    this.signUpCheck = false;
    this.block1 = false;
    this.block2 = false;
    this.email="";
    this.password="";
    this.UserName="";
    this.title="";
    this.postText="";
  }
  submitIn() {
    let check=0;
    for (const info of this.service.users) {
      check++;
      if (this.email == info.email && this.password == info.password) {
        if (info.userName == "admin") {
          this.adminCheck = true;
        }
        this.close();
        this.Sign = false;
        this.userName = info.userName;
        this.userCheck=info.id
        break;
      }
      else if(check==this.service.users.length){
        alert("Ви ввели неправильний імейл або пароль")
        console.log(this.service.users)
      }
    }
  }
  submitUp() {
    let check = 0;
    if (this.test1.test(this.UserName) && this.test2.test(this.password) && this.test3.test(this.email)) {
      for (const info of this.service.users) {
        if (info.userName == this.UserName || info.email == this.email) {
          alert("Такий нік-нейм чи імейл вже був зареєстрований")
          break;
        }
        else{
          check++;
          if (check == this.service.users.length) {
            this.Sign = false;
            let info = {
              id: this.service.blogs.length,
              userName: this.UserName,
              email: this.email,
              password: this.password
            }
            this.userCheck=info.id
            this.service.addUser(info);
            this.userName = this.UserName;
            this.close();
            break;
          }
        }
      }
    }

    else {
      alert("Ви щось ввели неправильно")
    }
  }
  addPost() {
    this.addPostCheck = true;
    this.clickCheck = true;
    this.block2 = true;
  }
  getDate(){
    let h:any=this.date.getHours();
    let m:any=this.date.getMinutes();
    let day:any=this.date.getDate();
    let month:any=this.date.getMonth();
    let year:any=this.date.getFullYear();
    if (day < 10) day = '0' + day;
    if (month==0) month++;
    if (month < 10) month = '0' + month;
    if (year < 10) year = '0' + year;
    if (h < 10) h = '0' + h;
    if (m < 10) m = '0' + m;
    let date=`${h}:${m}, ${day}.${month}.${year}`
    return date;
  }
  post(){
    if(this.postText!=="" && this.title!==""){
    let blog={
      id:this.service.blogs.length,
      postedBy:this.userName,
      topic:this.title,
      date:this.getDate(),
      message:this.postText
    }
    console.log(this.postText)
    this.service.addPost(blog);
    this.close();
    }
    else{
      alert("Введіть текст в обидва поля")
    }
  }
  signOut() {
    this.Sign = true;
    this.adminCheck=false
    this.userCheck=0;
  }
  edit(index:number){
    this.editCheck=true;
    this.clickCheck=true;
    this.title=this.service.blogs[index].topic;
    this.postText=this.service.blogs[index].message;
    this.postNum=index;
  }
  editPost(){
    this.service.blogs[this.postNum].topic=this.title;
    this.service.blogs[this.postNum].message=this.postText;
    this.service.blogs[this.postNum].date=this.getDate();
    this.close();
  }
  delete(index:number){
    this.service.blogs.splice(index,1)
    this.close()
  }
  constructor(public service: ServiceService) {
  }
  public blogs = this.service.blogs;
  ngOnInit(
  ): void {
  }

}
