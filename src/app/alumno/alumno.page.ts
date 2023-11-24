import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController } from '@ionic/angular';
import { AutenticacionService } from '../servicios/autenticacion.service';


@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.page.html',
  styleUrls: ['./alumno.page.scss'],
})
export class AlumnoPage implements OnInit {
  isSupported = false;
  barcodes: Barcode[] = [];

  constructor(private router: Router, private activatedRouter: ActivatedRoute, private authGuard: AuthGuard ,private alertController: AlertController, private auth: AutenticacionService) { }

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

    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });

  }

  async scan(): Promise<void> {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert();
      return;
    }
    const { barcodes } = await BarcodeScanner.scan();
    this.barcodes.push(...barcodes);
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permission denied',
      message: 'Please grant camera permission to use the barcode scanner.',
      buttons: ['OK'],
    });
    await alert.present();
  }

  cerrarSesion(){
    this.auth.logout();
  }

}
