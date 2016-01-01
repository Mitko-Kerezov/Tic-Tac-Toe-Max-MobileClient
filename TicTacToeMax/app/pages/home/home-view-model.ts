/// <reference path="../../.d.ts" />

import {authentication} from "../../config/auth";
import {Navigation} from "../../utilities/navigation";
import {Notifications} from "../../utilities/notifications";
import {Views} from "../../utilities/views";
import {ViewModelBase} from "../common/view-model-base";

export class HomeViewModel extends ViewModelBase {
    constructor() {
        super();

    }

    public get username(): string {
        return authentication.username;
    }


    public logout(): void {
        authentication.logout();
        Navigation.navigate({
            moduleName: Views.login,
            backstackVisible: false,
            clearHistory: true
        });
    }
}
