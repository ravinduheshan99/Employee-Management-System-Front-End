import { Routes } from '@angular/router';
import { ManageEmployeeComponent } from './page/manage-employee/manage-employee.component';
import { ViewAllEmployeeComponent } from './page/view-all-employee/view-all-employee.component';

export const routes: Routes = [
  {
    path:"add-employee",
    component:ManageEmployeeComponent
  },
  {
    path:"view-employee",
    component:ViewAllEmployeeComponent
  }
];
