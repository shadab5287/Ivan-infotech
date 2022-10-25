import { HttpClient } from "@angular/common/http";
import { Component, Injectable, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { LoginService } from "./login.service";

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})

export class LoginComponent implements OnInit {

    loginForm = new FormGroup({
        email: new FormControl('', Validators.required),
        password: new FormControl('', [Validators.required,Validators.minLength(8)]),
    });

    constructor(private toastr: ToastrService,private spinner: NgxSpinnerService,private loginservice: LoginService,private fb:FormBuilder, private router:Router) { }

    ngOnInit(): void {

    }

    onSubmit() {
        this.spinner.show()
        console.log(this.loginForm.value, "login");
        this.loginservice.doLogin(this.loginForm.value).subscribe((res) => {
            console.log(res, "login response");
            if (res.status=="success") {
                this.toastr.success("Login Successfully!!","",{
                    closeButton:true,
                    positionClass:'toast-top-left'
                    
                })
                sessionStorage.setItem("address",res.data.user.address);
                sessionStorage.setItem("email",res.data.user.email);
                sessionStorage.setItem("first_name",res.data.user.first_name);
                sessionStorage.setItem("last_name",res.data.user.last_name);
                sessionStorage.setItem("mainwallet",res.data.user.mainwallet);
                sessionStorage.setItem("Login","true");
                sessionStorage.setItem("phone",res.data.user.phone);
                sessionStorage.setItem("username",res.data.user.username);
                sessionStorage.setItem("coverimage_path",res.data.user.coverimage_path);
                sessionStorage.setItem("profile_picture_path",res.data.user.profile_picture_path);
                // sessionStorage.setItem("Login",res.data.user.address);

                this.router.navigate(['/home'])
                this.spinner.hide()
            }
            if (res.status=="error") {
                this.spinner.hide()
                this.toastr.error("the password  you entered is invalid","",{
                    closeButton:true,
                    positionClass:'toast-top-left'
                    
                })
            }
            if (res.status=="val_error") {
                this.spinner.hide()
                this.toastr.error("Email id you entered is invalid","",{
                    closeButton:true,
                    positionClass:'toast-top-left'
                    
                })
            }

        })

    }


}