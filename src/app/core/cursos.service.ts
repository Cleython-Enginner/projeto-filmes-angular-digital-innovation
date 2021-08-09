import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Curso } from '../shared/models/curso';
import { ConfigPrams } from '../shared/models/config-prams';
import { ConfigParamsService } from './config-params.service';

const url = 'http://localhost:3000/cursos/';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  constructor(private http: HttpClient,
              private configService: ConfigParamsService) { }

  salvar(curso: Curso): Observable<Curso> {
    return this.http.post<Curso>(url, curso);
  }

  editar(curso: Curso): Observable<Curso> {
    return this.http.put<Curso>(url + curso.id, curso);
  }

  listar(config: ConfigPrams): Observable<Curso[]> {
    const configPrams = this.configService.configurarParametros(config);
    return this.http.get<Curso[]>(url, {params: configPrams});
  }

  visualizar(id: number): Observable<Curso> {
    return this.http.get<Curso>(url + id);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(url + id);
  }
}
