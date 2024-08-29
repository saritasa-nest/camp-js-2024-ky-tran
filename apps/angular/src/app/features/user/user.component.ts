import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

/** User component. */
@Component({
	selector: 'camp-user',
	standalone: true,
	templateUrl: './user.component.html',
	styleUrl: './user.component.css',
	imports: [RouterModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent {}
