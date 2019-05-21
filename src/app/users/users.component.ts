 import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { UsersService } from './users.service';
import { User } from './user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  constructor(private usersService:UsersService, private renderer:Renderer2) { }
  users:User[] = [];
  editUserRow:boolean = false;
  @ViewChild('tableRow') rowElement:ElementRef;
  ngOnInit() {
    this.usersService.getUsers().subscribe(
      res=>{
        res.forEach(user => {
          user.editUserRow = true;
          this.users.push(user);          
        });
      }
    )
  }

  edit(user){
    user.editUserRow = false;
  }

  save(user, ...args){
    if (user._id) {
      let newUser: User = new User();
      
      newUser._id = user._id;
      args.forEach(ele => {
        if (ele.dirty) {
          let key = ele.name;
          let value = ele.viewModel;
          newUser[key] = value;
        }
      })
      user.editUserRow = true;
      this.usersService.updateUser(newUser).subscribe(
        res => console.log(`response after patch ${JSON.stringify(res)}`)
      );
    }else{
      user.editUserRow = true;
      this.usersService.addUser(user).subscribe(
        res=>console.log(`response after post ${JSON.stringify(res)}`)
      )
    }
    

  }

  add(){
    let user:User = new User();
    user.editUserRow = false;
    this.users.push(user);
   /*  const row = this.renderer.createElement("tr");
    const col = this.renderer.createElement("td");
    this.renderer.appendChild(row,col);
    this.renderer.appendChild(this.rowElement.nativeElement,row);   */
    console.log(this.users);
  }

  cancel(user){
    user.editUserRow = true;
  }
  delete(user){
    this.usersService.deleteUser(user).subscribe(
      res=>{
        for(var i = 0; i<this.users.length; i++){
          if(this.users[i]._id === user._id ){
            this.users.splice(i,1)
          }
        }
      }
    )
  }
}


