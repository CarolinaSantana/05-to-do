import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ToDoService } from 'src/app/services/to-do.service';
import { List } from 'src/app/models/list.model';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html'
})
export class ListsComponent implements OnInit {

  @ViewChild( IonList, null ) list: IonList;
  @Input() completed;

  constructor( public toDoService: ToDoService,
               private router: Router,
               private alertCtrl: AlertController) { }

  ngOnInit() {}

  selectedList(list: List) {
    if (this.completed) {
      this.router.navigateByUrl(`/tabs/tab2/add/${list.id}`);
    } else { 
      this.router.navigateByUrl(`/tabs/tab1/add/${list.id}`);
    }
  }

  deleteList(list: List) {
    this.toDoService.deleteList(list);
  }

  async editList(list: List) {
    const alert = await this.alertCtrl.create({
       header: 'Nueva lista',
       inputs: [
         {
           name: 'title',
           type: 'text',
           value: list.title,
           placeholder: 'Nombre de la lista'
         }
       ],
       buttons: [
         {
           text: 'Cancelar',
           role: 'cancel',
           handler: () => {
            this.list.closeSlidingItems();
           }
         },
         {
           text: 'Actualizar',
           handler: (data) => {
             if ( data.title.length === 0 ) {
               return;
             } else {
               list.title = data.title;
               this.toDoService.saveStorage();
               this.list.closeSlidingItems();
             }
           }
         }
       ]
      });
      await alert.present();
  }

}
