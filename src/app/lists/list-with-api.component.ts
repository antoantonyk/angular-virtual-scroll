import { Component, OnChanges, Input, SimpleChanges } from '@angular/core';

import { ListItem } from './list-item.component';
import { ChangeEvent } from '../virtual-scroll/virtual-scroll.component';

@Component({
  selector: 'app-list-with-api',
  templateUrl: './list-with-api.component.html',
  styleUrls: ['./list-with-api.component.scss']
})
export class ListWithApiComponent implements OnChanges {

  @Input()
  items: ListItem[];
  scrollItems: ListItem[];

  indices: ChangeEvent;
  buffer: ListItem[] = [];
  readonly bufferSize: number = 10;
  timer;
  loading: boolean;

  ngOnChanges(changes: SimpleChanges) {
    this.reset();
  }

  reset() {
    this.fetchNextChunk(0, this.bufferSize, {}).then(chunk => this.buffer = chunk);
  }

  fetchMore(event: ChangeEvent) {
    this.indices = event;
    if (event.end === this.buffer.length) {
      this.loading = true;
      this.fetchNextChunk(this.buffer.length, this.bufferSize, event).then(chunk => {
        this.buffer = this.buffer.concat(chunk);
        this.loading = false;
      }, () => this.loading = false);
    }
  }

  fetchNextChunk(skip: number, limit: number, event?: any): Promise<ListItem[]> {
    return new Promise((resolve, reject) => {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        if (skip < this.items.length) {
          return resolve(this.items.slice(skip, skip + limit));
        }
        reject();
      }, 1000 + Math.random() * 1000);
    });
  }
}
