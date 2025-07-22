import { createAction, props } from '@ngrx/store'
import { Employee } from '../model/Employee'

export const LOAD_EMPLOYEE = 'Employee Get All'
export const LOAD_EMPLOYEE_SUCCESS = 'Employee Get All Success'
export const LOAD_FAIL = 'Employee Get All Fail'

export const loadEmployee = createAction(LOAD_EMPLOYEE)
export const loadEmployeeSuccess = createAction(
  LOAD_EMPLOYEE_SUCCESS,
  props<{ list: Employee[] }>(),
)
export const loadEmployeeFail = createAction(
  LOAD_FAIL,
  props<{ errorMsg: string }>(),
)
