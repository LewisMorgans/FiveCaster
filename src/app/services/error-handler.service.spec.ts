import { TestBed } from '@angular/core/testing';

import { ErrorHandlerService } from './error-handler.service';
import { BsModalService } from 'ngx-bootstrap/modal';

describe('ErrorHandlerService', () => {
  let service: ErrorHandlerService;
  let spyBsModalService: jasmine.SpyObj<BsModalService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('BsModalService', ['show']);

    TestBed.configureTestingModule({
      providers: [
        { provide: BsModalService, useValue: spy }
      ]
    });

    service = TestBed.inject(ErrorHandlerService);
    spyBsModalService = TestBed.inject(BsModalService) as jasmine.SpyObj<BsModalService>;
    spyBsModalService.show.and.callThrough();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('[ErrorHandler] Should call the modalService if the error is found in the error map', () => {
    service.errorHandler(404);
    expect(spyBsModalService.show).toHaveBeenCalled();
  });
});
