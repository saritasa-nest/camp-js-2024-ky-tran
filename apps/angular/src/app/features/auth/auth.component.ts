import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

/** Auth component. */
@Component({
	selector: 'camp-auth',
	standalone: true,
	templateUrl: './auth.component.html',
	styleUrl: './auth.component.css',
	imports: [RouterModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent {}
