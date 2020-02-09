/**
 * @typedef QuestionStatus
 * @property {number} count_completed - Number of questions completed in questionaire
 * @property {number} count_completed_in_progress - Number of questions completed in in-progress section
 * @property {number} count_completed_current - Number of questions completed in current section
 * @property {number | null} count_total - Number of questions in questionaire
 * @property {number | null} count_in_progress - Number of questions in in-progress section
 * @property {number | null} count_current - Number of questions in current section
 */
type QuestionStatus = {
    count_completed: number; 
    count_completed_in_progress: number; 
    count_completed_current: number; 
    count_total: number | null; 
    count_in_progress: number | null; 
    count_current: number | null;
};
// current section status of questionaire
/**
 * @typedef SectionStatus
 * @property {number} num_current - Section number of currently browsing section
 * @property {number} num_in_progress - Section number of in-progress section
 * @property {number} count_completed - Number of sections completed
 * @property {number | null} count_total - Number of sections 
 */
type SectionStatus = {
    num_current: number; 
    num_in_progress: number; 
    count_completed: number; 
    count_total: number | null;
}

export interface IQuestionaire {
    questionStatus: QuestionStatus;
    sectionStatus: SectionStatus;
}
/**
 * Questionaire
 * To keep track of status of current, in progress and total questions statistics
 * in section and in questionaire.
 */ 
 export class Questionaire implements IQuestionaire {
    questionStatus: QuestionStatus = {
        count_completed: 0,
        count_completed_in_progress: 0, 
        count_completed_current: 0,
        count_total: null,
        count_in_progress: null,
        count_current: null
    };
    sectionStatus: SectionStatus = {
        num_current: 0,
        num_in_progress: 0,
        count_completed: 0,
        count_total: null
    };
    constructor() {

    }
    // just create instance until user wants to start questionaire
    initialize(section_count_total: number, question_count_current: number): void {
        this.questionStatus.count_total = question_count_current;
        this.questionStatus.count_in_progress = question_count_current;
        this.questionStatus.count_current = question_count_current;
        this.sectionStatus.count_total = section_count_total;
    }
    // update question progress (doing questions) -> update in-progress & current ones
    setQuestionCountCompleted(count: number): void {
        this.questionStatus.count_completed_in_progress = count;
    }
    // update section progress (navigating sections) -> update current ones
    initializeStatus(
            question_count_total: number, 
            question_count_current: number, 
            section_count_total: number
        ): void {
        this.questionStatus.count_total = question_count_total;
        this.questionStatus.count_in_progress = question_count_current; //
        this.questionStatus.count_current = question_count_current;
        this.sectionStatus.count_total = section_count_total;
        this.sectionStatus.num_current = 1;
        this.sectionStatus.num_in_progress = 1;
    }
    // return if current section is completed
    isCurrentSectionComplete(): boolean {
        return this.questionStatus.count_completed_current === this.questionStatus.count_current;
    }

    /**
     * Section Status setters & getters
     */
    
    set sectionNumCurrent(section_num: number) {
        this.sectionStatus.num_current = section_num;
    }

    get sectionNumCurrent(): number {
        return this.sectionStatus.num_current;
    }

    set sectionNumInprogress(section_num: number) {
        this.sectionStatus.num_in_progress = section_num;
    }

    get sectionNumInprogress(): number {
        return this.sectionStatus.num_in_progress;
    }

    set sectionCountCompleted(count: number) {
        this.sectionStatus.count_completed = count;
    }

    get sectionCountCompleted(): number {
        return this.sectionStatus.count_completed;
    }

    /**
     * Question Status setters & getters
     */

    set questionCountCompletedInprogress(count: number) {
        this.questionStatus.count_completed_in_progress = count;
    }

    get questionCountCompletedInprogress(): number {
        return this.questionStatus.count_completed_in_progress;
    }

    set questionCountInprogress(count: number) {
        this.questionStatus.count_in_progress = count;
    }

    get questionCountInprogress(): number {
        return this.questionStatus.count_in_progress;
    }

    set questionCountCurrent(count: number) {
        this.questionStatus.count_current = count;
    }
    
    get questionCountCurrent() {
        return this.questionStatus.count_current;
    }

    set questionCountCompleted(count: number) {
        this.questionStatus.count_completed = count;
    }

    get questionCountCompleted() {
        return this.questionStatus.count_completed;
    }

    set questionCountCompletedCurrent(count: number) {
        this.questionStatus.count_completed_current = count;
    }

    get questionCountCompletedCurrent(): number {
        return this.questionStatus.count_completed_current;
    }
}