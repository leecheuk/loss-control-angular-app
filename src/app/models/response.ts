/**
 * A model for response of each question.
 * @typedef {object} Response
 * @property {}
 */

 export interface Response {
     id: string;
     num: number;
     section_num: number;
     yesNo: string | null;
     written: string | null;
     checklist: string[];
 }