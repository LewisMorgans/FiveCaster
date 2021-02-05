import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorHandlerInterceptor } from './interceptors/error-handler.interceptor';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppRoutingModule } from './app-router.module';
import { CommonModule } from '@angular/common';
import { ErrorModalComponent } from './components/error-modal/error-modal.component';

@NgModule({
  declarations: [AppComponent, ErrorModalComponent],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
