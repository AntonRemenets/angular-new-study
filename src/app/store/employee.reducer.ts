import { createReducer, on } from '@ngrx/store'
import { employeeState } from './employee.state'
import { loadEmployeeFail, loadEmployeeSuccess } from './employee.action'

const _employeeReducer = createReducer(
  employeeState,
  on(loadEmployeeSuccess, (state, action) => {
    return {
      ...state,
      list: action.list,
      errorMsg: '',
    }
  }),
  on(loadEmployeeFail, (state, action) => {
    return {
      ...state,
      list: [],
      errorMsg: action.errorMsg,
    }
  }),
)

export function employeeReducer(state: any, action: any) {
  return _employeeReducer(state, action)
}
