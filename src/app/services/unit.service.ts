import { Injectable } from '@angular/core';
import {unit} from '../models/unit';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Http, Response, Headers, ResponseContentType, } from '@angular/http';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class UnitService {
private headers = new Headers({ 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest' });

private url;
public accessKey;
public id;

  constructor (public _http: Http,private router: Router, private HTTP: HttpClient) { 
    
  }

getUnit(id:string, accessKey:string){
  
  console.log('Paso revision en valores');
    this.url = `https://api.netbiter.net/operation/v1/rest/json/system/003011FAD86E/live/config?accesskey=${accessKey}`;
  console.log(this.url);
    return this.HTTP.get(this.url)
    
}
}

