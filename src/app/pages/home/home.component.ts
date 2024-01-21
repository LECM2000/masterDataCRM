import { Component } from '@angular/core';
import { DatabaseFirebaseService } from 'src/app/services/database-firebase.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { ImageUploadServiceService } from 'src/app/services/image-upload-service.service';
import { Router, ActivatedRoute, NavigationExtras} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
goBack() {
throw new Error('Method not implemented.');
}
closeForm() {
throw new Error('Method not implemented.');
}
  elementoActivo: any;
  detallesVisible: boolean = false;
  reporteSeleccionado: any;
  jobs!: FormGroup;
  isFlipped: boolean = false;
  name: string = '';
  phone: string = '';
  email: string = '';
  subject: string = '';
  message: string = '';
  newJob = false;
  jobsArray: any = [];
  images: File[] = [];
  uuid: any;
  reportes:any=[]
  edit=false;
  reportEdit:any;
  editJob!:FormGroup;
  newData:any;
  idEdit:any;
  constructor(
    private databaseFirebaseService: DatabaseFirebaseService,
    private imageUploadService: ImageUploadServiceService,
    private storage: AngularFireStorage,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.getData();
    this.createForm();
   this.uuid= this.route.snapshot.queryParamMap.get('uuid');
   this.form();
  }

  addJob() {
    this.newJob = true;
  }
  closeAddJob() {
    this.newJob = false;
  }
form(){
  this.editJob = new FormGroup({
    status: new FormControl('')
  })
}

  createForm() {
    this.jobs = new FormGroup({
      name: new FormControl(''),
      phone: new FormControl(''),
      email: new FormControl('', Validators.email),
      subject: new FormControl(''),
      status: new FormControl(''),
      message: new FormControl('')
    });
  }

  toggleCard() {
    this.isFlipped = !this.isFlipped;
  }

  sendMail() {
    // Lógica para enviar el correo
    console.log('Enviando correo...');
  }

  getData() {
    this.databaseFirebaseService.getAllDocs('reportes').subscribe((result: { id: string, data: any }[]) => {
      console.log('este es ', result);
      
      result.map((doc: { id: string, data: any }) => {
        this.uuid = this.route.snapshot.queryParamMap.get('uid');
        console.log('este es data->', doc.data.employment);
        console.log('Mi UID->', this.uuid);
  
        if (doc.data.employment === this.uuid) {
          // Agrega el ID al objeto antes de agregarlo al array
          this.reportes.push({ id: doc.id, ...doc.data });
        }
      });
    });
  }
  
  

  setJob() {
    this.uuid= this.route.snapshot.queryParamMap.get('uid')
    const data = {
      name: this.jobs.value.name,
      phone: this.jobs.value.phone,
      email: this.jobs.value.email,
      subject: this.jobs.value.subject,
      status: this.jobs.value.status,
      message: this.jobs.value.message, 
      employment: this.uuid
    };
  
    this.databaseFirebaseService.createDoc(data, 'reportes')
  .then((docRef: any) => {
    if (docRef && docRef.id) {
      const docId = docRef.id;
      this.uploadImages(docId);
      this.newJob = false;
      alert('Registrado correctamente')
    } else {
      console.error('La referencia al documento es undefined o no tiene una propiedad "id".', docRef);
    }
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
      const filePath = `/images/${docId}/${image.name}`;
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
  
        this.databaseFirebaseService.updateDoc(imageData, 'reportes', docId);
      })
      .catch(error => {
        console.error('Error al cargar imágenes:', error);
      });
  }
  
  

  handleImageChange(event: any) {
    this.images = Array.from(event.target.files);
  }
  activarElemento(reporte: any) {
    this.elementoActivo = reporte;
  }

  mostrarDetalles(reporte: any) {
    this.detallesVisible = true;
    this.reporteSeleccionado = reporte;
  }

  ocultarDetalles() {
    this.detallesVisible = false;
    this.elementoActivo = null;
    this.reporteSeleccionado = null;
  }
  sendJob(reporte:any){
    console.log(reporte)
    const id : NavigationExtras = {
      queryParams:{
        id: reporte
      }
    }
    this.router.navigate(['share'], id);
  }
  editReport(reporte:any, id:any){
    console.log(reporte);
    this.reportEdit=reporte;
    this.edit=true;
    const data = {
      name: reporte.name,
      phone: reporte.phone,
      email: reporte.email,
      subject: reporte.subject,
      status: this.editJob.value.status,
      message: reporte.message, 
      employment: this.uuid
    };
    this.newData= data
    this.idEdit=id;
    
  }
  closeEdit(){
   
    this.edit=false;
  }
  setEdit(){
    this.databaseFirebaseService.updateDoc(this.newData, 'reportes', this.idEdit).then(result=>{
      alert('Se ha modificado')
    }).catch(error=>{
      alert('No se modifico')
    })
  }
}
