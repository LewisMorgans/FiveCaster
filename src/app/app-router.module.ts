import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';

const applicationRoutes: Routes = [{path: '', component: AppComponent}];

@NgModule({
  imports: [RouterModule.forRoot(applicationRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
