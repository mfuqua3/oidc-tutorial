import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Taco} from "../models/taco";
import {environment} from "../../environments/environment";
import {TacoWatchModule} from "../tacowatch/taco-watch.module";

@Injectable({
  providedIn: TacoWatchModule
})
export class SpaceTacoDataService {

  constructor(private http: HttpClient) {
  }

  getTacos(): Observable<Taco[]> {
    return this.http.get<Taco[]>(`${environment.apiRoot}/tacos`);
  }
}
