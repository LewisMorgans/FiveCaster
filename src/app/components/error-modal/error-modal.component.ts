import { Component } from '@angular/core';

@Component({
  selector: 'modal-content',
  styleUrls: ['./error-modal.component.scss'],
  templateUrl: './error-modal.component.html',
})
export class ErrorModalComponent {

  public refreshApplication(): void {
    location.reload();
  }
}
