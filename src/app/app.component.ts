import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // @Input() countryTotal!: boolean;
  // @Input() showProvince!: boolean;
  // @Input() showHealthRegion!: boolean;
  // @Input() showCases!: boolean;
  // @Input() showDeaths!: boolean;
  // @Input() showRecovered!: boolean;
  // @Input() showC_Cases!: boolean;
  // @Input() showC_Deaths!: boolean;
  // @Input() showC_Recovered!: boolean;
  // @Output() itemEvent = new EventEmitter<boolean>();
  // addItem(){
  //   this.itemEvent.emit(this.countryTotal)
  //   this.itemEvent.emit(this.showProvince)
  //   this.itemEvent.emit(this.showHealthRegion)
  //   this.itemEvent.emit(this.showCases)
  //   this.itemEvent.emit(this.showDeaths)
  //   this.itemEvent.emit(this.showRecovered)
  //   this.itemEvent.emit(this.showC_Cases)
  //   this.itemEvent.emit(this.showC_Deaths)
  //   this.itemEvent.emit(this.showC_Recovered)
  // }
  ngOnInit():void {
    // this.addItem();
  }
  title = 'covid-tracker';
}
