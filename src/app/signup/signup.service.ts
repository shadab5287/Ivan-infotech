import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn:'root'
})

export class SignupService implements OnInit {

    constructor(private http:HttpClient){

    }

    ngOnInit(): void {
        
    }

    doSignUp(data){
        console.log(data,"data");
        
        let formData = new FormData();

        formData.append("first_name",data.first_name)
        formData.append("username",data.username)
        // formData.append("first_name",data.first_name)
        formData.append("last_name",data.last_name)
        formData.append("role",data.role)
        formData.append("email",data.email)
        formData.append("password",data.password);
        formData.append("password_confirmation",data.password_confirmation)

        return new Observable<any>((observe) => {
            this.http.post( 'https://dev8.ivantechnology.in/daleart/backend/frontend/auth/register',formData).subscribe(response => {
               observe.next(response);
               
             
            })
        })
    } 

    otpSubmission(data,token){
        let formData = new FormData();
        formData.append("type",'user-register')
        formData.append("verification_token",token)
        formData.append("otp_code",data.otp_code)
        return new Observable<any>((observe) => {
            this.http.post( 'https://dev8.ivantechnology.in/daleart/backend/frontend/otp/verify',formData).subscribe(response => {
               observe.next(response);
               
             
            })
        })
    }

    resendOTPsubmission(token){

        let formData = new FormData();
        formData.append("type",'user-register')
        formData.append("verification_token",token)
        // formData.append("otp_code",token)

        return new Observable<any>((observe) => {
            this.http.post( 'https://dev8.ivantechnology.in/daleart/backend/frontend/otp/resend',formData).subscribe(response => {
               observe.next(response);
               
             
            })
        })
    }


}