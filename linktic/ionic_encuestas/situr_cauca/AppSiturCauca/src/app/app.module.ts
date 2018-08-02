import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SitiosdeinteresPage } from '../pages/sitiosdeinteres/sitiosdeinteres';
import { TransportePage } from '../pages/transporte/transporte';
import { AlimentacionPage } from '../pages/alimentacion/alimentacion';
import { AlojamientoPage } from '../pages/alojamiento/alojamiento';
import { EmisorPage } from '../pages/emisor/emisor';
import { EmpleoPage } from '../pages/empleo/empleo';
import { WelcomePage } from '../pages/welcome/welcome';
import { SincronizacionPage } from '../pages/sincronizacion/sincronizacion';
import { ReceptorTwoPage } from '../pages/receptor-two/receptor-two';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../core/services/user.service';
import { StorageService } from '../core/services/storage.service';
import { AlertService } from '../core/services/alert.service';
import { AgenciasdeviajesPage } from '../pages/agenciasdeviajes/agenciasdeviajes';
import { FunctionsGlobalsService } from '../core/services/functions-globals.service';
import { SendDataService } from '../core/services/sendData.service';
import { ProveedorProvider } from '../providers/proveedor/proveedor';
import { Network } from '@ionic-native/network';
import { EmisorMoment1Component } from "../components/emisor-moment1/emisor-moment1";
import { EmisorMoment2Component } from "../components/emisor-moment2/emisor-moment2";
import { ReceptorMoment1Component } from "../components/receptor-moment1/receptor-moment1";
import { ReceptorMoment2Component } from "../components/receptor-moment2/receptor-moment2";
import { AppService } from '../services/app.service';
import { Http, Response} from "@angular/http";
import { EventEmiterService } from '../services/app.event.emitter.service';
import { ReceptorPage } from "../pages/receptor/receptor";
//import { AutoCompleteModule } from 'ionic2-auto-complete';
import { AppValidations } from "./app.validations";
import { AppConfigurations } from "./app.configuration";
import { AppSaveForm } from "../services/app.save.form.service";
import { ItemSincronizeComponent } from "../components/item-sincronize/item-sincronize";
import { SelectSearchableModule } from 'ionic-select-searchable';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SitiosdeinteresPage,
    TransportePage,
    AlimentacionPage,
    AgenciasdeviajesPage,
    AlojamientoPage,
    EmisorPage,
    EmpleoPage,
    ReceptorPage,
    ReceptorTwoPage,
    EmisorMoment1Component,
    EmisorMoment2Component,
    ReceptorMoment1Component,
    ReceptorMoment2Component,
    WelcomePage,
    SincronizacionPage,
    ItemSincronizeComponent
  ],
  imports: [
    //AutoCompleteModule,
    BrowserModule,
    HttpClientModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    SelectSearchableModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    WelcomePage,
    SincronizacionPage,
    SitiosdeinteresPage,
    TransportePage,
    AlimentacionPage,
    AgenciasdeviajesPage,
    AlojamientoPage,
    EmisorPage,
    ReceptorPage,
    EmpleoPage,
    ReceptorTwoPage
  ],
  providers: [
    AppService,
    StatusBar,
    SplashScreen,
    AuthService,
    StorageService,
    AlertService,
    FunctionsGlobalsService,
    Network,
    SendDataService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProveedorProvider,
    EventEmiterService,
    AppValidations,
    AppConfigurations,
    AppSaveForm
  ]
})
export class AppModule {}
