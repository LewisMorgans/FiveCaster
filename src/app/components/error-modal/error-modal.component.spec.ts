import { TestBed, waitForAsync } from '@angular/core/testing';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ErrorModalComponent } from './error-modal.component';
import { ReplaySubject } from 'rxjs';

describe('Error-Modal Unit Tests', () => {
  let component: ErrorModalComponent;
  let spyBsModalService: jasmine.SpyObj<BsModalService>;
  let router;
  const eventSubject = new ReplaySubject<RouterEvent>(1);

  beforeEach(
    waitForAsync(() => {
      const spy = jasmine.createSpyObj('BsModalService', ['hide']);
      const mockRouter = {
        navigate: jasmine.createSpy('navigate'),
        events: eventSubject.asObservable(),
      };
      const mockLocation = {
        location: {
          reload: () => {},
        },
      };

      TestBed.configureTestingModule({
        providers: [
          ErrorModalComponent,
          { provide: Router, useValue: mockRouter },
          { provide: BsModalService, useValue: spy },
          { provide: location, useValue: mockLocation },
        ],
      }).compileComponents();

      component = TestBed.inject(ErrorModalComponent);
      spyBsModalService = TestBed.inject(BsModalService) as jasmine.SpyObj<BsModalService>;
      router = TestBed.inject(Router);
      spyBsModalService.hide.and.callThrough();
    })
  );

  it('[Component] Expect component to exist', () => {
    expect(component).toBeTruthy();
  });

  it('[Refresh Application] On execution it should navigate back to the applications root', (done) => {
    const reloadSpy = spyOn(component, 'reloadLocation').and.callFake(() => null);
    eventSubject.next(new NavigationEnd(1, 'start', 'end'));
    component.refreshApplication();
    expect(router.navigate).toHaveBeenCalled();
    expect(spyBsModalService.hide).toHaveBeenCalled();
    router.events.subscribe((_) => {
      expect(reloadSpy).toHaveBeenCalled();
      done();
    });
  });
});
