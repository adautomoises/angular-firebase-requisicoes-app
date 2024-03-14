import { Injectable } from '@angular/core';
import { Requisicao } from '../models/requisicao.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { ServiceFirebase } from '../core/firebase.service';

@Injectable({
  providedIn: 'root',
})
export class RequisicaoService extends ServiceFirebase<Requisicao> {
  constructor(firestore: AngularFirestore) {
    super(Requisicao, firestore, 'requisicoes');
  }
}
