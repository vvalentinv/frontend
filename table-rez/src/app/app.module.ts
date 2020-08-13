import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RestaurantCardsComponent } from './restaurant-cards/restaurant-cards.component';
import { MatCardModule } from '@angular/material/card';
import { MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import { HeaderComponent } from './header/header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { FooterComponent } from './footer/footer.component';
import {MatButtonModule} from '@angular/material/button';
import { CustomerService } from './services/customer.service';
import { AuthService } from './services/auth.service';
import {LoginComponent} from './login/login.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from "@angular/material/input";
import { RegisterComponent } from './register/register.component';
import { HeroBanerComponent } from './hero-baner/hero-baner.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {MatTableModule} from '@angular/material/table';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { ReservationComponent } from './reservation/reservation.component';
import {MatSelectModule} from '@angular/material/select';
import { FilterPipe }  from './services/filter.pipe';
import {RegisterManagerComponent} from './register-manager/register-manager.component';
import { LoginManagerComponent } from './login-manager/login-manager.component';
import { AddItemComponent } from './add-item/add-item.component';
import { AddMenusectionComponent } from './add-menusection/add-menusection.component';
import { ManagerComponent } from './manager/manager.component';

import { LoginOwnerComponent } from './login-owner/login-owner.component'
import { RegisterOwnerComponent } from './register-owner/register-owner.component';

import { CustomerPageComponent } from './customer-page/customer-page.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatStepperModule} from '@angular/material/stepper';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
import { NoteComponent } from './note/note.component';
//import { DialogComponent } from './dialog/dialog.component';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    RestaurantCardsComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    RegisterManagerComponent,
    HeroBanerComponent,
    RestaurantComponent,

    ReservationComponent,
    FilterPipe,
    LoginManagerComponent,
    AddItemComponent,
    AddMenusectionComponent,
    ManagerComponent,

    LoginOwnerComponent,
    RegisterOwnerComponent,

    CustomerPageComponent,
    NoteComponent
    //DialogComponent

  ],
  imports: [
    MatButtonModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    MatGridListModule,
    MatIconModule,
    MatExpansionModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatMenuModule,
    MatInputModule,
    MatStepperModule,
    MatCardModule,
    MatListModule,
    MatToolbarModule,
    HttpClientModule,
    RouterModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatDialogModule,
    MDBBootstrapModule.forRoot(),
    ],
  providers: [AuthService],
  bootstrap: [AppComponent],
  entryComponents:[HeroBanerComponent]
})
export class AppModule { }
