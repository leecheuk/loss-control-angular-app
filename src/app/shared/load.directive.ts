import { 
    Directive, 
    EventEmitter, 
    ElementRef, 
    Output, 
    HostListener
} from '@angular/core';

@Directive({
    selector: '[loaded]'
})
export class LoadDirective {

    @Output() loaded = new EventEmitter();

    @HostListener('load')
    onLoad() {
        if (this.el.nativeElement.complete) {
            this.loaded.emit();
        }
    }

    constructor(
        private el: ElementRef
    ) {}
}