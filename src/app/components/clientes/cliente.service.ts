import { Injectable } from "@angular/core";
import { Cliente } from "./cliente";
import { CLIENTES } from './clientes.json';
import { Observable, of } from "rxjs";
import { HttpClient, HttpHeaders} from "@angular/common/http";


@Injectable()//!Injectable es para poder inyectar esta clase a otra al estilo de Spring con los component
export class ClienteService{
    private urlEndPoint: string = "http://localhost:8080/api/clientes"
    
    private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})
    constructor(private http: HttpClient){  }
    
    getClientes(): Observable<Cliente[]>{//!Los Observables son metodos que se ejecutan todo el tiempo y estan a la espera de si los datos cambian para actualizarse de inmediato
        //return of(CLIENTES);
        return this.http.get<Cliente[]>(this.urlEndPoint);//!Se hace el cast <Cliente[]> para convertir el json que recibimos a un List<Cliente>
        
    }

    create(cliente: Cliente) : Observable<Cliente>{
        return this.http.post<Cliente>(this.urlEndPoint, cliente, {headers: this.httpHeaders})
    }

    getCliente(id): Observable<Cliente>{
        return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`);//?Se concatena el Id
    }

    update(cliente: Cliente) : Observable<Cliente>{
        return this.http.put<Cliente>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.httpHeaders});
    }

    delete(id: number): Observable<Cliente> {
        return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}) 
    }

}