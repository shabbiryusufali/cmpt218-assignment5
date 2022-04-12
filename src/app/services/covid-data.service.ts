import { LiveAnnouncer } from '@angular/cdk/a11y';
import { DataSource } from '@angular/cdk/collections';
import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HistoryService } from './history.service';



interface covidElement {
  province:string | null;
  region: string | null,
  new_cases: number | null;
  new_deaths: number | null;
  new_recovered: number | null;
  cumulative_cases: number | null;
  cumulative_deaths : number | null;
  cumulative_recovered : number | null;
  active_cases : number | null;
}
const COVID_DATA:covidElement[] = [];




@Injectable({
  providedIn: 'root'
})
export class CovidDataService {
  countryTotal:boolean
  showProvince:boolean;
  showHealthRegion:boolean;
  showCases:boolean;
  showDeaths:boolean;
  showRecovered:boolean;
  showC_Cases:boolean;
  showC_Deaths:boolean;
  showC_Recovered:boolean;
  todayDate:string = formatDate(new Date(), 'yyyy-MM-dd', 'en');
  useRange: boolean;
  date: string | undefined;
  showActive: boolean;
  startDate: string | undefined ;
  endDate: string | undefined ;
;

  columnsToDisplay:string[] = [];
  dataSource = new MatTableDataSource(COVID_DATA);

