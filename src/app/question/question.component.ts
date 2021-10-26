import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizQuestion } from 'Model/quiz-question';
import { DataserviceService } from '../dataservice.service';

@Component({
    selector: 'app-question',
    templateUrl: './question.component.html',
    styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

    @Output()
    question!: QuizQuestion;
    totalQuestions: number = 0;
    correctAnswersCount = 0;
    questionID = 0;
    currentQuestion = 0;
    questionIndex!: number;
    correctAnswer!: boolean;
    hasAnswer!: boolean;
    disabled!: boolean;
    quizIsOver!: boolean;
    progressValue!: number;
    timeLeft!: number;
    timePerQuestion = 20;
    interval: any;

    blueBorder = '2px solid #007aff';

    allQuestions: QuizQuestion[] = [
        {
            questionId: 1,
            questionText: 'What is the objective of dependency injection?',
            options: [
                { optionValue: '1', optionText: 'Pass the service to the client.' },
                { optionValue: '2', optionText: 'Allow the client to find service.' },
                { optionValue: '3', optionText: 'Allow the client to build service.' },
                { optionValue: '4', optionText: 'Give the client part service.' }
            ],
            answer: '1',
            explanation: 'a service gets passed to the client during DI',
            selectedOption: ''
        },
        {
            questionId: 2,
            questionText: 'Which of the following benefit from dependency injection?',
            options: [
                { optionValue: '1', optionText: 'Programming' },
                { optionValue: '2', optionText: 'Testability' },
                { optionValue: '3', optionText: 'Software design' },
                { optionValue: '4', optionText: 'All of the above.' },
            ],
            answer: '4',
            explanation: 'DI simplifies both programming and testing as well as being a popular design pattern',
            selectedOption: ''
        },
        {
            questionId: 3,
            questionText: 'Which of the following is the first step in setting up dependency injection?',
            options: [
                { optionValue: '1', optionText: 'Require in the component.' },
                { optionValue: '2', optionText: 'Provide in the module.' },
                { optionValue: '3', optionText: 'Mark dependency as @Injectable().' },
                { optionValue: '4', optionText: 'Declare an object.' }
            ],
            answer: '3',
            explanation: 'the first step is marking the class as @Injectable()',
            selectedOption: ''
        },
        {
            questionId: 4,
            questionText: 'In which of the following does dependency injection occur?',
            options: [
                { optionValue: '1', optionText: '@Injectable()' },
                { optionValue: '2', optionText: 'constructor' },
                { optionValue: '3', optionText: 'function' },
                { optionValue: '4', optionText: 'NgModule' },
            ],
            answer: '2',
            explanation: 'object instantiations are taken care of by the constructor in Angular',
            selectedOption: ''
        }
    ];



    constructor(private route: ActivatedRoute, private router: Router) {

        this.route.paramMap.subscribe(params => {

            const id = Number(this.route.snapshot.paramMap.get('questionId'))

            this.setQuestionID(id);  // get the question ID and store it

            this.question = this.getQuestion;

        });
    }




    ngOnInit(): void {

        this.totalQuestions = this.allQuestions.length;
        this.question = this.getQuestion;
        this.timeLeft = this.timePerQuestion;
        this.progressValue = 100 * (this.currentQuestion + 1) / this.totalQuestions;
    }


    navigateToNextQuestion(): void {
        this.router.navigate(['/question', this.getQuestionID() + 1]);
        this.displayNextQuestion();
    }

    navigateToResults(): void {
        this.router.navigate(['/results'], {
            state:
            {
                totalQuestions: this.totalQuestions,
                correctAnswersCount: this.correctAnswersCount,
                allQuestions: this.allQuestions
            }
        });
    }


    displayNextQuestion() {
        this.increaseProgressValue();
        this.questionIndex = this.questionID++;


    }



    // checks whether the question is valid and is answered correctly
    checkIfAnsweredCorrectly() {
        if (this.isThereAnotherQuestion() && this.isCorrectAnswer()) {
            this.incrementCorrectAnswersCount();
            this.correctAnswer = true;
            this.hasAnswer = true;
            this.disabled = false;

            this.quizDelay(3000);

            if (this.getQuestionID() < this.totalQuestions) {
                this.navigateToNextQuestion();
            } else {
                this.navigateToResults();
            }
        }
    }
    quizDelay(milliseconds: number) {
        const start = new Date().getTime();
        let counter = 0;
        let end = 0;

        while (counter < milliseconds) {
            end = new Date().getTime();
            counter = end - start;
        }
    }



    incrementCorrectAnswersCount(): any {
        if (this.questionID <= this.totalQuestions && this.isCorrectAnswer()) {
            if (this.correctAnswersCount === this.totalQuestions) {
                return this.correctAnswersCount;
            } else {
                this.correctAnswer = true;
                this.hasAnswer = true;
                return this.correctAnswersCount++;
            }
        }
        else {
            this.correctAnswer = false;
            this.hasAnswer = false;
        }
    }

    increaseProgressValue() {
        this.progressValue = parseFloat((100 * (this.getQuestionID() + 1) / this.totalQuestions).toFixed(1));
    }



    /****************  public API  ***************/
    getQuestionID() {
        return this.questionID;
    }

    setQuestionID(id: number) {
        return this.questionID = id;
    }

    isThereAnotherQuestion(): boolean {
        return this.questionID <= this.allQuestions.length;
    }

    isFinalQuestion(): boolean {
        return this.currentQuestion === this.totalQuestions;

    }

    isCorrectAnswer(): boolean {
        return this.question.selectedOption === this.question.answer;
    }



    get getQuestion(): QuizQuestion {
        return this.allQuestions.filter(question => question.questionId === this.questionID)[0];
    }


}



