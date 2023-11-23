import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { AuthGuard } from '../auth.guard';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.page.html',
  styleUrls: ['./alumno.page.scss'],
})
export class AlumnoPage implements OnInit {

  constructor(private router: Router, private activatedRouter: ActivatedRoute, private authGuard: AuthGuard ) { }

  public alertButtons = ['OK'];
  public user = {
    usuario: "",
    nombre: "",
    password: ""
    
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
