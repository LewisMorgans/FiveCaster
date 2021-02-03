import { Injectable } from '@angular/core';
import {ErrorMap} from '../models';
import {BsModalService} from 'ngx-bootstrap/modal';
import {ErrorModalComponent} from '../components/error-modal/error-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private readonly bsModalService: BsModalService) { }

  public errorHandler(error: number): void {
    if (ErrorMap.has(error)) {
      const exceptionMessage = ErrorMap.get(error);
      this.bsModalService.show(ErrorModalComponent, {
        backdrop: true,
        show: true,
        initialState: {exceptionMessage}
      });
    }
  }
}
