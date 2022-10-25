import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { ConfirmedValidator } from "../share/password.validator";
import { SignupService } from "./signup.service";

@Component({
    selector: 'app-signup',
    templateUrl: 'signup.component.html',
    styleUrls: ['signup.component.css']
})
export class SignupComponent implements OnInit {

    signUp: boolean = true;
    otptoken;

    signUpForm = this.fb.group({
        role: ['', Validators.required],
        last_name: ['',[Validators.required,Validators.minLength(3)]],
        first_name: ['', [Validators.required,Validators.minLength(3)]],
        username: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', [Validators.required,Validators.minLength(8)]],
        password_confirmation: [''],
    },
        {

            validator: ConfirmedValidator('password', 'password_confirmation')

        }
    );
    otpForm = new FormGroup({
        otp_code: new FormControl('', [Validators.required]),

    });

    constructor(private router:Router,private toastr: ToastrService,private spinner: NgxSpinnerService,private signupservice: SignupService, private fb: FormBuilder) { }

    ngOnInit(): void {

    }

    get f(){
        return this.signUpForm.controls;
      }

    onSubmit() {
        this.spinner.show()
        console.log(this.signUpForm.value, "signUp");
        // this.signUp = false
        this.signupservice.doSignUp(this.signUpForm.value).subscribe((res)=>{
            console.log(res,"signup res");
            if (res.status=="otpverification") {
                this.otptoken=res.data.token
                console.log(this.otptoken,"otptoken");
                this.spinner.hide()
                this.signUp=false
                this.toastr.success("OTP has been send to your email. Please verify to complete registration!!","",{
                    closeButton:true,
                    positionClass:'toast-top-left'
                    
                })
            }
            if (res.status=="val_error") {
                // this.otptoken=res.data.token
                console.log(this.otptoken,"otptoken");
                this.spinner.hide()
                // this.signUp=false
                this.toastr.error("Username or Email address already exit. Please try with diffrent Username or Email","",{
                    closeButton:true,
                    positionClass:'toast-top-left'
                    
                })
            }
            if (res.status=="error") {
                // this.otptoken=res.data.token
                console.log(this.otptoken,"otptoken");
                this.spinner.hide()
                // this.signUp=false
                this.toastr.error("Please check email and try again","",{
                    closeButton:true,
                    positionClass:'toast-top-left'
                    
                })
            }

        })

    }


    onOTPSubmit(){
        this.signupservice.otpSubmission(this.otpForm.value,this.otptoken).subscribe((res)=>{
            console.log(res,"OTP response");
            if (res.status=="success") {
                this.toastr.success("Your account created successfully. please login to continue!!","",{
                    closeButton:true,
                    positionClass:'toast-top-left'
                    
                })
                this.router.navigate(['/login'])
            }
            if (res.status=="error") {
                this.toastr.error("The OTP entered is invalid!!","",{
                    closeButton:true,
                    positionClass:'toast-top-left'
                    
                })
                // this.router.navigate(['/login'])
            }
            if (res.status=="val_error") {
                this.toastr.error("The OTP entered is invalid!!","",{
                    closeButton:true,
                    positionClass:'toast-top-left'
                    
                })
                // this.router.navigate(['/login'])
            }
            
            
        })
    }

    resendOTP(){
        console.log(this.otptoken,"otptoken");
        
        this.spinner.show()
        this.signupservice.resendOTPsubmission(this.otptoken).subscribe((res=>{
            console.log(res,"resendOtp response");
            if (res.status=="error") {
                this.toastr.success("Something went wrong please try again","",{
                    closeButton:true,
                    positionClass:'toast-top-left'
                    
                })
            }
            if (res.status=="success") {
                this.otpForm.reset()
                this.toastr.success("OTP resend to your email address please check your email for 6 digit OTP!!","",{
                    closeButton:true,
                    positionClass:'toast-top-left'
                    
                })
            }
            this.spinner.hide()
        }))
    }
}