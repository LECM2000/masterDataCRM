import { Component } from '@angular/core';
import { ActivatedRoute,Router, NavigationExtras } from '@angular/router';
@Component({
  selector: 'app-first-menu',
  templateUrl: './first-menu.component.html',
  styleUrls: ['./first-menu.component.css']
})
export class FirstMenuComponent {
uuid:any;
  constructor(private route: ActivatedRoute, private router:Router){

  }
  ngOnInit(){
    this.uuid= this.route.snapshot.queryParamMap.get('uid')
  }
  perfil(){
    const uid : NavigationExtras = {
      queryParams:{
        uid: this.uuid
      }
    }
    this.router.navigate(['perfil'], uid)
  }
}
