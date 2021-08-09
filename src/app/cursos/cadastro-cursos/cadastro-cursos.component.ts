import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ValidarCamposService } from 'src/app/shared/components/campos/validar-campos.service';
import { CursosService } from 'src/app/core/cursos.service';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';
import { Alerta } from 'src/app/shared/models/alerta';
import { Curso } from 'src/app/shared/models/curso';

@Component({
  selector: 'dio-cadastro-cursos',
  templateUrl: './cadastro-cursos.component.html',
  styleUrls: ['./cadastro-cursos.component.scss']
})
export class CadastroCursosComponent implements OnInit {

  id: number;
  cadastro: FormGroup;
  areas: Array<string>;

  constructor(public validacao: ValidarCamposService,
              public dialog: MatDialog,
              private fb: FormBuilder,
              private cursoService: CursosService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  get f() {
    return this.cadastro.controls;
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    if (this.id) {
      this.cursoService.visualizar(this.id)
        .subscribe((curso: Curso) => this.criarFormulario(curso));
    } else {
      this.criarFormulario(this.criarCursoEmBranco());
    }

    this.areas = ['Front-end', 'Back-end', 'Mobile', 'Frameworks', 'Ciências de Dados', 'Engenharia de Software', 'Aquitetura de Software', 'Cybersecurity'];

  }

  submit(): void {
    this.cadastro.markAllAsTouched();
    if (this.cadastro.invalid) {
      return;
    }

    const curso = this.cadastro.getRawValue() as Curso;
    if (this.id) {
      curso.id = this.id;
      this.editar(curso);
    } else {
      this.salvar(curso);
    }
  }

  reiniciarForm(): void {
    this.cadastro.reset();
  }

  private criarFormulario(curso: Curso): void {
    this.cadastro = this.fb.group({
      titulo: [curso.titulo, [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
      urlFoto: [curso.urlFoto, [Validators.minLength(10)]],
      dtConclusao: [curso.dtConclusao, [Validators.required]],
      descricao: [curso.descricao],
      nota: [curso.nota, [Validators.required, Validators.min(0), Validators.max(10)]],
      urlcurso: [curso.urlcurso, [Validators.minLength(10)]],
      area: [curso.area, [Validators.required]]
    });
  }

  private criarCursoEmBranco(): Curso {
    return {
      id: null,
      titulo: null,
      dtConclusao: null,
      urlFoto: null,
      descricao: null,
      nota: null,
      urlcurso: null,
      area: null
    } as Curso;
  }

  private salvar(curso: Curso): void {
    this.cursoService.salvar(curso).subscribe(() => {
      const config = {
        data: {
          btnSucesso: 'Ir para a listagem',
          btnCancelar: 'Cadastrar um novo curso',
          corBtnCancelar: 'primary',
          possuirBtnFechar: true
        } as Alerta
      };
      const dialogRef = this.dialog.open(AlertaComponent, config);
      dialogRef.afterClosed().subscribe((opcao: boolean) => {
        if (opcao) {
          this.router.navigateByUrl('cursos');
        } else {
          this.reiniciarForm();
        }
      });
    },
    () => {
      const config = {
        data: {
          titulo: 'Erro ao salvar o registro!',
          descricao: 'Não conseguimos salvar seu registro, favor tentar novamente mais tarde',
          corBtnSucesso: 'warn',
          btnSucesso: 'Fechar'
        } as Alerta
      };
      this.dialog.open(AlertaComponent, config);
    });
  }

  private editar(curso: Curso): void {
    this.cursoService.editar(curso).subscribe(() => {
      const config = {
        data: {
          descricao: 'Seu registro foi atualizado com sucesso!',
          btnSucesso: 'Ir para a listagem',
        } as Alerta
      };
      const dialogRef = this.dialog.open(AlertaComponent, config);
      dialogRef.afterClosed().subscribe(() => this.router.navigateByUrl('cursos'));
    },
    () => {
      const config = {
        data: {
          titulo: 'Erro ao editar o registro!',
          descricao: 'Não conseguimos editar seu registro, favor tentar novamente mais tarde',
          corBtnSucesso: 'warn',
          btnSucesso: 'Fechar'
        } as Alerta
      };
      this.dialog.open(AlertaComponent, config);
    });
  }

}
