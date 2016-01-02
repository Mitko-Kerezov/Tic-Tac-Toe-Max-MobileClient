/// <reference path="../.d.ts" />

import * as applicationSettingsModule from "application-settings";
import {Constants} from "../constants";
import {Notifications} from "../utilities/notifications";
import {StatusCodes} from "../utilities/statusCodes";
import * as http from "http";

class Authentication {
    private _token: string = null;
    private _username: string = null;

    public get isAuthenticated(): boolean {
        return applicationSettingsModule.hasKey(Constants.AuthenticationTokenKey);
    }

    public get token(): string {
        if (!this._token) {
            this._token = applicationSettingsModule.getString(Constants.AuthenticationTokenKey, null);
        }

        return this._token;
    }

    public get username(): string {
        if (!this._username) {
            this._username = applicationSettingsModule.getString(Constants.UsernameKey, null);
        }

        return this._username;
    }

    public get authorizationHeader(): string {
        return `Bearer ${this.token}`;
    }

    public login(username: string, password: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            http.request({
                url: Constants.Server.LoginEndpoint,
                method: "POST",
                headers: { "Content-Type": "application/json" },
                content: JSON.stringify({
                    username: username,
                    password: password
                }),
                timeout: 2000 /* miliseconds */
            })
            .then((response: http.HttpResponse) => {
                if (StatusCodes.isOK(response.statusCode)) {
                    let token = response.content.toJSON().token;
                    this.setupLocalSettings(token, username);
                    resolve(response.content);
                } else {
                    Authentication.showErrorAndReject(response.content.toString(), reject);
                }
            }, (error: any) => {
                Authentication.showErrorAndReject(error.message, reject);
            })
        });
    }

    public logout(): void {
        this.clearLocalSettings();
    }

    public signUp(username: string, password: string, confirmPassword: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            http.request({
                url: Constants.Server.RegisterEndpoint,
                method: "POST",
                headers: { "Content-Type": "application/json" },
                content: JSON.stringify({
                    username: username,
                    password: password,
                    confirmPassword: confirmPassword
                }),
                timeout: 2000 /* miliseconds */
            })
            .then((response: http.HttpResponse) => {
                if (StatusCodes.isOK(response.statusCode)) {
                    resolve(response.content.toJSON());
                } else {
                    Authentication.showErrorAndReject(response.content.toJSON().message, reject);
                }
            }, (error: any) => {
                Authentication.showErrorAndReject(error.message, reject);
            })
        });
    }

    private static showErrorAndReject(errorMessage: string, reject: (e: any) => void) {
        Notifications.showError(errorMessage);
        reject(errorMessage);
    }

    private setupLocalSettings(authenticationTokenKey: string, username: string): void {
        applicationSettingsModule.setString(Constants.AuthenticationTokenKey, authenticationTokenKey);
        applicationSettingsModule.setString(Constants.UsernameKey, username);
    }

    private clearLocalSettings(): void {
        applicationSettingsModule.remove(Constants.AuthenticationTokenKey);
        applicationSettingsModule.remove(Constants.UsernameKey);
    }
}

export let authentication = new Authentication();
