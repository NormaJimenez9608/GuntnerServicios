import { Component, OnInit } from '@angular/core';
import {  Router } from "@angular/router";
import { SummaryResolver } from '@angular/compiler';
import { DatalogsService } from '../../services/datalogs.service';


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
  console.log(this.listdata)

  for(let i in this.listdata){
    this.listID.push(
    {
      device: this.listdata[i].deviceName,
      name:this.listdata[i].name,
      id: this.listdata[i].id
    })
  
  }
  console.log(this.listID)

  

  for (let i in this.listID){

   this.DatalogService.getAllDatalog(this.idSystem, this.listID[i].id, this.accessKey).subscribe((data2:any)=>{
   
   this.list=data2
   
    this.listall.push( this.list );

    })
 }
 console.log(this.listall)
})
  }
}
