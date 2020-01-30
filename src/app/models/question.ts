/**
 * Question model
 */

export class Question {
    id: string;
    num: number;
    section: string;
    question: string;
    written_ans: boolean;
    checklist: string[];
    yes_no: boolean;
}