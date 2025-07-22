import { Component, Inject, OnInit } from '@angular/core'
import { MatCardModule } from '@angular/material/card'
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatSelectModule } from '@angular/material/select'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { provideNativeDateAdapter } from '@angular/material/core'
import { MatIconModule } from '@angular/material/icon'
import { Employee } from '../../model/Employee'
import { EmployeeService } from '../../services/employee.service'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-add-employee',
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatIconModule,
  ],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class AddEmployeeComponent implements OnInit {
  public title = 'Add Employee'
  public empForm = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', Validators.required),
    doj: new FormControl(new Date(), Validators.required),
    role: new FormControl('', Validators.required),
    salary: new FormControl(0, Validators.required),
  })
  public dialogData: any
  private isEdit = false

  constructor(
    private service: EmployeeService,
    private ref: MatDialogRef<AddEmployeeComponent>,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit() {
    this.dialogData = this.data
    if (this.dialogData.code > 0) {
      this.title = 'Edit Employee'
      this.isEdit = true
      this.service.get(this.dialogData.code).subscribe(e => {
        let _data = e
        if (_data != null) {
          this.empForm.setValue({
            id: _data.id,
            name: _data.name,
            doj: _data.doj,
            role: _data.role,
            salary: _data.salary,
          })
        }
      })
    }
  }

  public saveEmployee() {
    if (this.empForm.valid) {
      let _data: Employee = {
        id: this.empForm.value.id as number,
        name: this.empForm.value.name as string,
        doj: new Date(this.empForm.value.doj as Date),
        role: this.empForm.value.role as string,
        salary: this.empForm.value.salary as number,
      }

      if (this.isEdit) {
        this.service.update(_data).subscribe(i => {
          this.toastr.success('Employee Added Successfully', 'Updated')
          this.closePopup()
        })
      } else {
        this.service.create(_data).subscribe(i => {
          this.toastr.success('Employee Added Successfully', 'Created')
          this.closePopup()
        })
      }
    }
  }

  public closePopup() {
    this.ref.close()
  }
}
