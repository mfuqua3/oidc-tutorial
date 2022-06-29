import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Taco} from "../models/taco";
import {environment} from "../../environments/environment";
import {TacoTransaction} from "../models/tacoTransaction";
import {TacoAwardRequest} from "../models/tacoAwardRequest";

@Injectable({
  providedIn: 'root'
})
export class SpaceTacoDataService {

  constructor(private http: HttpClient) {
  }

  getTacos(): Observable<Taco[]> {
    return this.http.get<Taco[]>(`${environment.apiRoot}/tacos`);
  }

  giveTaco(request: TacoAwardRequest): Observable<TacoTransaction> {
    return this.http.post<TacoTransaction>(`${environment.apiRoot}/tacos`, request);
  }
}
