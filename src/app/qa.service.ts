import {Injectable} from '@angular/core';
import {Question} from './Question';
import {HttpClient} from '@angular/common/http';
import { element } from 'protractor';
import{map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QaService {

  public Questions: Question[]=[];
  
  private serviceURL:string="http://api.stackexchange.com/2.2/questions?page=1&pagesize=20&order=desc&sort=activity&tagged=angular&site=stackoverflow&filter=!BHMIbze0EPheMk572h0kxuj.q(NQC*";
  constructor(private http: HttpClient){
     
  }

   async GetQuestions():Promise<Question[]>{

                
   await this.http.get(this.serviceURL).toPromise()
   .then(response=>
    {
      response["items"].forEach(element => {
       this.Questions.push(
        {
          questionId:element["question_id"],
          answer:element["link"],
          courseId:-1,
          date: new Date(),
          question:element["title"]
        }
               
        ); 
        console.log(element);
      })})
       
       
    .catch(err=>{
      console.log(err);

        this.Questions.push({
          questionId:1,
          answer:"I am fine!",
          courseId:-1,
          date: new Date(),
          question:"How are you?"
        })
    });
    
    return this.Questions;

  }
}
