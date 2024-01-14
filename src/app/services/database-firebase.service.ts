import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { v4 as uuidv4 } from 'uuid';

import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DatabaseFirebaseService {

  constructor(private firestore: AngularFirestore) { }

  createDoc(data: any, path: string) {
    const id = uuidv4(); 
    const collection = this.firestore.collection(path);
    
    return collection.doc(id).set(data)
      .then(() => {
        console.log('Documento creado exitosamente.');
        return { id }; // Devolver el ID en caso de éxito
      })
      .catch((error) => {
        console.error('Error al crear el documento en Firestore:', error);
        throw error; // Propagar el error para que sea manejado en la cadena de promesas
      });
  }
  
  

  getDoc<tipo>(path: string, id: string) {
    const collection = this.firestore.collection<tipo>(path);
    return collection.doc(id).valueChanges();
  }

  deleteDoc(path: string, id: string) {
    const collection = this.firestore.collection(path);
    return collection.doc(id).delete();
  }

  updateDoc(data: any, path: string, id: string) {
    const collection = this.firestore.collection(path);
    return collection.doc(id).update(data);
  }


  getAllDocs<tipo>(path: string): Observable<tipo[]> {
    const collection = this.firestore.collection<tipo>(path);
    return collection.valueChanges().pipe(
      filter(docs => docs !== undefined)
    );
  }
  
}
