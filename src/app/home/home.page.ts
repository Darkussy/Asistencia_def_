import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { IonAvatar, IonModal } from '@ionic/angular';
import type { Animation } from '@ionic/angular';
import { AnimationController } from '@ionic/angular';
import { AutenticacionService } from '../servicios/autenticacion.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild(IonAvatar, { read: ElementRef }) avatar!: ElementRef<HTMLIonAvatarElement>;

  @ViewChild(IonModal) modal!: IonModal;



  constructor(private router: Router, private auth: AutenticacionService) { }
  public mensaje = ""
  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel'
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        this.router.navigate(['/recuperar']);
      }
    }
  ];

  user = {
    usuario: "",
    password: ""
  }

  SendInformacion() {
    this.auth.login(this.user.usuario, this.user.password).then(() => {
      if (this.auth.autenticado) {

        if (this.user.usuario.includes("@duocuc.cl") ) {
          let navigationExtras: NavigationExtras = { state: { user: this.user } }
          this.router.navigate(['/alumno'], navigationExtras);

        } else if (this.user.usuario.includes("@profesor.duoc.cl") ) {
          let navigationExtras: NavigationExtras = { state: { user: this.user }}
          this.router.navigate(['/profesor'], navigationExtras);

        } else {
          this.mensaje = "Debe ingresar un correo valido de duoc";
        }
      } else {
        this.mensaje = "Debe ingresar sus credenciales";
      }
    });
  }


  enviarInformacion() {
    if (this.user.usuario != "") {
      if (this.user.usuario.includes("@duocuc.cl") && this.user.password.trim() != "") {
        let navigationExtras: NavigationExtras = {
          state: { user: this.user }
        }
        this.router.navigate(['/alumno'], navigationExtras);

      } else if (this.user.usuario.includes("@profesor.duoc.cl") && this.user.password != "") {
        let navigationExtras: NavigationExtras = {
          state: { user: this.user }
        }
        this.router.navigate(['/profesor'], navigationExtras);

      } else {
        this.mensaje = "Debe ingresar un correo valido de duoc";

      }
    } else {
      this.mensaje = "Debe ingresar sus credenciales";
    }
  }
  mostrarConsola() {
    console.log(this.user);
    if (this.user.usuario != "" && this.user.password != "") {
      this.mensaje = "Usuario Conectado";
    } else {
      this.mensaje = "Usuario y contraseña deben tener algun valor"
    }
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.mensaje = "Registro Exitoso"
    this.modal.dismiss(this.user.usuario, 'confirm');
  }

  registrate() {
    this.router.navigate(['registro']);
  }
}

