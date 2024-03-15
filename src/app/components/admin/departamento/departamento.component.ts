import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { Departamento } from 'src/app/models/departamento.model';
import { DepartamentoService } from 'src/app/services/departamento.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.component.html',
  styleUrls: ['./departamento.component.css'],
})
export class DepartamentoComponent implements OnInit {
  departamentos$!: Observable<Departamento[]>;
  edit: boolean = false;
  displayDialogDepartamento: boolean = false;
  form: FormGroup;

  constructor(
    private departamentoService: DepartamentoService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      id: new FormControl(),
      nome: new FormControl('', Validators.required),
      telefone: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.departamentos$ = this.departamentoService.list();
  }

  add() {
    this.form.reset();
    this.edit = false;
    this.displayDialogDepartamento = true;
  }

  selecionaDepartamento(departamento: Departamento) {
    this.edit = true;
    this.displayDialogDepartamento = true;
    this.form.setValue(departamento);
  }

  save() {
    this.departamentoService
      .createOrUpdate(this.form.value)
      .then(() => {
        this.displayDialogDepartamento = false;
        Swal.fire(
          `Departamento ${!this.edit ? 'salvo' : 'atualizado'} com sucesso.`,
          '',
          'success'
        );
      })
      .catch((erro) => {
        this.displayDialogDepartamento = false;
        Swal.fire(
          `Erro ao ${!this.edit ? 'salvar' : 'atualizar'} o departamento.`,
          `Detalhes: ${erro}`,
          'error'
        );
        this.form.reset();
      });
  }

  delete(departamento: Departamento) {
    Swal.fire({
      title: 'Confirma a exclusão do departamento?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    }).then((result) => {
      if (result.value) {
        this.departamentoService.delete(departamento.id).then(() => {
          Swal.fire('Departamento excluído com sucesso!', '', 'success');
        });
      }
    });
  }
}
