import { Question } from './question';

export class Section {
    id: string;
    num: number;
    title: string;
    questions: Question[];
    questions_count: number;
    questions_count_completed: number;

    constructor(num, title) {
        this.id = Math.random().toString(36).substring(2);
        this.num = num;
        this.title = title;
        this.questions = [];
        this.questions_count = 0;
        this.questions_count_completed = 0;
    }
    addQuestion(question: Question): void {
        this.questions.push(question);
        this.questions_count += 1;
    }
    setQuestions(questions: Question[]): void {
        this.questions = questions;
        this.questions_count = questions.length;
    }
    getNum(): number {
        return this.num;
    }
    getTitle(): string {
        return this.title;
    }
    isComplete(): boolean {
        return this.questions_count === this.questions_count_completed;
    }
    questionsCount(): number {
        return this.questions_count;
    }
    setQuestionsCountCompleted(count: number): void {
        this.questions_count_completed = count;
    }
}