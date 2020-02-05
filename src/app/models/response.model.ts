/**
 * A model for response of each question.
 * @typedef {object} Response
 * @property {string} Response.id - Unique primary key
 * @property {number} Response.num - Number corresponding to question number
 * @property {number} Response.section_num - Section number of corresponding question
 * @property {string | null} Response.yesNo - User response/input to yes or no option
 * @property {string | null} Response.written - User response/input to question
 * @property {boolean[]} Response.checklist - Indicator of whether checklist items are checked or not
 */

 interface IResponse {
     id: string;
     num: number;
     section_num: number;
     yesNo: string | null; // change this to yes_no
     written: string | null;
     checklist: boolean[];
 }

 export class Response implements IResponse {
    id: string;
    num: number;
    section_num: number;
    yesNo: string | null; // change this to yes_no
    written: string | null;
    checklist: boolean[];

    constructor(num: number, section_num: number, checklist: boolean[]) {
        this.id = Math.random().toString(36).substring(2); // refactor this to utils
        this.num = num;
        this.section_num = section_num;
        this.yesNo = null;
        this.written = null;
        this.checklist = checklist;
    }
 }