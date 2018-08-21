## About

This is a date picker directive.

## Installation

Install through npm:
```
npm install --save zr-datepicker
```

Then include in your apps module:

```typescript
import { NgModule } from '@angular/core';
import { ZrDatepickerModule } from 'zr-datepicker';

@NgModule({
  imports: [
    ZrDatepickerModule
  ]
})
export class MyModule {}
```

Finally use in one of your apps components:
```typescript
import { Component } from '@angular/core';

@Component({
  template: `<input class="form-control" type="text" id="icon" appDatepicker [format]="'yyyy-mm-dd hh:ii:00'" [(ngModel)]="date1" />`
})
export class MyComponent {
  date1: any;
}
```