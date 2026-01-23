import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'gr-back-to-start-button',
  imports: [RouterLink, FontAwesomeModule],
  templateUrl: './back-to-start-button.component.html',
  styleUrl: './back-to-start-button.component.scss'
})
export class BackToStartButtonComponent {
  public readonly faArrowRotateLeft = faArrowRotateLeft;

  public navigateToHome(event: Event): void {
    event.preventDefault();
    // Navigate to / as if to an external page. 
    // This triggers the beforeunload event.
    window.location.href = '/';
  }

}
