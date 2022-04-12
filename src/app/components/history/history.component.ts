import { Component, OnInit } from '@angular/core';
import { HistoryService } from 'src/app/services/history.service';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';



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


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  columnsToDisplay: string[] = ['region_search', 'columnsInSearch', 'date_search', 'button']
  dataSource = new MatTableDataSource(SEARCH_DATA);

  constructor(private historyService: HistoryService) { }
  ngOnInit(): void {
    this.dataSource = this.historyService.getSearches();
  }


}
