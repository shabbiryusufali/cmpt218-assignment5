import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { HistoryService } from 'src/app/services/history.service';
import {CovidDataService} from '../../services/covid-data.service';

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



@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit, AfterViewInit {


  columnsToDisplay:string[] = ['province'];
  dataSource = new MatTableDataSource(COVID_DATA);
  countryTotal: boolean;
  showProvince: boolean;
  showHealthRegion: boolean;
  showRecovered: boolean;
  showC_Cases: boolean;
  showDeaths: boolean;
  showC_Deaths: boolean;
  showC_Recovered: boolean;
  showCases: boolean;
  useRange: boolean;
  showActive: boolean;
  dateDisplay: string | undefined;

   constructor( private dataService: CovidDataService, private http: HttpClient, private _liveAnnouncer: LiveAnnouncer, private route: ActivatedRoute,) {

  this.dateDisplay = dataService.date

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



    this.route.queryParams.subscribe(queryParams => {
      if(queryParams){
        console.log('printing locationFilter...')
        console.log(queryParams['locationFilter'])
        console.log('... printed')
      }
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


      if(JSONParams.locationFilter == 'hr'){
        this.columnsToDisplay.push('region')
      }

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

    })


  }


ngAfterContentInit():void {

}

  ngOnInit() : void{
    this.dataSource = this.dataService.getData();
  }

  @ViewChild(MatSort)
  sort: MatSort = new MatSort;

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


  getParams(){

  }

}

