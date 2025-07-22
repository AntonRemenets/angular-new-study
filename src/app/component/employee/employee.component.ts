import { Component, OnDestroy, OnInit } from '@angular/core'
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { MatDialog, MatDialogModule } from '@angular/material/dialog'
import { AddEmployeeComponent } from '../add-employee/add-employee.component'
import { Employee } from '../../model/Employee'
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { EmployeeService } from '../../services/employee.service'
import { Subscription } from 'rxjs'
import { CommonModule } from '@angular/common'
import { Store } from '@ngrx/store'
import { getEmpList } from '../../store/employee.selector'
import { loadEmployee } from '../../store/employee.action'

@Component({
  selector: 'app-employee',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatTableModule,
    CommonModule,
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss',
})
export class EmployeeComponent implements OnInit, OnDestroy {
  private empList: Employee[] = []
  public dataSource!: MatTableDataSource<Employee>
  private subscription = new Subscription()
  public displayedColumns: string[] = [
    'id',
    'name',
    'role',
    'doj',
    'salary',
    'action',
  ]

  constructor(
    private dialog: MatDialog,
    private service: EmployeeService,
    private store: Store,
  ) {}

  ngOnInit() {
    this.getAllEmployee()
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  public addEmployee() {
    this.openPopup(0)
  }

  public getAllEmployee() {
    //
    // Версия без NGRX Store
    //
    // let sub = this.service.getAll().subscribe(el => {
    //   this.empList = el
    //   this.dataSource = new MatTableDataSource(this.empList)
    // })
    //
    // this.subscription.add(sub)

    this.store.dispatch(loadEmployee())
    this.store.select(getEmpList).subscribe(i => {
      this.empList = i
      this.dataSource = new MatTableDataSource(this.empList)
    })
  }

  public editEmployee(empId: number) {
    this.openPopup(empId)
  }

  public deleteEmployee(empId: number) {
    if (confirm('Are you sure?')) {
      let sub = this.service.delete(empId).subscribe(e => {
        this.getAllEmployee()
      })

      this.subscription.add(sub)
    }
  }

  private openPopup(empId: number) {
    this.dialog
      .open(AddEmployeeComponent, {
        width: '50%',
        exitAnimationDuration: '500ms',
        enterAnimationDuration: '500ms',
        data: {
          code: empId,
        },
      })
      .afterClosed()
      .subscribe(e => {
        this.getAllEmployee()
      })
  }
}
