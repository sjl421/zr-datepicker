import { Component } from '@angular/core';

@Component({
  selector: 'directive-demo-app',
  template: `
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-2">
          <h3>基础用法</h3>
          <input class="form-control" type="text" id="icon" appDatepicker [format]="'yyyy-mm-dd hh:ii:00'" [(ngModel)]="date1" />
        </div>
      </div>
    </div>`
})
export class DemoComponent {
  date1: any;
}
