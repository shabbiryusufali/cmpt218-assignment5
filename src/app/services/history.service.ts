import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataSource } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';

export interface searchItem {
  url : string | null;
  columns: string[] | null;
  region : string | null;
  startDate: string | null;
  endDate: string | null;
  dateRange: boolean;
  date: string | undefined;
}
const SEARCH_DATA:searchItem[] = [];
@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  listOfSearches = new MatTableDataSource(SEARCH_DATA);

  constructor(private httpClient:HttpClient) { }

  getSearches(){
    this.httpClient.get("https://218.selfip.net/apps/vB74FiIzN8/collections/searches/documents/?format=api").forEach(search => {  
      
      console.log(search);
      const stringOfObjects = JSON.stringify(search);
      const jsonObject = JSON.parse(stringOfObjects);
      let summaryOfData = jsonObject.data;
      let urlToSearch = summaryOfData.url;
      let columnsToSearch = summaryOfData.columns;
      let regionToSearch = summaryOfData.region;
      let startDateToSearch = summaryOfData.startDate;
      let endDateToSearch = summaryOfData.endDate;
      let dateRange = summaryOfData.dateRange;
      let date = summaryOfData.date;
      let newSearch = {url:urlToSearch, columns:columnsToSearch, region:regionToSearch, startDate:startDateToSearch, endDate:endDateToSearch, dateRange, date:date};
      this.listOfSearches.data.push(newSearch);
    })
    console.log(this.listOfSearches)

    return this.listOfSearches;
  }

  putSearch(url:string, region:string, date:string, dateRange:boolean, startDate:string, endDate:string, columns:string[]){
    let randomString:string = this.getRandomString(10);
    this.httpClient.post('https://218.selfip.net/apps/vB74FiIzN8/collections/data1/documents/', `{"key":"${randomString}", "data":{
      "url":"${url}",
      "columns":${columns},
      "region":"${region}",
      "date":"${date}"
      "startDate":"${startDate}"
      "endDate":"${endDate}"
      "dateRange":${dateRange}
      }
    }`)
  }


  getRandomString(length:number) {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for ( var i = 0; i < length; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
}

}
