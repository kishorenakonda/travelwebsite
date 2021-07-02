import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AppRoutes } from './app.routes';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { WeatherComponent } from './components/weather/weather.component';
import { DestinationsComponent } from './components/destinations/destinations.component';
import { QuoteComponent } from './components/quote/quote.component';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    WeatherComponent,
    DestinationsComponent,
    QuoteComponent,
    WelcomePageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(AppRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
