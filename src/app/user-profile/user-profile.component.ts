import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private router: Router) { }

  loginOrNot = "false"

  username;
  email;
  first_name;
  last_name;
  address;
  mainwallet;
  phone;
  profile_picture_path;
  coverimage_path;


  ngOnInit() {
    this.loginOrNot = sessionStorage.getItem("Login");
    console.log(this.loginOrNot);

    if (this.loginOrNot == null) {
      alert("Kingly login first!!!")
      this.router.navigate(['/login'])
    }
    this.address=sessionStorage.getItem("address");
    this.email=sessionStorage.getItem("email");
    this.first_name=sessionStorage.getItem("first_name");
    this.last_name=sessionStorage.getItem("last_name");
    this.mainwallet=sessionStorage.getItem("mainwallet");
    this.username=sessionStorage.getItem("username");
    this.phone=sessionStorage.getItem("phone");
    this.profile_picture_path=sessionStorage.getItem("profile_picture_path");
    this.coverimage_path=sessionStorage.getItem("coverimage_path");
    // sessionStorage.getItem("Login");
    // sessionStorage.getItem("role"    sessionStorage.getItem("username"e);
  }

}
