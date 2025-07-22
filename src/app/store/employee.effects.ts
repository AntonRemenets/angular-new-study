import { inject, Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { EmployeeService } from '../services/employee.service'
import {
  loadEmployee,
  loadEmployeeFail,
  loadEmployeeSuccess,
} from './employee.action'
import { catchError, exhaustMap, map, of } from 'rxjs'

@Injectable()
export class EmpEffect {
  actions$ = inject(Actions)
  service = inject(EmployeeService)

  _loadEmployee = createEffect(() =>
    this.actions$.pipe(
      ofType(loadEmployee),
      exhaustMap(a => {
        return this.service.getAll().pipe(
          map(data => {
            return loadEmployeeSuccess({ list: data })
          }),
          catchError(e => of(loadEmployeeFail({ errorMsg: e.message }))),
        )
      }),
    ),
  )
}
