import { Component } from '@angular/core';

@Component({
  selector: 'app-modal-content',
  styleUrls: ['./error-modal.component.scss'],
  templateUrl: './error-modal.component.html',
})
export class ErrorModalComponent {
  public exceptionMessage;

  public refreshApplication(): void {
    location.reload();
  }
}
