import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Employee } from '../model/Employee'

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private url = 'http://localhost:3000/employee'

  constructor(private http: HttpClient) {}

  public getAll() {
    return this.http.get<Employee[]>(this.url)
  }

  public get(empId: number) {
    return this.http.get<Employee>(this.url + '/' + empId)
  }

  public create(data: Employee) {
    return this.http.post(this.url, data)
  }

  public update(data: Employee) {
    return this.http.put(this.url + '/' + data.id, data)
  }

  public delete(empId: number) {
    return this.http.delete(this.url + '/' + empId)
  }
}
