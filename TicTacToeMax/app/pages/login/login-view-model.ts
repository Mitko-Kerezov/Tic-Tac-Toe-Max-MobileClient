/// <reference path="../../.d.ts" />

import { ios } from "application";
import { authentication } from "../../config/auth";
import { Navigation } from "../../utilities/navigation";
import { Notifications } from "../../utilities/notifications";
import { Views } from "../../utilities/views";
import { ViewModelBase } from "../common/view-model-base";
let FacebookLoginHandler = require("nativescript-facebook-login");

export class LoginViewModel extends ViewModelBase {
    private _username: string;
    private _password: string;

    constructor() {
        super();

        this._username = "";
        this._password = "";
    }

    public get username(): string {
        return this._username;
    }

    public set username(value: string) {
        if (this._username !== value) {
            this._username = value;
            this.notifyPropertyChange("username", value);
        }
    }

    public get password(): string {
        return this._password;
    }

    public set password(value: string) {
        if (this._password !== value) {
            this._password = value;
            this.notifyPropertyChange("password", value);
        }
    }

    public login(): void {
        if (this.validate()) {
            if (!this.beginLoading()) {
                return;
            }

            authentication
                .login(this.username, this.password)
                .then((data: any) => {
                    Navigation.navigate({
                        moduleName: Views.home
                    });
                    this.endLoading();
                }, (error: any) => {
                    this.clearPassword();
                    this.endLoading();
                });
        } else {
            this.clearPassword();
        }
    }

    public loginWithFb(): void {
        if (ios) {
            FacebookLoginHandler.init(2);
        } else {
            FacebookLoginHandler.init();
        }

        FacebookLoginHandler.registerCallback(this.successCallback, this.cancelCallback, this.failCallback);
        FacebookLoginHandler.logInWithReadPermissions(["public_profile"]);
    }

    public signUp(): void {
        Navigation.navigate({
            moduleName: Views.signUp,
            backstackVisible: false
        });
    }

    private clearPassword(): void {
        this.password = "";
    }

    private validate(): boolean {
        if (!this.username) {
            Notifications.showError("Please enter username.");
            return false;
        }

        if (!this.password) {
            Notifications.showError("Please enter password.");
            return false;
        }

        return true;
    }

    private successCallback(result) {
        let token = ios ? result.token.tokenString : result.getAccessToken().getToken();
        authentication.loginWithFb(token)
            .then((data: any) => {
                Navigation.navigate({
                    moduleName: Views.home
                });
            });
    }

    private cancelCallback() {
        Notifications.showError("Login was cancelled");
    }

    private failCallback(error) {
        let errorMessage = "Error with Facebook";
        if (error) {
            if (error.getErrorMessage) {
                errorMessage += ": " + error.getErrorMessage();
            }
            else if (error.getErrorCode) {
                errorMessage += ": Code " + error.getErrorCode();
            }
            else {
                errorMessage += ": " + error;
            }
        }

        Notifications.showError(errorMessage);
    }
}
