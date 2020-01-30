/**
 * Question model
 */

export class Question {
    id: string;
    num: number;
    section: string;
    question: string;
    written_ans: boolean;
    written_ans_yes: boolean;
    checklist: string[];
    yes_no: boolean;
}