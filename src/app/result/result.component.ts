import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizQuestion } from 'Model/quiz-question';

@Component({
    selector: 'app-result',
    templateUrl: './result.component.html',
    styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

    @Input()
    answer!: string;
    @Input()
    question!: QuizQuestion;

    totalQuestions!: number;
    allQuestions!: QuizQuestion[];
    correctAnswersCount!: number;
    percentage!: number;

    constructor(private router: Router) {

        this.totalQuestions = this.router.getCurrentNavigation()?.extras.state?.totalQuestions;
        this.correctAnswersCount = this.router.getCurrentNavigation()?.extras.state?.correctAnswersCount;
        this.allQuestions = this.router.getCurrentNavigation()?.extras.state?.allQuestions;
    }

    ngOnInit(): void {

        this.percentage = Math.round(100 * this.correctAnswersCount / this.totalQuestions);

    }

}
