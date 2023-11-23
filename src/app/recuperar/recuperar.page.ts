import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { IonAvatar,IonModal } from '@ionic/angular';
import type { Animation } from '@ionic/angular';
import { AnimationController } from '@ionic/angular';
import { AutenticacionService } from '../servicios/autenticacion.service';


@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {

    
  constructor(private router: Router, private auth: AutenticacionService) {}
  
  public alertButtons = ["Ok"];
  public mensaje =""

  Contra={
    usuario:"",
    Nueva:"",
    Confirmacion:""
  }
  
  Validacion(){
    if(this.Contra.usuario.trim() !=""){
      if(this.Contra.Nueva.trim() !="" && this.Contra.Confirmacion.trim() !=""){
        if(this.Contra.Nueva == this.Contra.Confirmacion ){
          this.mensaje ="Contraseña modificada correctamente";
          this.router.navigate(['/home']);
  
        }else{
          this.mensaje ="Las contraseñas deben coincidir";
        }
      }else{
        this.mensaje ="Debe ingresar su nueva contraseña";
      }
    }else{
      this.mensaje ="Debe ingresar su mail";
    }
  }


  ngOnInit() {
  }

}
