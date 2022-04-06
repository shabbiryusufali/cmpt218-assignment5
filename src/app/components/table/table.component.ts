import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';


interface covidElement {
  province:string | null;
  region: string | null,
  new_cases: number | null;
  new_deaths: number | null;
  new_recovered: number | null;
  cumulative_cases: number | null;
  cumulative_deaths : number | null;
  cumulative_recovered : number | null;
}
const COVID_DATA:covidElement[] = [];



@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit, AfterViewInit {
  
  // @Input()
  // countryTotal!: boolean;
  // @Input()
  // showProvince!: boolean;
  // @Input()
  // showHealthRegion!: boolean;
  // @Input()
  // showCases!: boolean;
  // @Input()
  // showDeaths!: boolean;
  // @Input()
  // showRecovered!: boolean;
  // @Input()
  // showC_Cases!: boolean;
  // @Input()
  // showC_Deaths!: boolean;
  // @Input()
  // showC_Recovered!: boolean;
  
  countryTotal:boolean
  showProvince:boolean;
  showHealthRegion:boolean;
  showCases:boolean;
  showDeaths:boolean;
  showRecovered:boolean;
  showC_Cases:boolean;
  showC_Deaths:boolean;
  showC_Recovered:boolean;

  columnsToDisplay:string[] = [];//['province','region','new-cases', 'new-deaths', 'new-recovered','cumulative-cases','cumulative-deaths','cumulative-recovered'];
  dataSource = new MatTableDataSource(COVID_DATA);
  constructor( private http: HttpClient, private _liveAnnouncer: LiveAnnouncer, private route: ActivatedRoute) { 
    this.countryTotal = false;
    this.showProvince = false;
    this.showHealthRegion = false;
    this.showRecovered = false;
    this.showC_Cases = false;
    this.showDeaths = false;
    this.showC_Deaths = false;
    this.showC_Recovered = false;
    this.showCases = false;
    this.route.queryParams.subscribe(params => {
      console.log(params);
      let stringOfParams = JSON.stringify(params);
      let JSONParams = JSON.parse(stringOfParams);
      if(JSONParams.c_cas == "on"){
        this.showC_Cases = true;
        console.log(this.showC_Cases);
      }
      if(JSONParams.c_dea == "on"){
        this.showC_Deaths = true;
        console.log(this.showC_Deaths);
      }
      if(JSONParams.c_rec == "on"){
        this.showC_Recovered = true;
        console.log(this.showC_Recovered);
      }
      if(JSONParams.rec == "on"){
        this.showRecovered = true;
        console.log(this.showRecovered);
      }
      if(JSONParams.cas == "on"){
        this.showCases = true;
        console.log(this.showCases);
      }
      if(JSONParams.dea == "on"){
        this.showDeaths = true;
        console.log(this.showDeaths);
      }
      console.log(JSONParams.locationFilter);
      if(JSONParams.locationFilter == 'canada'){
        this.countryTotal = true;
        console.log("canada");
      } else if(JSONParams.locationFilter == "hr"){
        this.showHealthRegion = true;
        console.log("hr");
      } else {
        this.showProvince = true;
        console.log("prov");
      }
    let locationFilter:string = "";
    console.log(locationFilter)
    if(this.countryTotal){
      locationFilter = "countryTotal";
      console.log(locationFilter)
    } else if(this.showHealthRegion) {
      locationFilter = "healthRegion";
      console.log(locationFilter)
    } else if(this.showProvince){
      locationFilter = "provinceFilter";
      console.log(locationFilter)
    }
    let searchQuery:string = "";
    if(locationFilter == "healthRegion"){
      searchQuery = `https://api.opencovid.ca/summary?loc=hr&date=2022-04-04`;
      this.columnsToDisplay = ['province','region'];
      if(this.showC_Cases){
        this.columnsToDisplay.push('cumulative-cases');
      }
      if(this.showC_Deaths){
        this.columnsToDisplay.push('cumulative-deaths');
      }
      if(this.showCases){
        this.columnsToDisplay.push('new-cases');
      }
      if(this.showDeaths){
        this.columnsToDisplay.push('new-cases');
      }
    } else if (locationFilter == "countryTotal") {
      searchQuery = `https://api.opencovid.ca/summary?loc=canada&date=2022-04-04`;
      this.columnsToDisplay = ['province'];
      if(this.showCases){
        this.columnsToDisplay.push('new-cases');
      }
      if(this.showDeaths){
        this.columnsToDisplay.push('new-deaths');
      }
      if(this.showRecovered){
        this.columnsToDisplay.push('new-recovered');
      }
      
      if(this.showC_Cases){
        this.columnsToDisplay.push('cumulative-cases');
      }
      if(this.showC_Deaths){
        this.columnsToDisplay.push('cumulative-deaths');
      }
      if(this.showC_Recovered){
        this.columnsToDisplay.push('cumulative-recovered');
      }
    } else if (locationFilter == "provinceFilter"){
      searchQuery = `https://api.opencovid.ca/summary?loc=prov&date=2022-04-04`
      this.columnsToDisplay = ['province'];
      if(this.showCases){
        this.columnsToDisplay.push('new-cases');
      }
      if(this.showDeaths){
        this.columnsToDisplay.push('new-deaths');
      }
      if(this.showRecovered){
        this.columnsToDisplay.push('new-recovered');
      }
      
      if(this.showC_Cases){
        this.columnsToDisplay.push('cumulative-cases');
      }
      if(this.showC_Deaths){
        this.columnsToDisplay.push('cumulative-deaths');
      }
      if(this.showC_Recovered){
        this.columnsToDisplay.push('cumulative-recovered');
      }
    }
    this.http.get<Object>(searchQuery).subscribe(
      (data:Object)=>{
        console.log(data);
        let dataAsString:string = JSON.stringify(data);
        let JSONData = JSON.parse(dataAsString);
        console.log(JSONData.summary);
        let summaryOfData = JSONData.summary;
        summaryOfData.forEach((element: {
          health_region: string | null; province: string | null; cases: number | null; deaths: number | null; recovered: number | null; 
          cumulative_cases: number | null; cumulative_deaths: number | null; cumulative_recovered: number | null; 
}) => {
          let newElement: covidElement = {
            province: element.province,
            region: element.health_region,
            new_cases: element.cases,
            new_deaths: element.deaths,
            new_recovered: element.recovered,
            cumulative_cases: element.cumulative_cases,
            cumulative_deaths: element.cumulative_deaths,
            cumulative_recovered: element.cumulative_recovered
          }
          console.log(newElement)
          this.dataSource.data.push(newElement);
          console.log(this.dataSource.data.length)
          this.refresh();
          
        });
      
      }
    )
  })
  }

  ngOnInit(){    
  //     this.route.queryParams.subscribe(params => {
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
  //     console.log(JSONParams.locationFilter);
  //     if(JSONParams.locationFilter == 'canada'){
  //       this.countryTotal = true;
  //       console.log("canada");
  //     } else if(JSONParams.locationFilter == "hr"){
  //       this.showHealthRegion = true;
  //       console.log("hr");
  //     } else if(JSONParams.locationFilter == "prov"){
  //       this.showProvince = true;
  //       console.log("prov");
  //     }
  //   })
  //   let locationFilter:string = "";
  //   console.log(locationFilter)
  //   if(this.countryTotal){
  //     locationFilter = "countryTotal";
  //     console.log(locationFilter)
  //   } else if(this.showHealthRegion) {
  //     locationFilter = "healthRegion";
  //     console.log(locationFilter)
  //   } else {
  //     locationFilter = "provinceShow";
  //     console.log(locationFilter)
  //   }
  }
  refresh() {
    this.dataSource.data = this.dataSource.data;
  }

  @ViewChild(MatSort)
  sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

}

