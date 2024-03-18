import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { Departamento } from 'src/app/models/departamento.model';
import { Funcionario } from 'src/app/models/funcionario.model';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import Swal from 'sweetalert2';
import {
  AngularFireUploadTask,
  AngularFireStorage,
} from '@angular/fire/storage';

@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.css'],
})
export class FuncionarioComponent implements OnInit {
  funcionarios$!: Observable<Funcionario[]>;
  departamentos$!: Observable<Departamento[]>;
  departamentoFiltro: string = 'TODOS';
  edit: boolean = false;
  displayDialogFuncionario: boolean = false;
  form!: FormGroup;

  @ViewChild('inputFile', { static: false }) inputFile!: ElementRef;

  uploadPercent!: Observable<number | undefined>;
  downloadURL!: Observable<string>;
  task!: AngularFireUploadTask;
  complete!: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private funcionarioService: FuncionarioService,
    private departamentoService: DepartamentoService,
    private fireStorage: AngularFireStorage
  ) {
    this.form = this.formBuilder.group({
      id: new FormControl(),
      nome: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      funcao: new FormControl(''),
      departamento: new FormControl('', Validators.required),
      foto: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.funcionarios$ = this.funcionarioService.list();
    this.departamentos$ = this.departamentoService.list();
  }

  add() {
    this.form.reset();
    this.edit = false;
    this.displayDialogFuncionario = true;
  }

  selecionaFuncionario(funcionario: Funcionario) {
    this.edit = true;
    this.displayDialogFuncionario = true;
    this.form.setValue(funcionario);
  }

  save() {
    this.funcionarioService
      .createOrUpdate(this.form.value)
      .then(() => {
        this.displayDialogFuncionario = false;
        Swal.fire(
          `Funcionário ${!this.edit ? 'salvo' : 'atualizado'} com sucesso.`,
          '',
          'success'
        );
      })
      .catch((erro) => {
        this.displayDialogFuncionario = false;
        Swal.fire(
          `Erro ao ${!this.edit ? 'salvar' : 'atualizar'} o funcionário.`,
          `Detalhes: ${erro}`,
          'error'
        );
        this.form.reset();
      });
  }

  delete(funcionario: Funcionario) {
    Swal.fire({
      title: 'Confirma a exclusão do funcionário?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    }).then((result) => {
      if (result.value) {
        this.funcionarioService.delete(funcionario.id).then(() => {
          Swal.fire('Funcionário excluído com sucesso!', '', 'success');
        });
      }
    });
  }

  async upload(event: any) {
    this.complete = false;
    const file = event.target.files[0];
    const path = `funcionarios/${new Date().getTime().toString()}`;
    const fileRef = this.fireStorage.ref(path);
    this.task = this.fireStorage.upload(path, file);
    this.task.then((up) => {
      fileRef.getDownloadURL().subscribe((url) => {
        this.complete = true;
        this.form.patchValue({
          foto: url,
        });
      });
    });
    this.uploadPercent = this.task.percentageChanges();
    this.inputFile.nativeElement.value = '';
  }
}
