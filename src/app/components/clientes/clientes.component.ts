import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  

  listaClientes: Cliente[];//!Creamos un atributo del tipo de la clase Cliente y va a ser un arreglo
  constructor(private clienteService: ClienteService, private router: Router,) { }//!Declaramos un atributo en el constructor del tipo de la clase Service la cual estamos inyectando

  
  ngOnInit(): void {
    
  this.clienteService.getClientes().subscribe(//!mandamos llamar el metodo .getClientes() y con .suscribe iniciamos el Observable 
    clientes => this.listaClientes = clientes, //!esta funcion le asigna el valor de clientes a listaCliente
  );


  }

  delete(cliente: Cliente): void {
    Swal.fire({
      title: `Eliminar a ${cliente.nombre}`,
      text: 'Estas seguro de eliminar al cliente?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.delete(cliente.id).subscribe(
          response => {
          this.listaClientes = this.listaClientes.filter(cli => cli !== cliente)
          Swal.fire('Eliminado!', 'El cliente ha sido eliminado.', 'success');
        });
      }
    })
  }

}

