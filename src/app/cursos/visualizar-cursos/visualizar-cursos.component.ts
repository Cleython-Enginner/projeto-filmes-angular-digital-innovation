import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CursosService } from 'src/app/core/cursos.service';
import { Curso } from 'src/app/shared/models/curso';
import { Alerta } from 'src/app/shared/models/alerta';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';

@Component({
  selector: 'dio-visualizar-cursos',
  templateUrl: './visualizar-cursos.component.html',
  styleUrls: ['./visualizar-cursos.component.css']
})
export class VisualizarCursosComponent implements OnInit {
  readonly semFoto = 'https://www.termoparts.com.br/wp-content/uploads/2017/10/no-image.jpg';
  curso: Curso;
  id: number;

  constructor(public dialog: MatDialog,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private cursosService: CursosService) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.visualizar();
  }

  editar(): void {
    this.router.navigateByUrl('/cursos/cadastro/' + this.id);
  }

  excluir(): void {
    const config = {
      data: {
        titulo: 'Você tem certeza que deseja excluir?',
        descricao: 'Caso você tenha certceza que deseja excluir, clique no botão OK',
        corBtnCancelar: 'primary',
        corBtnSucesso: 'warn',
        possuirBtnFechar: true
      } as Alerta
    };
    const dialogRef = this.dialog.open(AlertaComponent, config);
    dialogRef.afterClosed().subscribe((opcao: boolean) => {
      if (opcao) {
        this.cursosService.excluir(this.id)
        .subscribe(() => this.router.navigateByUrl('/cursos'));
      }
    });
  }

  private visualizar(): void {
    this.cursosService.visualizar(this.id).subscribe((curso: Curso) => this.curso = curso);
  }

}
