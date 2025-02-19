import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { NavComponent } from '../../common/nav/nav.component';

@Component({
  selector: 'app-view-all-employee',
  standalone: true,
  imports: [HttpClientModule, FormsModule, CommonModule, NavComponent],
  templateUrl: './view-all-employee.component.html',
  styleUrl: './view-all-employee.component.css'
})
export class ViewAllEmployeeComponent {

  public employeeList: any;

  public selectedEmployee = {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    departmentId: "",
    roleId: "",
  };

  constructor(private http: HttpClient) {
    this.loadEmployeeTable();
  }

  loadEmployeeTable() {
    this.http.get("http://localhost:8080/emp-controller/get-all").subscribe(res => {
      this.employeeList = res;
    }
    )
  }

  deleteEmployee(employee: any) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "Do you want to delete this employee?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        this.http.delete(`http://localhost:8080/emp-controller/delete-emp/${employee.id}`, { responseType: 'text' }).subscribe(res => {
          this.loadEmployeeTable()
          console.log(res);
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        })

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "",
          icon: "error"
        });
      }
    });

  }

  selectEmployee(employee: any) {
    if (employee != null) {
      this.selectedEmployee = employee;
    }
  }

  updateEmployee() {

    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.http.put("http://localhost:8080/emp-controller/update-employee", this.selectedEmployee).subscribe(res => {
          this.loadEmployeeTable(); // Reload the table after update
          Swal.fire("Saved!", "", "success");
          this.clearSelectedEmployee(); // Clear the form fields

        })

      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  }

  clearSelectedEmployee() {
    this.selectedEmployee = {
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      departmentId: "",
      roleId: "",
    }
  }
}
