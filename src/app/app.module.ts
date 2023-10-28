import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from 'src/app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';
import { FaqComponent } from './features/my-application/feat-general/components/faq/faq.component';
import { ErrorComponent } from './features/my-application/feat-general/components/error/error.component';
import { FeatGeneralModule } from './features/my-application/feat-general/feat-general.module';

@NgModule({
  declarations: [AppComponent, FaqComponent, ErrorComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedComponentsModule,
    FeatGeneralModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
