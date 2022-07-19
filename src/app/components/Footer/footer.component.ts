import { Component } from "@angular/core";

@Component({
    selector: 'Footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css']
})
export class Footer{
   public description: any = {nombre: 'Ugarte Company', derechos: 'Derechos Reservados'}
}