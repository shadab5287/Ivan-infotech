import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";

@Injectable({
    providedIn:'root'
})
export class LoginService implements OnInit {

    constructor(private http: HttpClient,private toastr: ToastrService,private spinner: NgxSpinnerService){}

    ngOnInit(): void {
        
    }


    doLogin(data){

        let formData = new FormData();

        formData.append("email",data.email)
        formData.append("password",data.password);

        return new Observable<any>((observe) => {
            this.http.post( 'https://dev8.ivantechnology.in/daleart/backend/frontend/auth/login',formData).subscribe(response => {
               observe.next(response);
               
             
            })
        })
        
    }
}