import { Option } from "./Option";

export class QuizQuestion {

        questionId: number ;
        questionText: string ;
        options: Option[] ;
        answer: string ;
        explanation: string ;
        selectedOption: string ;
 

    constructor(
        questionId: number,
        questionText: string,
        options: Option[],
        answer: string,
        explanation: string,
        selectedOption: string,
    ) 
    
    { 

        this.questionId = questionId;
        this.answer = answer;
        this.explanation = explanation;
        this.selectedOption = selectedOption;
        this.questionText = questionText;
        this.options = options;
    }
}
