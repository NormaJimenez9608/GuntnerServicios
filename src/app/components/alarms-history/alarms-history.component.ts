import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SummaryResolver } from '@angular/compiler';
import { AlarmHistoryService } from '../../services/alarm-history.service';
import { Alarms } from '../../models/alarms';
import { DatePipe } from '@angular/common';

declare function unescape(s: string): string;
@Component({
  selector: 'app-alarms-history',
  templateUrl: './alarms-history.component.html',
  styleUrls: ['./alarms-history.component.css'],
  providers: [Alarms]
})
export class AlarmsHistoryComponent implements OnInit {
  public fechaActual = new Date();
  public accessKey;
  public idSystem;
  public startDat;
  public endDat;
  onEnter(){
    this.Alarms()
}

  alarms = new Alarms();

  public listalarms: any[] = [];
  public listalarms2: any[] = [];

  constructor(private AlarmsHistory: AlarmHistoryService, private router: Router, private datePipe: DatePipe) {
    this.accessKey = localStorage.getItem('accessKey');
    this.idSystem = localStorage.getItem('idSystem');

  }

  ngOnInit() {
    this.getAlarmsHistory();
  }

  getAlarmsHistory(): void {
    this.AlarmsHistory.getAlarmsHistory(this.idSystem, this.accessKey).subscribe((dato: any) => {
      this.listalarms = dato;
      //console.log(dato);
      this.startDat = dato[0].timestamp;
      this.endDat = dato[dato.length - 1].timestamp
      this.alarms.startDate = this.datePipe.transform(this.startDat, 'yyyy-MM-ddThh:mm');
      this.alarms.endDate = this.datePipe.transform(this.endDat, 'yyyy-MM-ddThh:mm')

    })

  }

  Alarms(): void {
    const endDate = this.alarms.endDate;
    const startDate = this.alarms.startDate;

   // console.log(this.alarms.endDate, this.alarms.startDate)
    this.AlarmsHistory.getDate(this.idSystem, this.accessKey, this.alarms.startDate, this.alarms.endDate).subscribe((data: any) => {
      this.listalarms = data;
     // console.log(data)

    })
  }


  tableToExcel = (function () {

    var uri = 'data:application/vnd.ms-excel;base64,'
      , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
      , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
      , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }
    return function (table, name) {
      if (!table.nodeType) table = document.getElementById(table)
      var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML }
      window.location.href = uri + base64(format(template, ctx))

    }
  })()

}



