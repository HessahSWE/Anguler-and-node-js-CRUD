import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from '../apiservice.service';
import { ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private service: ApiserviceService, private router: ActivatedRoute) { }
  getParamId: any;
  ngOnInit(): void {
    console.log(this.getParamId);
    this.getParamId = this.router.snapshot.paramMap.get('id');
    if (this.getParamId) {
      console.log(this.getParamId);
      console.log(this.router.snapshot.paramMap.get('id'), 'getId');
      this.service.getSingleData(this.getParamId).subscribe((res) => {
        console.log(res, 'res=>>');
        this.userForm.patchValue({
          name: res.data[0].name,
          email: res.data[0].email,
          mobile: res.data[0].mobile,
        });
      });
    }
  }
  userForm = new FormGroup({
    'name': new FormControl('', Validators.required),
    'email': new FormControl('', Validators.required),
    'mobile': new FormControl('', Validators.required),
  })
  userSubmit() {
    if (this.userForm.valid) {
      this.service.createNewData(this.userForm.value).subscribe((res) => {
        console.log(this.userForm.value);
        this.userForm.reset();
      });
    }
    else {
      console.log('all field is required')
    }

  }
  userUpdate() {
    if (this.userForm.valid) {
      this.service.userUpdate(this.userForm.value, this.getParamId).subscribe((res) => {
        console.log(this.userForm.value);
        console.log(res, "resuly=>");
      });
    }
    else {
      console.log('all field is required')
    }
  }
}
