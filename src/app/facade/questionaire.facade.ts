import { Question, Questionaire, Response, Section } from '../models';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
// utils
import utils from '../utils';
/**
 * NOTES:
 * Should move some data manipulation in the backend/services. It should be 
 * handled by backend (ie. aggregation, transformation).
 * In hindsight, should this be in Ngrx store? There's no other components
 * requiring the state data, so it might be unnecessary.
 * 
 * Still needs refactoring, this seems like a "god" object
 */
export class QuestionaireFacade {
    questions: Question[];
    questions_current: Question[]; // keep track of questions in current browsing section
    sections: Section[];
    questionaire: Questionaire = new Questionaire();
    responses: Response[];
    form: FormGroup;
    section_titles: string[];
    section_title: string;

    constructor(questions: Question[]) {
        this.questions = questions;
    }

    /**
     * Unset FormGroup.
     */
    unsetForm(): void {
        this.form = undefined; 
    }

    // initialize questionaire
    // map questions to their corresponding sections
    initialize(): void {
        this.mapQuestionsToSections();
        this.mapQuestionsToResponses();
    }
    /**
     * Initialize questionaire status when user clicks start
     */
    startQuestionaire(): void {
        // set questionaire status
        this.questionaire.initializeStatus(
        // update section complete status before increment
            this.questions.length,
            this.getSectionByNum(1).questions_count,
            this.sections.length
        );
        this.section_titles = this.getSectionTitles();
        this.questions_current = this.getQuestionsBySection(1);
        this.section_title = this.section_titles[0];
    }
    // get titles
    getSectionTitles(): string[] {
        return this.sections.map(s => s.getTitle());
    }
    // wrapper for getting response inputs
    getResponseInputs(): Response[] {
        return this.form.value.questions;
    }
    // use this to update 
    getSectionByNum(section_num: number): Section {
        return this.sections.filter(s => s.num === section_num)[0];
    }
    /**
     * Status-related methods
     */
    
    // update current section number
    updateSectionNumCurrent(section_num: number): void {
        this.questionaire.sectionNumCurrent = section_num;
    }
    // update current section title 
    updateSectionTitleCurrent(): void {
        let section_num = this.questionaire.sectionNumCurrent;
        this.section_title = this.section_titles[section_num - 1];
    }
    // set in-progress section number
    updateSectionNumInprogress(): void {
        let section_num = this.getSectionsCountCompleted();
        this.questionaire.sectionNumInprogress = section_num + 1;
    }
    // increment current section number
    incrementSectionNumCurrent(): void {
        this.questionaire.sectionNumCurrent += 1;
        this.updateStatus();
    }
    // decrement current section number
    decrementSectionNumCurrent(): void {
        this.questionaire.sectionNumCurrent -= 1;
        this.updateStatus();
    }
    setSectionNumCurrent(section_num: number): void {
        this.questionaire.sectionNumCurrent = section_num
        this.updateStatus();
    }
    updateStatus(): void {
        this.updateSectionsCountCompleted();
        this.updateQuestionsCountCurrent();
        this.updateQuestionsCountInprogress();
        this.updateQuestionsCountCompletedCurrent();
        this.updateQuestions();
        this.updateSectionTitleCurrent();
        this.updateQuestionsCountCompletedInprogress();
        this.updateQuestionsCountCompleted();
        this.updateSectionNumInprogress();
    }
    // get questions count of section in progress
    getQuestionsCountInprogress(): number {
        let count = this.getSectionsCountCompleted();
        return this.getQuestionsBySection(count+ 1).length;
    }
    getQuestionsCountCompletedInprogressDuring(): number {
        let section_num = this.questionaire.sectionNumCurrent;
        let responses = this.getFormResponsesBySection(section_num);
        return responses.filter( r => this.hasResponded(r)).length;
    }
    updateQuestionsCountCompletedInprogressDuring(): void {
        let count = this.getQuestionsCountCompletedInprogressDuring();
        this.questionaire.questionCountCompletedInprogress = count;
    }
    updateQuestionsCountInprogress(): void {
        let count = this.getQuestionsCountInprogress();
        this.questionaire.questionCountInprogress = count;
    }
    // get number of questions completed in in-progress section
    getQuestionsCountCompletedInprogress(): number {
        let section_num_in_progress = this.getSectionsCountCompleted() + 1;
        // get question from section
        return this.getQuestionsCountCompletedBySection(section_num_in_progress);
    }
    updateQuestionsCountCompletedInprogress(): void {
        let count = this.getQuestionsCountCompletedInprogress();
        this.questionaire.questionCountCompletedInprogress = count;
    }
    
