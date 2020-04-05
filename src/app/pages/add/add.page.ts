import { Component, OnInit } from '@angular/core';
import { ToDoService } from 'src/app/services/to-do.service';
import { ActivatedRoute } from '@angular/router';
import { List } from 'src/app/models/list.model';
import { ListItem } from 'src/app/models/list-item.model';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html'
})
export class AddPage implements OnInit {
  
  list: List;
  itemName = '';

  constructor( private toDoService: ToDoService,
               private route: ActivatedRoute ) { 
    const listId = this.route.snapshot.paramMap.get('listId');
    this.list = this.toDoService.getList(listId);
  }

  ngOnInit() {
  }

  addItem() {
    if ( this.itemName.length === 0 ) {
      return;
    } else {
      const newItem = new ListItem( this.itemName);
      this.list.items.push(newItem);
      this.itemName = '';
      this.toDoService.saveStorage();
    }
  }

  changeCheck(item: ListItem) {
    const slopes = this.list.items.filter( itemData => !itemData.completed).length;
    if ( slopes === 0 ) {
      this.list.completedOn = new Date();
      this.list.completed = true;
    } else {
      this.list.completedOn = null;
      this.list.completed = false;
    }
    this.toDoService.saveStorage();
  }

  delete(i: number) {
    this.list.items.splice(i,1);
    this.toDoService.saveStorage;
  }

}
