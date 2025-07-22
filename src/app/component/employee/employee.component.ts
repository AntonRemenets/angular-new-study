import { Component } from '@angular/core'
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { MatDialog, MatDialogModule } from '@angular/material/dialog'
import { AddEmployeeComponent } from '../add-employee/add-employee.component'

@Component({
  selector: 'app-employee',
  imports: [MatCardModule, MatButtonModule, MatDialogModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss',
})
export class EmployeeComponent {
  constructor(private dialog: MatDialog) {}

  public addEmployee() {
    this.dialog.open(AddEmployeeComponent, {
      width: '50%',
      exitAnimationDuration: '500ms',
      enterAnimationDuration: '500ms',
    })
  }
}
