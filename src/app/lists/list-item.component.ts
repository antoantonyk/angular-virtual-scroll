import { Component, Input } from '@angular/core';

export interface ListItem {
  index?: number;
  name?: string;
  gender?: string;
  age?: number;
  email?: string;
  phone?: string;
  address?: string;
}

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent {
  @Input()
  item: ListItem;
}
