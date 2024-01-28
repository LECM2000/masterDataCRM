import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadServiceService {

  constructor(private storage: AngularFireStorage) { }

  uploadImage(file: File): Promise<string> {
    const filePath = `/images/${file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, file);

    return new Promise((resolve, reject) => {
      uploadTask.snapshotChanges().pipe(
        finalize(() => {
          storageRef.getDownloadURL().subscribe(downloadURL => {
            resolve(downloadURL);
          }, error => {
            reject(error);
          });
        })
      ).subscribe();
    });
  }
}
