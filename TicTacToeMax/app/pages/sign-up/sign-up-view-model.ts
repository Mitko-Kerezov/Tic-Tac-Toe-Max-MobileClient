/// <reference path="../../.d.ts" />

import {authentication} from "../../config/auth";
import {Navigation} from "../../utilities/navigation";
import {Notifications} from "../../utilities/notifications";
import {Views} from "../../utilities/views";
import {ViewModelBase} from "../common/view-model-base";

export class SignUpViewModel extends ViewModelBase {
    private _username: string;
    private _password: string;
    private _confirmPassword: string;

    constructor() {
        super();

        this.username = "";
        this.password = "";
        this.confirmPassword = "";
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

    public get confirmPassword(): string {
        return this._confirmPassword;
    }

    public set confirmPassword(value: string) {
        if (this._confirmPassword !== value) {
            this._confirmPassword = value;
            this.notifyPropertyChange("confirmPassword", value);
        }
    }

    public signUp() {
        if (this.validate()) {
            if (!this.beginLoading()) {
                return;
            }

            authentication
            .signUp(this.username, this.password, this.confirmPassword)
            .then((data: any) => {
                authentication
                .login(this.username, this.password)
                .then((data: any) => {
                    Navigation.navigate({
                        moduleName: Views.home
                    });
                    this.endLoading();
                }, (error: any) => {
                    this.endLoading();
                });
            }, (error: any) => {
                this.clearPassword();
                this.endLoading();
            });
        } else {
            this.clearPassword();
        }
    }

    public login() {
        Navigation.navigate({
            moduleName: Views.login,
            backstackVisible: false
        });
    }

    private clearPassword() {
        this.password = "";
        this.confirmPassword = "";
    }

    private validate(): boolean {
        if (!this.username || this.username == "") {
            Notifications.showError("Please enter username.");
            return false;
        }

        if (!this.password || this.password == "") {
            Notifications.showError("Please enter password.");
            return false;
        }

        if (this.confirmPassword != this.password) {
            Notifications.showError("Passwords did not match.");
            return false;
        }

        return true;
    }
}
