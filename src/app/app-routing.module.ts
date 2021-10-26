import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntroductionComponent } from './introduction/introduction.component';
import { QuestionComponent } from './question/question.component';

const routes: Routes = [
    { path: 'intro', component: IntroductionComponent, pathMatch: 'full'},
    { path: 'question', component: QuestionComponent, pathMatch: 'full' },
    { path: 'question/:questionId', component: QuestionComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
