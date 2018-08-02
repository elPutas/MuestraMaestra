var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';
import { AlertService } from './alert.service';
var StorageService = /** @class */ (function () {
    function StorageService(platform, storage, alert) {
        this.platform = platform;
        this.storage = storage;
        this.alert = alert;
    }
    //User
    StorageService.prototype.loadStorageUser = function () {
        var _this = this;
        var load = new Promise(function (resolve, reject) {
            if (_this.platform.is('cordova')) {
                _this.storage.ready()
                    .then(function () {
                    _this.storage.get('user')
                        .then(function (user) {
                        if (user) {
                            _this.user = user;
                        }
                        resolve();
                    });
                });
            }
            else {
                if (localStorage.getItem('user')) {
                    _this.user = JSON.parse(localStorage.getItem('user'));
                }
                resolve();
            }
        });
        return load;
    };
    StorageService.prototype.saveStorageUser = function (data) {
        var _this = this;
        if (this.platform.is('cordova')) {
            this.storage.ready()
                .then(function () {
                _this.storage.set('user', data);
                _this.user = data;
            });
        }
        else {
            localStorage.setItem('user', JSON.stringify(data));
            this.user = data;
        }
    };
    StorageService.prototype.removeStorageUser = function () {
        var _this = this;
        if (this.platform.is('cordova')) {
            this.storage.ready()
                .then(function () {
                _this.storage.remove('user');
            });
        }
        else {
            localStorage.removeItem('user');
        }
    };
    //Forms
    StorageService.prototype.loadStorageForm = function (name) {
        var _this = this;
        var load = new Promise(function (resolve, reject) {
            if (_this.platform.is('cordova')) {
                _this.storage.ready()
                    .then(function () {
                    _this.storage.get(name)
                        .then(function (data) {
                        if (data) {
                            _this[name] = data;
                        }
                        resolve();
                    });
                });
            }
            else {
                if (localStorage.getItem(name)) {
                    _this[name] = JSON.parse(localStorage.getItem(name));
                }
                resolve();
            }
        });
        return load;
    };
    StorageService.prototype.saveStorageForm = function (name, data) {
        var _this = this;
        if (this.platform.is('cordova')) {
            this.storage.ready()
                .then(function () {
                _this.storage.set(name, data);
                _this.alert.alert('Formulario Guardado', 'success');
            });
        }
        else {
            localStorage.setItem(name, JSON.stringify(data));
            this.alert.alert('Formulario Guardado', 'success');
        }
    };
    StorageService.prototype.removeStorageForm = function (name) {
        var _this = this;
        if (this.platform.is('cordova')) {
            this.storage.ready()
                .then(function () {
                _this.storage.remove(name);
            });
        }
        else {
            localStorage.removeItem(name);
        }
    };
    StorageService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Platform,
            Storage,
            AlertService])
    ], StorageService);
    return StorageService;
}());
export { StorageService };
//# sourceMappingURL=storage.service.js.map