import { Observable } from 'rxjs';
import { ICrud } from './icrud.interface';
import { Model } from './model';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { plainToClass } from 'class-transformer';
import { map } from 'rxjs/operators';
import firebase from 'firebase';

export abstract class ServiceFirebase<T extends Model> implements ICrud<T> {
  ref: AngularFirestoreCollection<T>;

  constructor(
    protected type: { new (): T },
    protected firestore: AngularFirestore,
    public path: string
  ) {
    this.ref = this.firestore.collection<T>(this.path);
  }

  get(id: string): Observable<T> {
    let doc = this.ref.doc<T>(id);
    return doc.get().pipe(map((snapshot) => this.docToClass(snapshot)));
  }

  docToClass(snapshotDoc: firebase.firestore.DocumentSnapshot<T>): T {
    let obj = {
      ...(snapshotDoc.data() as T),
    };
    let typed = plainToClass(this.type, obj);
    return typed;
  }

  list(): Observable<T[]> {
    return this.ref.valueChanges();
  }

  createOrUpdate(item: T): Promise<any> {
    if (!item) {
      return Promise.reject(null);
    }

    let obj: any = null;
    if (item instanceof this.type) {
      obj = item.toObject();
    } else {
      obj = item;
    }

    let id = item.id;
    if (id) {
      return this.ref.doc(id).set(obj);
    } else {
      return this.ref.add(obj).then((res) => {
        obj.id = res.id;
        this.ref.doc(res.id).set(obj);
      });
    }
  }

  delete(id: string): Promise<void> {
    return this.ref.doc(id).delete();
  }
}
