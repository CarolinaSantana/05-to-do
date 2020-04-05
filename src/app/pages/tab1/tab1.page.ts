import { Component } from '@angular/core';
import { ToDoService } from 'src/app/services/to-do.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {


  constructor( public toDoService: ToDoService,
               private router: Router,
               private alertCtrl: AlertController ) {

  }

  async addList() {
    const alert = await this.alertCtrl.create({
      header: 'Nueva lista',
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: 'Nombre de la lista'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Crear',
          handler: (data) => {
            if ( data.title.length === 0 ) {
              return;
            } else {
              const listId = this.toDoService.newList(data.title);
              this.router.navigateByUrl(`/tabs/tab1/add/${ listId }`);
            }
          }
        }
      ]
    });

    await alert.present();

  }

}


