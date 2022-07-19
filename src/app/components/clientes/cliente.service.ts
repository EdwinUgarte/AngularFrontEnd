import { Injectable } from "@angular/core";
import { Cliente } from "./cliente";
import { CLIENTES } from './clientes.json';
import { map, Observable, of, throwError } from "rxjs";
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { catchError } from "rxjs";
import Swal from "sweetalert2";
import { Router } from "@angular/router";


@Injectable()//!Injectable es para poder inyectar esta clase a otra al estilo de Spring con los component
export class ClienteService{
    private urlEndPoint: string = "http://localhost:8080/api/clientes"
    
    private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})
    constructor(private http: HttpClient , private router: Router){  }
    
    getClientes(): Observable<Cliente[]>{//!Los Observables son metodos que se ejecutan todo el tiempo y estan a la espera de si los datos cambian para actualizarse de inmediato
        //return of(CLIENTES);
        return this.http.get<Cliente[]>(this.urlEndPoint).pipe(
            map(response => response as Cliente[])
        );//!Se hace el cast <Cliente[]> para convertir el json que recibimos a un List<Cliente>
        
    }

    create(cliente: Cliente) : Observable<any>{
        return this.http.post<Cliente>(this.urlEndPoint, cliente, {headers: this.httpHeaders}).pipe(
            catchError(e => {
                Swal.fire(e.error.mensaje, ('No puedes dejar campos vacios <br/> No puedes crear usuarios con el mismo email') ,"error");
                return throwError(e);
            })
        )
    }

    getCliente(id): Observable<any>{
        return this.http.get<any>(`${this.urlEndPoint}/${id}`).pipe(
            catchError(e => {
                this.router.navigate(['/clientes']);
                Swal.fire("Error al editar", e.error.mensaje, "error");
                return throwError(e);
            })
        );//?Se concatena el Id
    }

    update(cliente: Cliente) : Observable<any>{
        return this.http.put<any>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.httpHeaders}).pipe(
            catchError(e => {
                Swal.fire(e.error.mensaje, e.error.error, "error");
                return throwError(e);
            })
        )
    }

    delete(id: number): Observable<Cliente> {
        return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
            catchError(e => {
                Swal.fire(e.error.mensaje, e.error.error, "error");
                return throwError(e);
            })
        )
    }

}


//!El pipe nos permite ejecutar metodos dentro de el, nos ayuda a leer mensajes de error que vienen del backend 
//?Los datos los colocamos como "any" ya que del backend ya no mandamos un tipo cliente si no un Map
//?Entonces se tiene que leer aqui en el front end como any