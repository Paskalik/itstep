import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserContactsComponent } from './user-contacts/user-contacts.component';
import { UserExperienceComponent } from './user-experience/user-experience.component';
import { UserSkillsComponent } from './user-skills/user-skills.component';
import { UserSocialComponent } from './user-social/user-social.component';

@NgModule({
  declarations: [
    AppComponent,
    UserContactsComponent,
    UserExperienceComponent,
    UserSkillsComponent,
    UserSocialComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
