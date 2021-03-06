import { Component, OnInit } from '@angular/core';
import {  Router } from "@angular/router";
import { SummaryResolver } from '@angular/compiler';
import { DatalogsService } from '../../services/datalogs.service';


declare function unescape(s:string): string;
@Component({
  selector: 'app-alldatalogs',
  templateUrl: './alldatalogs.component.html',
  styleUrls: ['./alldatalogs.component.css']
})
export class AlldatalogsComponent implements OnInit {

  public accessKey;
  public idSystem;
  public listdata: any[] = [];
  public listID: any[] = [];
  public listvalues: any[]=[];
  public listall:any[]=[];
  public list:any[]=[];
  public fecha:any[]=[];
  public number;
  constructor( private DatalogService: DatalogsService, private router: Router) {
    this.accessKey = localStorage.getItem('accessKey'); 
    this.idSystem = localStorage.getItem('idSystem')
   }

  ngOnInit() {
    this.getDatalogs()
  }

  getDatalogs(): void{
this.DatalogService.getDatalog(this.idSystem, this.accessKey).subscribe((data:any)=>{
  this.listdata= data;
 // console.log(this.listdata);
this.getDatos();
})
}

getDatos(): void { 

  for(let i in this.listdata){
  
   this.DatalogService.getDetailDay(this.idSystem, this.listdata[i].id, this.accessKey).subscribe((data2:any)=>{
   this.list=data2;
//console.log(data2.value);

   this.listID.push(    
    {
      device: this.listdata[i].deviceName,
      name:this.listdata[i].name,
      id: this.listdata[i].id,
      data: this.list
    })
   // console.log(this.listID[0].data[0].timestamp)
   console.log(i)
  //  console.log(this.listID);
  this.fecha.length= 0;
  
  for(let i in this.list){
    console.log(this.listID)
    this.fecha.push({
      time : this.list[i].timestamp
    })
  
  }
  
 
    })
  

   
   }   
 //  console.log(this.listID)

 } 
 //console.log(this.listID);

 
 tableToExcel = (function() {
    
  var uri = 'data:application/vnd.ms-excel;base64,'
    , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="https://www.w3.org/TR/html401/"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
    , base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) }
    , format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }
  return function(table, name) {
    if (!table.nodeType) table = document.getElementById(table)
    var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML}
    window.location.href = uri + base64(format(template, ctx))
    
  }
}

)()

}
