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
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from './storage.service';
import { environment as ENV } from '../../environment/environment';
var AuthService = /** @class */ (function () {
    function AuthService(http, storage) {
        this.http = http;
        this.storage = storage;
        this.isLoggedIn = false;
    }
    AuthService.prototype.login = function (email, password) {
        var headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        var body = {
            email: email,
            password: password
        };
        return this.http.post("" + ENV.server_url + ENV.login, body, { headers: headers });
    };
    AuthService.prototype.logOut = function () {
        this.storage.removeStorageUser();
    };
    AuthService.prototype.setLogin = function (value) {
        this.isLoggedIn = value;
    };
    AuthService.prototype.authenticated = function () {
        return this.isLoggedIn;
    };
    AuthService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient,
            StorageService])
    ], AuthService);
    return AuthService;
}());
export { AuthService };
//# sourceMappingURL=user.service.js.map