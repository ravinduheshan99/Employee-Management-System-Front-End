import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-employee',
  standalone: true,
  imports: [FormsModule,HttpClientModule,CommonModule],
  templateUrl: './manage-employee.component.html',
  styleUrl: './manage-employee.component.css'
})
export class ManageEmployeeComponent {

  public employeeObject={
   firstName:"",
   lastName:"",
   email:"",
   departmentId:"",
   roleId:""
  }
  
  constructor(private http:HttpClient){}

  addEmployee(){
    this.http.post("http://localhost:8080/emp-controller/add-employee",this.employeeObject).subscribe(
      (data)=>{
        console.log(data);
      }
    )
  }
  
}
