import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular'

//Generamos un modelo interface para el usuario que llamara la base de datos
interface User {
  usuario: string;
  nombre: string;
  password: string;
  
}

@Injectable({
  providedIn: 'root'
})

export class AutenticacionService {
  public autenticado!: boolean;

  private local!: Storage;

  constructor(private storage: Storage, private route: Router) {
    this.init()
  }

  //Al iniciar el modulo iniciamos el storage y guardamos la instancia en una variable local llamada local
  async init() {
    const storage = await this.storage.create();
    this.local = storage;

  }

  //Funcion Registrar Usuario
  async register(usuario: string, nombre: string, password: string): Promise<Boolean> {
    const users = await this.local?.get('users') || [];
   
    const existe = users.find((us: User) => us.usuario === usuario  && us.password === password);
    if (existe) {
      console.log("Usuario Existente")
      return true;
    } else {
      const nuevo: User = { usuario, nombre, password };
      users.push(nuevo);
      await this.local.set('users', users);
      console.log("Registro Exitoso")
      return false;
    }
  }

  async login(usuario: string, password: string): Promise<boolean> {
    //Llamamos el arreglo desde el Storage
    const users: User[] = (await this.local.get('users')) || [];
    //obtenermos el valor del usuario que buscamos 
    const user = users.find((us: User) => us.usuario === usuario && us.password === password);
    //Si el usuario existe autentificamos y el metodo retorna true
    //caso contrario lanzamos false y no esta activo
    if (user) {
      
      this.autenticado = true;
      return true;
    }
    this.autenticado = false;
    return false;

  }

  logout() {
    this.autenticado = false;
    this.route.navigate(['/home']);
  }
}
