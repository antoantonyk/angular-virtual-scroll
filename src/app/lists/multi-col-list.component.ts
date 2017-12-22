import { Component, Input, OnChanges, ViewChild } from '@angular/core';

import { ListItem } from './list-item.component';
import { VirtualScrollComponent } from './../virtual-scroll/virtual-scroll.component';

@Component({
  selector: 'app-multi-col-list',
  templateUrl: './multi-col-list.component.html',
  styleUrls: ['./multi-col-list.component.scss']
})
export class MultiColListComponent implements OnChanges {

  @Input()
  items: ListItem[];

  scrollItems: ListItem[];

  indices: any;

  filteredList: ListItem[];

  @ViewChild(VirtualScrollComponent)
  virtualScroll: VirtualScrollComponent;

  reduceListToEmpty() {
    this.filteredList = [];
  }

  reduceList() {
    this.filteredList = (this.items || []).slice(0, 100);
  }

  sortByName() {
    this.filteredList = [].concat(this.filteredList || []).sort((a, b) => -(a.name < b.name) || +(a.name !== b.name));
  }

  sortByIndex() {
    this.filteredList = [].concat(this.filteredList || []).sort((a, b) => -(a.index < b.index) || +(a.index !== b.index));
  }

  setToFullList() {
    this.filteredList = (this.items || []).slice();
  }

  scrollTo() {
    this.virtualScroll.scrollInto(this.items[50]);
  }

  ngOnChanges() {
    this.setToFullList();
  }
}
