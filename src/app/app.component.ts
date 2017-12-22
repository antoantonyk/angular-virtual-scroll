import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ListItem } from './lists/list-item.component';

declare var hljs;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  items: ListItem[];

  readonly codeListWithApi = `
        import { ChangeEvent } from 'angular2-virtual-scroll';
        ...

        @Component({
            selector: 'list-with-api',
            template: \`
                <virtual-scroll [items]="buffer" (update)="scrollItems = $event"
                    (change)="onListChange($event)">

                    <list-item *ngFor="let item of scrollItems" [item]="item"> </list-item>
                    <div *ngIf="loading" class="loader">Loading...</div>

                </virtual-scroll>
            \`
        })
        export class ListWithApiComponent implements OnChanges {

            @Input()
            items: ListItem[];

            buffer: ListItem[] = [];
            loading: boolean;

            onListChange(event: ChangeEvent) {
                if (event.end !== this.buffer.length) return;
                this.loading = true;
                this.fetchNextChunk(this.buffer.length, 10).then(chunk => {
                    this.buffer = this.buffer.concat(chunk);
                    this.loading = false;
                }, () => this.loading = false);
            }

            fetchNextChunk(skip: number, limit: number): Promise<ListItem[]> {
                return new Promise((resolve, reject) => {
                    ....
                });
            }
        }
    `.replace(/^        /mg, '');

  constructor(private http: HttpClient) { }

  ngOnInit() {
    hljs.initHighlightingOnLoad();

    this.http.get<any>('assets/data/items.json')
      .subscribe(data => this.items = data);
  }

}
