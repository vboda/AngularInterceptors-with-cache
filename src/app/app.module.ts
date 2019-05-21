import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { AddHeaderInterceptor } from './interceptors/addHeader.interceptor';
import { LogResponseInterceptor } from './interceptors/logResponse.interceptor';
import { CacheInterceptor } from './interceptors/cache.Interceptor';
import { SampleComponent } from './sample/sample.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    SampleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path:"users", component:UsersComponent},
      {path:"", redirectTo:"users", pathMatch:"full"},
      {path:"sample", component:SampleComponent}
    ])
  ],
  providers: [
    /* {provide:HTTP_INTERCEPTORS, useClass:AddHeaderInterceptor, multi:true},
    {provide:HTTP_INTERCEPTORS, useClass:LogResponseInterceptor, multi:true} */
    {provide:HTTP_INTERCEPTORS, useClass:CacheInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
