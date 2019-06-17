import { Component } from '@angular/core';
import {QaService} from './qa.service';
import {Question} from './Question';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[QaService]
})
export class AppComponent {
  title = 'Question Answer-tool';
      public Questions: Question[];
      SelectedQuestion: Question;
      SelectedQuestionIndex:number;
      TimerValue: number;
      readonly MaxTimerSeconds:number = 10;
      DisablePrevious:boolean = false;
      DisableNext:boolean = false;
      
  constructor(private Service: QaService){
      this.Service.GetQuestions().then(data=>
        {
          this.Questions=data;
          this.SelectedQuestionIndex = 0;
          this.SelectedQuestion=this.Questions[this.SelectedQuestionIndex];
          this.TimerValue=this.MaxTimerSeconds;
          this.startTimer();
        }
       );
    
  }

  startTimer() {
     setInterval(() => {
      if(this.TimerValue > 0) {
        this.TimerValue--;
      } else {
        
      }
    },1000)
  }

  PreviousQuestion(){
    if (this.SelectedQuestionIndex > 0)
    {
      this.SelectedQuestionIndex--;
      this.SelectedQuestion=this.Questions[this.SelectedQuestionIndex];
      this.TimerValue=this.MaxTimerSeconds;
      this.startTimer();
      this.DisablePrevious=false;
    }
    else
    {
      this.DisablePrevious=true;
    }
    
  }

  NextQuestion(){
    if (this.SelectedQuestionIndex < this.Questions.length-1)
    {
      this.SelectedQuestionIndex++;
      this.SelectedQuestion=this.Questions[this.SelectedQuestionIndex];
      this.TimerValue=this.MaxTimerSeconds;
      this.startTimer();
      this.DisableNext=false;
    }
    else
    {
      this.DisableNext=true;
    }
  }

  
}
