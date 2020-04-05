import { ListItem } from './list-item.model';


export class List {

    id: number;
    title: string;
    createdOn: Date;
    completedOn: Date;
    completed: boolean;
    items: ListItem[];

    constructor( title: string) {
        this.title = title;
        this.createdOn = new Date();
        this.completed = false;
        this.items = [];
        this.id = new Date().getTime();
    }

}