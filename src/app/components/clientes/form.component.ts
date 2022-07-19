import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  public cliente: Cliente = new Cliente();
  public titulo: string = 'Formulario de clientes';

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private activateRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cargarCliente(); //!Se tiene que cargar el metodo aqui, ya que se debe cargar una vez se inicia el componente
  }

  public create(): void {
    this.clienteService.create(this.cliente).subscribe((cliente) => {
      //!Aqui le estamos dando los valores registrados al objeto, si los leemos de nuevo ya estaran asignados como en la alerta de abajo
      this.router.navigate(['/clientes']);
      Swal.fire(
        'Cliente Guardado',
        `El cliente ${cliente.nombre} ${cliente.apellido} se registro con exito`,
        'success'
      );
    });
  }

  public cargarCliente(): void {
    this.activateRouter.params.subscribe((params) => {
      let id = params['id'];
      if (id) {
        this.clienteService
          .getCliente(id)
          .subscribe((cliente) => (this.cliente = cliente));
      }
    });
  }

  update(): void {
    this.clienteService.update(this.cliente).subscribe((cliente) => {
      this.router.navigate(['/clientes']);
      Swal.fire(
        `${cliente.nombre} Actualizado`,
        'Cliente actualizado con exito',
        'success'
      );
    });
  }

}
