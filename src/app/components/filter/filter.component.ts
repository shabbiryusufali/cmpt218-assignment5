import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  // countryTotal:boolean
  // showProvince:boolean;
  // showHealthRegion:boolean;
  // showCases:boolean;
  // showDeaths:boolean;
  // showRecovered:boolean;
  // showC_Cases:boolean;
  // showC_Deaths:boolean;
  // showC_Recovered:boolean;

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
  // constructor(private route: ActivatedRoute) {
  //   this.countryTotal = false;
  //   this.showProvince = false;
  //   this.showHealthRegion = false;
  //   this.showRecovered = false;
  //   this.showC_Cases = false;
  //   this.showDeaths = false;
  //   this.showC_Deaths = false;
  //   this.showC_Recovered = false;
  //   this.showCases = false;
  // }
  

  ngOnInit(): void {
  //   this.route.queryParams.subscribe(params => {
  //     console.log(params);
  //     let stringOfParams = JSON.stringify(params);
  //     let JSONParams = JSON.parse(stringOfParams);
  //     if(JSONParams.c_cas == "on"){
  //       this.showC_Cases = true;
  //       console.log(this.showC_Cases);
  //     }
  //     if(JSONParams.c_dea == "on"){
  //       this.showC_Deaths = true;
  //       console.log(this.showC_Deaths);
  //     }
  //     if(JSONParams.c_rec == "on"){
  //       this.showC_Recovered = true;
  //       console.log(this.showC_Recovered);
  //     }
  //     if(JSONParams.rec == "on"){
  //       this.showRecovered = true;
  //       console.log(this.showRecovered);
  //     }
  //     if(JSONParams.cas == "on"){
  //       this.showCases = true;
  //       console.log(this.showCases);
  //     }
  //     if(JSONParams.dea == "on"){
  //       this.showDeaths = true;
  //       console.log(this.showDeaths);
  //     }
  //     if(JSONParams.locationFilter == "canada"){
  //       this.countryTotal = true;
  //       console.log(this.countryTotal);
  //     }
  //     if(JSONParams.locationFilter == "hr"){
  //       this.showHealthRegion = true;
  //       console.log(this.showHealthRegion);
  //     } else {
  //       this.showProvince = true;
  //       console.log(this.showProvince);
  //     }
  //     this.addItem();
  //   });
  }

}
