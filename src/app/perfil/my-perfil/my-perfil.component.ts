import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/compat/storage';
import { ImageUploadServiceService } from 'src/app/services/image-upload-service.service';
import { DatabaseFirebaseService } from 'src/app/services/database-firebase.service';
import { FirebaseService } from 'src/app/services/firebase.service';
@Component({
  selector: 'app-my-perfil',
  templateUrl: './my-perfil.component.html',
  styleUrls: ['./my-perfil.component.css']
})
export class MyPerfilComponent {
  perfil!: FormGroup;
  uuid:any;
  images: File[] = [];
  newPerfil =false;
  name='';
  phone='';
  email='';
  imageUrl='';
  constructor(private databaseFirebaseService: DatabaseFirebaseService,
    private imageUploadService: ImageUploadServiceService,
    private storage: AngularFireStorage,
    private route: ActivatedRoute , 
    private firebaseService: FirebaseService){

  }
  ngOnInit(){
    this.uuid= this.route.snapshot.queryParamMap.get('uid')
    this.createForm();
    this.firebaseService.getDoc('perfiles', this.uuid).subscribe( (result:any)=>{
      this.name=result.name
     this.phone = result.phone
     this.email = result.email
   this.imageUrl = result.images[0];
     console.log(result.images[0])
    })

  }
  createForm(){
    this.perfil= new FormGroup({
      name: new FormControl(''),
      phone: new FormControl(''),
      email: new FormControl('', Validators.email)
    })
  }
  addPerfil(){
    this.newPerfil=true;

  }
  closeAddPerfil(){
    console.log('se cerro')
    this.newPerfil=false;
  }
  setPerfil() {
    this.uuid= this.route.snapshot.queryParamMap.get('uid')
    const data = {
      name: this.perfil.value.name,
      phone: this.perfil.value.phone,
      email: this.perfil.value.email
      
    };
  
    this.firebaseService.createDoc(data, 'perfiles', this.uuid)
  .then(() => {
    // Utiliza this.uuid ya que ya proporcionaste el ID al método createDoc
    const docId = this.uuid;
    this.uploadImages(docId);
    alert('Registrado correctamente');
    this.newPerfil=false;
  })
  .catch((error) => {
    console.error('Error al crear el documento:', error);
  });


  }
  

  uploadImages(docId: string) {
    if (this.images.length === 0) {
      // No hay imágenes para cargar
      console.log('No hay imágenes para cargar.');
      return;
    }
  
    const imagePromises: Promise<string>[] = [];
  
    // Iterar sobre las imágenes y cargar cada una
    this.images.forEach((image: File) => {
      const filePath = `/perfiles/${docId}/${image.name}`;
      const uploadTask = this.storage.upload(filePath, image);
  
      // Get notified when the download URL is available
      const downloadURL$ = uploadTask.then(snapshot => snapshot.ref.getDownloadURL());
  
      // Add the promise to the array
      imagePromises.push(downloadURL$);
    });
  
    // When all images are uploaded, save the URLs in your database
    Promise.all(imagePromises)
      .then(imageURLs => {
        console.log('URLs de imágenes cargadas:', imageURLs);
  
        // Do something with the URLs, e.g., save them in your database
        const imageData = {
          images: imageURLs
        };
  
        this.databaseFirebaseService.updateDoc(imageData, 'perfiles', docId);
      })
      .catch(error => {
        console.error('Error al cargar imágenes:', error);
      });
  }
  
  

  handleImageChange(event: any) {
    this.images = Array.from(event.target.files);
  }
  getImageReference(imagePath: string): AngularFireStorageReference {
    return this.storage.ref(imagePath);
  }
  getImageUrl(imagePath: string): Promise<string> {
    const ref = this.getImageReference(imagePath);
    return ref.getDownloadURL().toPromise();
  }
  
}
