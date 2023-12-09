import { Directive, ElementRef, HostListener, Renderer2 } from "@angular/core";



@Directive({
    selector: '[appHighlightCard]'
})
export class HighlightCardDirective {

    constructor(private el: ElementRef, private renderer: Renderer2) {}

    @HostListener('mouseover') onMouseEnter() {
        this.highlight('yellow');
    }

    @HostListener('mouseleave') onMouseOut() {
        this.highlight(null);
    }

    private highlight(color: string | null) {
        this.renderer.setStyle(this.el.nativeElement, 'border', color ? `2px solid ${color}` : null);
    }
}
