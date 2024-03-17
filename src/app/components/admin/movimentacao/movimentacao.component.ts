import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Funcionario } from 'src/app/models/funcionario.model';
import { Movimentacao } from 'src/app/models/movimentacao.model';
import { Requisicao } from 'src/app/models/requisicao.model';
import { RequisicaoService } from 'src/app/services/requisicao.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-movimentacao',
  templateUrl: './movimentacao.component.html',
  styleUrls: ['./movimentacao.component.css'],
})
export class MovimentacaoComponent implements OnInit {
  @Input() funcionarioLogado!: Funcionario;
  requisicoes$!: Observable<Requisicao[]>;
  movimentacoes!: Movimentacao[];
  requisicaoSelecionada!: Requisicao;
  edit!: boolean;
  displayDialogMovimentacao!: boolean;
  displayDialogMovimentacoes!: boolean;
  form: FormGroup;
  listaStatus!: string[];

  constructor(
    private requisicaoService: RequisicaoService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      funcionario: new FormControl('', Validators.required),
      dataHora: new FormControl(''),
      status: new FormControl('', Validators.required),
      descricao: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.carregaStatus();
    this.listaRequisicoesDepartamento();
  }

  carregaStatus() {
    this.listaStatus = [
      'Aberto',
      'Pendente',
      'Processando',
      'Não autorizada',
      'Finalizado',
    ];
  }

  listaRequisicoesDepartamento() {
    this.requisicoes$ = this.requisicaoService
      .list()
      .pipe(
        map((reqs: Requisicao[]) =>
          reqs.filter((r) => r.destino === this.funcionarioLogado.departamento)
        )
      );
  }

  onDialogClose(event: any) {
    this.displayDialogMovimentacoes = event;
  }

  setValorPadrao() {
    this.form.patchValue({
      funcionario: this.funcionarioLogado,
      dataHora: new Date(),
    });
    this.movimentacoes = [];
  }

  add(requisicao: Requisicao) {
    this.form.reset();
    this.edit = false;
    this.setValorPadrao();
    this.requisicaoSelecionada = requisicao;
    this.movimentacoes = !requisicao.movimentacoes
      ? []
      : requisicao.movimentacoes;
    this.displayDialogMovimentacao = true;
  }

  verMovimentacoes(requisicao: Requisicao) {
    this.requisicaoSelecionada = requisicao;
    this.movimentacoes = requisicao.movimentacoes;
    this.displayDialogMovimentacoes = true;
  }

  save() {
    this.movimentacoes.push(this.form.value);
    this.requisicaoSelecionada.movimentacoes = this.movimentacoes;
    this.requisicaoSelecionada.status = this.form.controls['status'].value;
    this.requisicaoSelecionada.ultimaAtualizacao = new Date();
    this.requisicaoService
      .createOrUpdate(this.requisicaoSelecionada)
      .then(() => {
        this.displayDialogMovimentacao = false;
        Swal.fire(
          `Requisição	${!this.edit ? 'salva' : 'atualizada'}	com	sucesso.`,
          '',
          'success'
        );
      })
      .catch((erro) => {
        this.displayDialogMovimentacao = true;
        Swal.fire(
          `Erro	ao	${!this.edit ? 'salvar' : 'atualizar'} a	Requisição.`,
          `Detalhes:	${erro}`,
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
}
