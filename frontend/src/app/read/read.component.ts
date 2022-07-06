import { Component, OnInit } from '@angular/core';
import {ApiserviceService}from '../apiservice.service';
@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {

  constructor(private service:ApiserviceService) { }
 readData:any;
  ngOnInit(): void {
this.getAllData();  
  }
  deleteId(id:any){
    console.log(id,'deleted=> id '+id);
        this.service.deleteData(id).subscribe((res)=>{
          console.log(res,'deleted');
          this.getAllData();
        });

  }
  //get all data 
  getAllData(){
  this.service.getAllData().subscribe(res=>{
    console.log(res,"result=>");
    this.readData=res.data;
  });}
}
