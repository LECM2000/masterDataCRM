import { group } from '@angular/animations';
import { Component } from '@angular/core';
import { FormGroup,FormControl,Validators,FormBuilder, FormControlDirective, } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute, NavigationExtras} from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
 
  user!:FormGroup;
  fail = false;
  constructor(private formBuilder: FormBuilder, 
    private authService: AuthService, 
    private router: Router, private route: ActivatedRoute ){}
 ngOnInit(){
  this.createform()
 }
  createform(){
    this.user=new FormGroup({
      correo:new FormControl("",Validators.email),
      contraseña: new FormControl("", Validators.minLength(8))
  })
  }
  login(){
    const email = this.user.value.correo;
    const password = this.user.value.contraseña;
    const data= {
      email : email,
      password: password
    }
    
   this.authService.login(data).then(result =>{
    console.log('este es el resultado->',result.user.uid)
    
    const uid : NavigationExtras = {
      queryParams:{
        uid: result.user.uid
      }
    }
    this.router.navigate(['home'], uid)
   }).catch(error=>{
this.fail=true;
    alert('No se pudo ingresar');
   })
  }


}
