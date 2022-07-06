import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {


  constructor(private _http: HttpClient) { }

  // connect frontend to backend 
  apiUrl = 'http://localhost:3000/user';
  //get all data 
  getAllData(): Observable<any> {
    return this._http.get(`${this.apiUrl}`);
  }
  // creat new data 
  createNewData(data: any): Observable<any> {
    return this._http.post(`${this.apiUrl}`, data);
  }
  //delete data 
  deleteData(id: any): Observable<any> {
    let ids=id;
    return this._http.delete(`${this.apiUrl}/${ids}`);
  }
   //updata data 
   userUpdate(data:any,id: any): Observable<any> {
    let ids=id;
    return this._http.put(`${this.apiUrl}/${ids}`,data);
  }
//get Single data 
getSingleData(id:any):Observable<any>{
  let ids=id;
  return this._http.get(`${this.apiUrl}/${id}`)
}
}
