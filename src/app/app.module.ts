import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppComponent } from "./app.component";
import { HotKeysModule } from 'ng-hotkeys';
import { AppRoutingModule } from './app-routing.module';
import { GettingStartedComponent } from './getting-started/getting-started.component';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from "./material-module";

@NgModule({
    imports: [
        BrowserModule,
        HotKeysModule.forRoot(),
        BrowserAnimationsModule,
        MaterialModule,
        AppRoutingModule,
    ],
    declarations: [AppComponent, GettingStartedComponent, HomeComponent],
    bootstrap: [AppComponent]
})
export class AppModule {}
