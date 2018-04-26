import { Component, OnInit } from '@angular/core';
import {  Router } from "@angular/router";
import {  values } from '../../models/values';
import { ValuesService } from '../../services/values.service';
import { systems } from '../../models/systems.models';

@Component({
  selector: 'app-values',
  templateUrl: './values.component.html',
  styleUrls: ['./values.component.css']
})
export class ValuesComponent implements OnInit {

  public accessKey;
  public idSystem;
  public setpoint;
  public temperatura;
  public controlvalue;
  public idValor;
  public setpoint1;
  public temperatura1;
  public controlvalue1;
  SystemsModels = new systems;
  ValuesModel = new values;

  constructor(private ValuesService: ValuesService) { 
    
  }

  ngOnInit() {
    this.accessKey = localStorage.getItem('accessKey');
    this.idSystem = localStorage.getItem('idSystem');
    this.setpoint = localStorage.getItem('setpoint');
    this.temperatura = localStorage.getItem('temperatura');
    this.controlvalue = localStorage.getItem('controlvalue');
  

    this.getValues();
   
  }

  getValues(): void{

    this.ValuesService.getValues( this.idSystem, this.accessKey, this.setpoint, this.temperatura, this.controlvalue).subscribe((valores:any)=>{
this.idValor= valores.id;
this.getValores();
    });      
  }

 getValores():void{
  
  this.ValuesService.getValores(this.idSystem, this.idValor, this.accessKey).subscribe((dato:any)=>{
  console.log(dato); 
  this.setpoint1 = dato[0].value;
  this.temperatura1 = dato[1].value;
  this.controlvalue1 = dato[2].value;



  });
 } 
  }
