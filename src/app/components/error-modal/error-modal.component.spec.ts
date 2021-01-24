import { fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { ErrorModalComponent } from './error-modal.component';

describe('Error-Modal Unit Tests', () => {
  let component: ErrorModalComponent;
  let mockLocation: Partial<Location>;

  beforeEach(waitForAsync(() => {

    mockLocation = {
      reload: () => null
    };

    TestBed.configureTestingModule({
      providers: [
        ErrorModalComponent,
        { provide: location, useValue: mockLocation }
      ],
    }).compileComponents();

    component = TestBed.inject(ErrorModalComponent);
    spyOn(component, 'refreshApplication').and.callFake(() => { mockLocation.reload(); });
  })
  );

  it('[ErrorModalComponent] Should create component instance', () => {
    expect(ErrorModalComponent).toBeTruthy();
  });

  it('[Refresh Application] On execution it should navigate back to the applications root', fakeAsync(() => {
    const reloadSpy = spyOn(mockLocation, 'reload').and.callThrough();
    component.refreshApplication();
    expect(reloadSpy).toHaveBeenCalledTimes(1);
    tick();
  }));
});
