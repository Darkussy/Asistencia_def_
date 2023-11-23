import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { AuthGuard } from '../auth.guard';


@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.page.html',
  styleUrls: ['./profesor.page.scss'],
})
export class ProfesorPage implements OnInit {

  constructor(private router: Router, private activatedRouter: ActivatedRoute, private authGuard: AuthGuard ) { }

  public alertButtons = ['OK'];
  public user = {
    usuario: "",
    nombre: "",
    password: ""
  }
  public clase = {
    fecha: "",
    nombre_clase:"",
    seccion:""
  }

  ngOnInit() {
    this.activatedRouter.queryParams.subscribe(() => {
      let state = this.router.getCurrentNavigation()?.extras.state;
      if (state) {
        this.user.usuario = state['user'].usuario;
        this.user.nombre = state['user'].nombre;
        this.user.password = state['user'].password;
        console.log(this.user);
      }
    })
  }
}
