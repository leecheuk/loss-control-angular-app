/**
 * Question model
 */

export class Question {
    id: string;
    num: number;
    question: string;
    written_ans: boolean;
    checklist: string[];
    yes_no: boolean;
}