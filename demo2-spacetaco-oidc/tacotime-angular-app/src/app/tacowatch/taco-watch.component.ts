import {Component} from '@angular/core';
import {SpaceTacoDataService} from "../api/space-taco-data.service";
import {Taco} from "../models/taco";
import {ClrLoadingState} from "@clr/angular";

@Component({
  selector: 'app-taco-watch',
  templateUrl: './taco-watch.component.html',
  styleUrls: ['./taco-watch.component.css']
})
export class TacoWatchComponent {
  tacos: Taco[] = [];
  result: string | null = null;
  buttonState: ClrLoadingState = ClrLoadingState.DEFAULT;

  constructor(private readonly tacoDataService: SpaceTacoDataService) {
    tacoDataService.getTacos()
      .subscribe(tacos => this.tacos = tacos);
  }

  tryGiveTaco() {
    this.buttonState = ClrLoadingState.LOADING;
    this.tacoDataService.giveTaco({
      payeeId: "is this a real id?",
      count: 5000,
      note: "we've done it!"
    }).subscribe({
      next: result=> {
        console.log("I didn't expect to get this far....");
      },
      error: err => {
        this.result = JSON.stringify(err);
      },
      complete: ()=>{
        this.buttonState = ClrLoadingState.DEFAULT;
      }
    })
  }

}
