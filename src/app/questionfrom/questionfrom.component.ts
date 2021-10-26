import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { QuizQuestion } from 'Model/quiz-question';

@Component({
    selector: 'app-questionfrom',
    templateUrl: './questionfrom.component.html',
    styleUrls: ['./questionfrom.component.scss']
})
export class QuestionfromComponent implements OnInit, OnChanges {


    @Output() answer = new EventEmitter<string>();
    @Output()
    formGroup!: FormGroup;
    @Input()
    question!: QuizQuestion;
    option = '';
    grayBorder = '2px solid #979797';



    constructor() { }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.question && changes.question.currentValue && !changes.question.firstChange) {
            this.formGroup.patchValue({ answer: '' });
        }
    }

    ngOnInit(): void {

        this.buildForm();
    }
    buildForm() {
        this.formGroup = new FormGroup({
            answer: new FormControl(['', Validators.required])
        });
    }

    radioChange(answer: string) {
        this.question.selectedOption = answer;
        this.answer.emit(answer);
        this.displayExplanation();
    }

    getValue(event: Event): string {
        return (event.target as HTMLInputElement).value;
    }

    displayExplanation(): void {
        const questionElem = document.getElementById('question');
        if (questionElem !== null) {
            questionElem.innerHTML = 'Option ' + this.question.answer + ' was correct because ' + this.question.explanation + '.';
            questionElem.style.border = this.grayBorder;
        }
    }


    isCorrect(option: string): boolean {

        return (option === this.question.selectedOption && (option === this.question.answer));
    }


    // mark incorrect answer if selected
    isIncorrect(option: string): boolean {
        return option !== this.question.answer && option === this.question.selectedOption;
    }


    onSubmit() {
        this.formGroup.reset({ answer: null });
    }


}