    // get responses by section number
    getResponsesBySection(section_num: number): Response[] {
        return this.responses.filter(r => r.section_num === section_num);
    }
    // get form responses by section number
    getFormResponsesBySection(section_num: number): Response[] {
        return this.getResponseInputs().filter(r => r.section_num === section_num);
    }
    // get all questions belonging to section by section number
    getQuestionsBySection(section_num: number): Question[] {
        let res = this.sections.filter(s => s.num === section_num);
        return res.length > 0 ? res[0].questions : [];
    }
    // get current questions
    getQuestionsCurrent(): Question[] {
        let section_num_current = this.questionaire.sectionNumCurrent
        return this.getQuestionsBySection(section_num_current);
    }
    // update questions to ones of current section
    updateQuestions(): void {
        this.questions_current = this.getQuestionsCurrent();
    }
    // update questions count of current section
    updateQuestionsCountCurrent(): void {
        this.questionaire.questionCountCurrent = this.getQuestionsCurrent().length;
    }
    // get questions count by section number
    getQuestionsCountBySection(section_num: number): number {
        return this.questions.filter(q => q.section_num === section_num).length;
    }
    // get completed questions count by section number
    getQuestionsCountCompletedBySection(section_num: number): number {
        let response_inputs = this.getFormResponsesBySection(section_num);
        return response_inputs.filter(r => this.hasResponded(r)).length;
    }
    // get number of questions completed in questionaire
    getQuestionsCountCompleted(): number {
        return this.getResponseInputs().filter(r => this.hasResponded(r)).length;
    }
    updateQuestionsCountCompleted(): void {
        let count = this.getQuestionsCountCompleted();
        this.questionaire.questionCountCompleted = count;
    }
    // get number of questions completed in current section
    getQuestionsCountCompletedCurrent(): number {
        return this.getQuestionsCountCompletedBySection(this.questionaire.sectionNumCurrent);
    }
    // update number of questions completed in current section
    updateQuestionsCountCompletedCurrent(): void {
        let count = this.getQuestionsCountCompletedCurrent();
        this.questionaire.questionCountCompletedCurrent = count;
    }
    // update number of completed questions in current section
    updateSectionCurrentCompleteCount(): void {
        let section_current = this.getSectionByNum(this.questionaire.sectionNumCurrent);
        section_current.setQuestionsCountCompleted(this.getQuestionsCountCompletedCurrent());
    }
    // get number of sections completed
    getSectionsCountCompleted(): number {
        let responses = this.getResponseInputs();
        let arr = responses.filter(r => {
            let qs = this.questions[r.num - 1];
            if (qs.yes_no === true) {
                return utils.isStrInvalid(r.yesNo);
            } else {
                return utils.isStrInvalid(r.written);
            }
        });
        // get array of distinct section numbers that is not completed;
        let section_incomplete = arr.map(q => q.section_num);
        return this.getSectionsCount() - (new Set(section_incomplete)).size;
    }
    // update number of completed sections
    updateSectionsCountCompleted(): void {
        let count = this.getSectionsCountCompleted();
        this.questionaire.sectionCountCompleted = count;
    }
    // HELPER METHODS
    /**
     * Returns whether question is answered. 
     * @param questionObj {Response} - Response to corresponding question
     * @returns {boolean} - Whether corresponding question is answered
     */
    hasResponded(questionObj: Response): boolean {
        let { yesNo, written } = questionObj;
        return (utils.isStrValid(yesNo) && this.validateYesNoResponse(yesNo)) ||
            utils.isStrValid(written);
    }
    /**
     * Validate user's response to yes/no option
     * @param yesNoStr {string} - User response to yes/no option
     * @returns {boolean} - Whether user has a void response to yes/no option
     */
    validateYesNoResponse(yesNoStr: string): boolean {
        return (yesNoStr === 'yes') || (yesNoStr === 'no');
    }
    // get total number of questions
    getQuestionsCount(): number {
        return this.questions.length;
    }
    // get total number of sections
    getSectionsCount(): number {
        return this.sections.length;
    }

    // map questions to sections
    mapQuestionsToSections(): void {
        // key: section number, value: section object
        let sections = {}
        this.questions.forEach((q, i) => {
            let s = sections[q.section_num];
            if (!(s instanceof Section)) {
                s = new Section(q.section_num, q.section);
                s.addQuestion(q);
                sections[q.section_num] = s;
            } else {
                sections[q.section_num].addQuestion(q);
                
            }
        });
        let keys = Object.keys(sections);
        keys.sort((a, b) => parseInt(a) - parseInt(b));
        this.sections = keys.map(k => sections[k]);
    }
    // map questions to responses
    mapQuestionsToResponses(): void {
        // key: question number, value: response object
        this.responses = this.questions.map((q, i) => {
            return new Response(q.num, q.section_num, q.checklist.map(c => false));
        });
    }

    // transform responses to form object 
    createForm(fb: FormBuilder): FormGroup {
        this.form = fb.group({
            questions: fb.array(this.responses.map(r => fb.group({
                ...r,
                checklist: fb.array(r.checklist)
            })))
        });
        return this.form;
    }
}