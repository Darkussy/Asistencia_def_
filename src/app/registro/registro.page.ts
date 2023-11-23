import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { IonAvatar,IonModal } from '@ionic/angular';
import type { Animation } from '@ionic/angular';
import { AnimationController } from '@ionic/angular';
import { AutenticacionService } from '../servicios/autenticacion.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

    
  constructor(private router: Router, private auth: AutenticacionService) {}
  
  public alertButtons = ["Ok"];
  public mensaje ="";

  N_user={
    Mail:"",
    Nombre:"",
    Contra:"",
    Confirmacion:""
  }

  ngOnInit() {
  }

  confirma() {
    this.auth.register(this.N_user.Mail,this.N_user.Nombre, this.N_user.Contra).then((res) => {
      if (res) {
        this.mensaje = "Usuario Existente";
      } else {
        this.mensaje = "Registro Exitoso";
        this.router.navigate(['/home']); 
      }
    })
  }
  
  Validacion(){
    if(this.N_user.Mail.trim() !="" || this.N_user.Nombre.trim() !="" ){
      if(this.N_user.Contra.trim() !="" && this.N_user.Confirmacion.trim() !=""){
        if(this.N_user.Contra == this.N_user.Confirmacion ){
          this.confirma();
        }else{
          this.mensaje ="Las contraseñas deben coincidir";
        }
      }else{
        this.mensaje ="Debe ingresar su nueva contraseña";
      }
    }else{
      this.mensaje ="Debe ingresar su mail y/o nombre";
    }
  }

  
  

}
