import { Directive, ElementRef, inject, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { emptyStringAttribute } from '@js-camp/angular/shared/attributes/empty-string-attribute';

/** Lazy Load Image directive. */
@Directive({ selector: 'img[appLazyLoadImage]', standalone: true })
export class LazyLoadImageDirective implements OnInit, OnDestroy {
	/** Image src. */
	@Input({ alias: 'appLazyLoadImage', required: true, transform: emptyStringAttribute })
	protected readonly src!: string;

	private observer!: IntersectionObserver;

	private readonly element = inject(ElementRef);

	private readonly renderer = inject(Renderer2);

	/** On Init. */
	public ngOnInit(): void {
		this.observer = new IntersectionObserver(entries => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					this.loadImage();
					this.disconnectObserver();
				}
			});
		}, { threshold: 0.5 });

		this.observer.observe(this.element.nativeElement);
	}

	/** On Destroy. */
	public ngOnDestroy(): void {
		this.disconnectObserver();
	}

	private loadImage(): void {
		this.renderer.setAttribute(this.element.nativeElement, 'src', this.src);
	}

	private disconnectObserver(): void {
		this.observer.disconnect();
	}
}
