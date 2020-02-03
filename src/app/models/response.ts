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

 export interface Response {
     id: string;
     num: number;
     section_num: number;
     yesNo: string | null;
     written: string | null;
     checklist: boolean[];
 }