   constructor( private http: HttpClient, private _liveAnnouncer: LiveAnnouncer, private route: ActivatedRoute, private historyService:
    HistoryService, private router:Router) {
    console.log(this.todayDate)
    this.countryTotal = false;
    this.showProvince = false;
    this.showHealthRegion = false;
    this.showRecovered = false;
    this.showC_Cases = false;
    this.showDeaths = false;
    this.showC_Deaths = false;
    this.showC_Recovered = false;
    this.showCases = false;
    this.useRange = false;
    this.showActive = false;


    var searchQuery:string = "";


    this.route.queryParams.subscribe((queryParams: { [x: string]: any; }) => {
      if(queryParams){
        console.log('printing locationFilter...')
        console.log(queryParams['locationFilter'])
        console.log('... printed')
      }
      {
      console.log(queryParams);
      let stringOfParams = JSON.stringify(queryParams);
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
      if(JSONParams.dateToggle == "on"){
        this.useRange = true;
        console.log(this.useRange);
      }
      if(JSONParams.act == "on"){
        this.showActive = true;
        console.log(this.showActive);
      }
      if(JSONParams.start_date){
        this.startDate = JSONParams.start_date;
        console.log(this.startDate);
      }
      if(JSONParams.end_date){
        this.endDate = JSONParams.end_date;
        console.log(this.endDate);
      }
      if(JSONParams.date){
        this.date = JSONParams.date;
        console.log(this.date);
      }
      console.log(JSONParams.locationFilter);
      if(JSONParams.locationFilter){
        if(JSONParams.locationFilter == 'canada'){
          this.countryTotal = true;
          console.log("canada");
        } else if(JSONParams.locationFilter == "hr"){
          this.showHealthRegion = true;
          console.log("hr");
        } else if (JSONParams.locationFilter == "prov"){
          this.showProvince = true;
          console.log("prov");
        }  else if (JSONParams.locationFilter == ""){
            this.showProvince = true;
            console.log("prov");
        }
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
    if(locationFilter == "healthRegion"){
      searchQuery = `https://api.opencovid.ca/summary?loc=hr`;
      console.log(this.startDate)
      if(this.startDate){
        searchQuery = searchQuery + `&after=${this.startDate}`;
      }
      if(this.endDate){
        searchQuery = searchQuery + `&before=${this.endDate}`;
      }
      if(!this.useRange && this.date){
        searchQuery = searchQuery + `&date=${this.date}`
      }
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

      if(!this.showC_Cases && !this.showC_Deaths && !this.showC_Recovered && !this.showCases && !this.showDeaths && !this.showRecovered){
        this.columnsToDisplay.push('new-cases', 'new-deaths', 'cumulative-cases');
      }
    } else if (locationFilter == "countryTotal") {
      searchQuery = `https://api.opencovid.ca/summary?loc=canada`;
      if(this.startDate){
        searchQuery = searchQuery + `&after=${this.startDate}`;
      }
      if(this.endDate){
        searchQuery = searchQuery + `&before=${this.endDate}`;
      }
      if(!this.useRange && this.date){
        searchQuery = searchQuery + `&date=${this.date}`
      }
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

      if(!this.showC_Cases && !this.showC_Deaths && !this.showC_Recovered && !this.showCases && !this.showDeaths && !this.showRecovered &&!this.showActive){
        this.columnsToDisplay.push('new-cases', 'new-deaths', 'new-recovered',  'cumulative-cases', 'active-cases');
      }
    } else if (locationFilter == "provinceFilter"){
      searchQuery = `https://api.opencovid.ca/summary?loc=prov`
      if(this.startDate){
        searchQuery = searchQuery + `&after=${this.startDate}`;
      }
      if(this.endDate){
        searchQuery = searchQuery + `&before=${this.endDate}`;
      }
      if(!this.useRange && this.date){
        searchQuery = searchQuery + `&date=${this.date}`
      }
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
      if(this.showActive){
        this.columnsToDisplay.push('active-cases');
      }
      if(!this.showC_Cases && !this.showC_Deaths && !this.showC_Recovered && !this.showCases && !this.showDeaths && !this.showRecovered &&!this.showActive){
        this.columnsToDisplay.push('new-cases', 'new-deaths', 'new-recovered',  'cumulative-cases', 'active-cases');
      }
      if(this.date && this.startDate && this.endDate){
        historyService.putSearch(this.router.url, locationFilter, this.date, this.useRange, this.startDate, this.endDate, this.columnsToDisplay)
      }
    }
    console.log(searchQuery);
    this.generateValues(searchQuery);
  }

  })

}

  private generateValues(searchQuery: string) {
    this.http.get<Object>(searchQuery).subscribe(
      (data: Object) => {
        console.log(data);
        let dataAsString: string = JSON.stringify(data);
        let JSONData = JSON.parse(dataAsString);
        console.log(JSONData.summary);
        let summaryOfData = JSONData.summary;
        console.log(summaryOfData);
        summaryOfData.forEach((element: {
          health_region: string | null; province: string | null; cases: number | null; deaths: number | null; recovered: number | null;
          cumulative_cases: number | null; cumulative_deaths: number | null; cumulative_recovered: number | null; active_cases: number | null ;
        }) => {
          let x = false;
          this.dataSource.data.forEach(entry=>{
            if(entry.province == element.province && element.health_region == entry.region){
              console.log(entry.province)
              console.log(element.province)
              console.log(element.health_region)
              console.log(entry.region)
              if(element.cases && entry.new_cases){
                entry.new_cases += element.cases
              }
              if(element.deaths && entry.new_deaths){
                entry.new_deaths += element.deaths
              }
              if(element.recovered && entry.new_recovered){
                entry.new_recovered += element.recovered
              }
              if(element.cumulative_cases && entry.cumulative_cases){
                entry.cumulative_cases = element.cumulative_cases
              }
              if(element.cumulative_deaths && entry.cumulative_deaths){
                entry.cumulative_deaths = element.cumulative_deaths
              }
              if(element.cumulative_recovered && entry.cumulative_recovered){
                entry.cumulative_recovered = element.cumulative_recovered
              }
              if(element.active_cases && entry.active_cases){
                entry.active_cases = element.active_cases;
              }
              x = true;
            }
          })
          if(x == false){
          let newElement: covidElement = {
            province: element.province,
            region: element.health_region,
            new_cases: element.cases,
            new_deaths: element.deaths,
            new_recovered: element.recovered,
            cumulative_cases: element.cumulative_cases,
            cumulative_deaths: element.cumulative_deaths,
            cumulative_recovered: element.cumulative_recovered,
            active_cases: element.active_cases
          };
          console.log(newElement);
          this.dataSource.data.push(newElement);
          }
          console.log(this.dataSource.data.length);
          this.refresh();

        });

      }
    );
  }

  getData(){
    return this.dataSource;
  }
  getColumns(){
    return this.columnsToDisplay;
  }

  refresh() {
    this.dataSource.data = this.dataSource.data;
  }
}
