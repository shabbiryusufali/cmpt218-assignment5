import { Component,  ElementRef,  Inject,  OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  // dateRange:boolean = false;
  constructor(){

  }

  ngOnInit(): void {
  }

}
