import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { WelcomePage } from '../pages/welcome/welcome';
import { SincronizacionPage } from '../pages/sincronizacion/sincronizacion';
import { SitiosdeinteresPage } from '../pages/sitiosdeinteres/sitiosdeinteres';
import { TransportePage } from '../pages/transporte/transporte';
import { AlimentacionPage } from '../pages/alimentacion/alimentacion';
import { AgenciasdeviajesPage } from '../pages/agenciasdeviajes/agenciasdeviajes';
import { AlojamientoPage } from '../pages/alojamiento/alojamiento';
import { EmisorPage } from '../pages/emisor/emisor';
import { EmpleoPage } from '../pages/empleo/empleo';
import { ReceptorPage } from '../pages/receptor/receptor';
import { StorageService } from '../core/services/storage.service';
import { AuthService } from '../core/services/user.service';
import { SendDataService } from '../core/services/sendData.service';
import { ToastController } from 'ionic-angular';
import { Network } from '@ionic-native/network';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  rootPage2: any = SincronizacionPage;

  pages: Array<{title: string, component: any, icon: string}>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private storageService: StorageService,
    private userService: AuthService,
    private sendData: SendDataService,
    private toastCtrl: ToastController,
    private network: Network
    ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Receptor', component: ReceptorPage, icon: 'call' },
      { title: 'Emisor', component: EmisorPage, icon: 'megaphone' },
      { title: 'Empleo', component: EmpleoPage, icon: 'briefcase' },
      { title: 'Sincronización', component: SincronizacionPage, icon: 'sync' }
    ]
  }

  initializeApp() {
    this.platform.ready().then(() => {

      this.storageService.loadStorageUser()
        .then( () => {
          if( this.storageService.user === undefined || this.storageService.user === null ){
            this.userService.setLogin(false);
            this.rootPage = LoginPage;
          }else {
            this.userService.setLogin(true);
            //this.rootPage = HomePage;
            this.rootPage = WelcomePage;

          }

          // Okay, so the platform is ready and our plugins are available.
          // Here you can do any higher level native things you might need.
          this.statusBar.styleDefault();
          this.splashScreen.hide();
        });
    });   
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  public logOut(): void {
    this.nav.setRoot(LoginPage);
    this.userService.setLogin(false);
    this.userService.logOut();
  }
}
