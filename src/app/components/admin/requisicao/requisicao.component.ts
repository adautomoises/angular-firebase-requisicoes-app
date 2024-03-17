import { RequisicaoService } from './../../../services/requisicao.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Departamento } from 'src/app/models/departamento.model';
import { Funcionario } from 'src/app/models/funcionario.model';
import { Requisicao } from 'src/app/models/requisicao.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import firebase from 'firebase/app';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-requisicao',
  templateUrl: './requisicao.component.html',
  styleUrls: ['./requisicao.component.css'],
})
export class RequisicaoComponent implements OnInit {
  requisicoes$!: Observable<Requisicao[]>;
  departamentos$!: Observable<Departamento[]>;
  edit!: boolean;
  displayDialogRequisicao!: boolean;
  form: FormGroup;
  funcionarioLogado!: Funcionario;

  constructor(
    private requisicaoService: RequisicaoService,
    private departamentoService: DepartamentoService,
    private authService: AuthenticationService,
    private funcionarioService: FuncionarioService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      id: new FormControl(),
      destino: new FormControl('', Validators.required),
      solicitante: new FormControl(''),
      dataAbertura: new FormControl(''),
      ultimaAtualizacao: new FormControl(''),
      status: new FormControl(''),
      descricao: new FormControl('', Validators.required),
      movimentacoes: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.departamentos$ = this.departamentoService.list();
    this.recuperaFuncionario();
  }

  add() {
    this.form.reset();
    this.edit = false;
    this.displayDialogRequisicao = true;
    this.setValorPadrao();
  }

  setValorPadrao() {
    this.form.patchValue({
      solicitante: this.funcionarioLogado,
      status: 'aberto',
      dataAbertura: new Date(),
      ultimaAtualizacao: new Date(),
      movimentacoes: [],
    });
  }

  selecionaRequisicao(func: Requisicao) {
    this.edit = true;
    this.displayDialogRequisicao = true;
    this.form.setValue(func);
  }

  save() {
    this.requisicaoService
      .createOrUpdate(this.form.value)
      .then(() => {
        this.displayDialogRequisicao = false;
        Swal.fire(
          `Requisição ${!this.edit ? 'salva' : 'atualizada'} com sucesso.`,
          '',
          'success'
        );
        this.displayDialogRequisicao = false;
      })
      .catch((erro) => {
        this.displayDialogRequisicao = true;
        Swal.fire(
          `Erro ao ${!this.edit ? 'salvar' : 'atualizar'} a Requisição.`,
          `Detalhes: ${erro}`,
          'error'
        );
      });
    this.form.reset();
  }

  delete(departamento: Requisicao) {
    Swal.fire({
      title: 'Confirma a exclusão da Requisição?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    }).then((result) => {
      if (result.value) {
        this.requisicaoService.delete(departamento.id).then(() => {
          Swal.fire('Requisição excluída com sucesso!', '', 'success');
        });
      }
    });
  }

  async recuperaFuncionario() {
    await this.authService.authUser().subscribe((dados: firebase.User) => {
      this.funcionarioService
        .getFuncionarioLogado(dados.email!)
        .subscribe((funcionarios) => {
          this.funcionarioLogado = funcionarios[0];
          this.requisicoes$ = this.requisicaoService
            .list()
            .pipe(
              map((reqs: Requisicao[]) =>
                reqs.filter(
                  (r: any) =>
                    r.solicitante.email === this.funcionarioLogado.email
                )
              )
            );
        });
    });
  }
}
