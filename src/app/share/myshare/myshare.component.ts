import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
@Component({
  selector: 'app-myshare',
  templateUrl: './myshare.component.html',
  styleUrls: ['./myshare.component.css']
})
export class MyshareComponent {
id:any;
details:any;
employment:any;
imageURL=""
imagePerfil=""
waMe=""
constructor(private route: ActivatedRoute, private firebase: FirebaseService){
}
ngOnInit(){
  this.id=this.route.snapshot.queryParamMap.get('id')
  console.log(this.id)
  this.getData();
  this.sendMessage();
}
getData(){
this.firebase.getDoc('reportes', this.id).subscribe((result:any)=>{
  console.log(result)
  this.details=result
  this.imageURL=result.images[0]
  console.log(this.imageURL)
  this.getEmployment();

})
}
getEmployment(){
  this.firebase.getDoc('perfiles', this.details.employment).subscribe((result:any)=>{
    console.log(result)
    this.employment=result;
    this.imagePerfil=result.images[0]
    this.waMe=`https://wa.me/${result.phone}`;
  console.log(this.waMe)

  })
}
sendMessage(){
  
}
}
