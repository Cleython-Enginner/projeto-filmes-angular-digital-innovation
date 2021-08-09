import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CursosModule } from './cursos/cursos.module';
import { CadastroCursosComponent } from './cursos/cadastro-cursos/cadastro-cursos.component';
import { VisualizarCursosComponent } from './cursos/visualizar-cursos/visualizar-cursos.component';
import { ListagemCursosComponent } from './cursos/listagem-cursos/listagem-cursos.component';

const routes: Routes = [

  {
      path: '',
      redirectTo: 'cursos',
      pathMatch: 'full'
  },
  {
    path: 'cursos',
    children: [
      {
        path: '',
        component: ListagemCursosComponent
      },
      {
        path: 'cadastro',
        children: [
          {
            path: '',
            component: CadastroCursosComponent
          },
          {
            path: ':id',
            component: CadastroCursosComponent
          }
        ]
      },
      {
        path: ':id',
        component: VisualizarCursosComponent,
        pathMatch: 'full'
      }
    ]
  },
  { path: '**', redirectTo: 'cursos' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CursosModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
