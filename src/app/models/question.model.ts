/**
 * Question model
 * @typedef {object} Question
 * @property {string} Question.id - Random id generated by database
 * @property {number} Question.num - Question number
 * @property {number} Question.section_num - Section number of questionaire where question belongs to
 * @property {string} Question.section - Title of section where question belongs to
 * @property {string} Question.question - Actual question text
 * @property {boolean} Question.written_ans - Indicator of whether a written answer is required
 * @property {boolean} Question.written_ans_yes - Indicator of whether a written answer is required when yes is selected
 * @property {string[]} Question.checklist - A list of coexisting options when yes is selected
 * @property {boolean} Question.yes_no - Indicator of whether a yes or no option is required
 */

export interface Question {
    id: string;
    num: number;
    section_num: number;
    section: string;
    question: string;
    written_ans: boolean;
    written_ans_yes: boolean;
    checklist: string[];
    yes_no: boolean;
}