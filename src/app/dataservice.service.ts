import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { QuizQuestion } from 'Model/quiz-question';

@Injectable({
    providedIn: 'root'
})
export class DataserviceService {

    constructor(public http: HttpClient) { }


    retriveAllQuestionDetails(): Observable<QuizQuestion[]> {
        return this.http.get<QuizQuestion[]>("http://localhost:3000/products");
    }
}
