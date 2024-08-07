import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { emptyStringAttribute } from '@js-camp/angular/shared/attributes/empty-string-attribute';

/** Lazy Load Image directive. */
@Directive({
	selector: 'img[appLazyLoadImage]',
	standalone: true,
})
export class LazyLoadImageDirective implements OnInit {
	/** Image src. */
	@Input({ alias: 'appLazyLoadImage', required: true, transform: emptyStringAttribute })
	protected readonly src!: string;

	public constructor(private readonly element: ElementRef, private readonly renderer: Renderer2) {}

	/** On Init. */
	public ngOnInit(): void {
		const observer = new IntersectionObserver(entries => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					this.loadImage();
					observer.disconnect();
				}
			});
		}, { threshold: 0.5 });

		observer.observe(this.element.nativeElement);
	}

	private loadImage(): void {
		this.renderer.setAttribute(this.element.nativeElement, 'src', this.src);
	}
}
