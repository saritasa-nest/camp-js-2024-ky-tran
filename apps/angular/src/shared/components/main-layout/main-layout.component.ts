import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProgressSpinnerComponent } from '@js-camp/angular/shared/components/progress-spinner/progress-spinner.component';
import { ErrorMessageComponent } from '@js-camp/angular/shared/components/error-message/error-message.component';
import { UserService } from '@js-camp/angular/core/services/user.service';

/** Main Layout component. */
@Component({
	selector: 'camp-main-layout',
	standalone: true,
	templateUrl: './main-layout.component.html',
	styleUrl: './main-layout.component.css',
	imports: [RouterModule, ProgressSpinnerComponent, ErrorMessageComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent {
	private readonly userService = inject(UserService);
}
