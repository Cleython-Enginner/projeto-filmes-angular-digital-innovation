import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { CadastroCursosComponent } from './cadastro-cursos/cadastro-cursos.component';
import { MaterialModule } from '../shared/material/material.module';
import { ListagemCursosComponent } from './listagem-cursos/listagem-cursos.component';
import { CamposModule } from '../shared/components/campos/campos.module';
import { VisualizarCursosComponent } from './visualizar-cursos/visualizar-cursos.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    CamposModule,
    InfiniteScrollModule
  ],
  declarations: [CadastroCursosComponent, ListagemCursosComponent, VisualizarCursosComponent]
})
export class CursosModule { }
