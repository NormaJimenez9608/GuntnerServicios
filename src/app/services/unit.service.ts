import { Injectable } from '@angular/core';
import {unit} from '../models/unit';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Http, Response, Headers, ResponseContentType, } from '@angular/http';
import {HttpClient} from '@angular/common/http';
import { systems } from '../models/systems.models';

@Injectable()
export class UnitService {
private headers = new Headers({ 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest' });


private url;
public accessKey;


constructor (public _http: Http,private router: Router, private HTTP: HttpClient) { 
    
  }

  

getUnit(idSystems, accessKey:string){
    this.url = `https://api.netbiter.net/operation/v1/rest/json/system/${idSystems}/live/config?accesskey=${accessKey}`;
    
    return this.HTTP.get(this.url)
}
}

