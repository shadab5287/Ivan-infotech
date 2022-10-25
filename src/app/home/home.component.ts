import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
    selector:'app-home',
    templateUrl:'home.component.html',
    styleUrls:['home.component.css']
})

export class HomeComponent implements OnInit {

    customOptions: OwlOptions = {
        loop: true,
        mouseDrag: true,
        touchDrag: false,
        pullDrag: true,
        dots: false,
        navSpeed: 700,
        navText: ['', ''],
        responsive: {
          0: {
            items: 1
          },
          400: {
            items: 2
          },
          740: {
            items: 3
          },
          940: {
            items: 2.5
          }
        },
        nav: true
      }
    
      loginOrNot="false"
    
      constructor(private router:Router) { }
    
      ngOnInit() {
       this.loginOrNot = sessionStorage.getItem("Login");
       console.log(this.loginOrNot);
       
       if (this.loginOrNot==null) {
         alert("Kingly login first!!!")
         this.router.navigate(['/login'])
       }
      }
}