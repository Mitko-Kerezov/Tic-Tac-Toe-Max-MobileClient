/// <reference path="../../.d.ts" />

import {authentication} from "../../config/auth";
import {Constants} from "../../constants";
import {Navigation} from "../../utilities/navigation";
import {Notifications} from "../../utilities/notifications";
import {Views} from "../../utilities/views";
import {ViewModelBase} from "../common/view-model-base";
import {PlayViewModel} from "../play/play-view-model";
import {JoinViewModel} from "../join/join-view-model";
import {StatusCodes} from "../../utilities/statusCodes";
import * as http from "http";

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

    public newGame(): void {
            http.request({
                url: Constants.Server.CreateGameEndpoint,
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": authentication.authorizationHeader
                },
                timeout: 2000 /* miliseconds */
            })
            .then((response: http.HttpResponse) => {
                if (StatusCodes.isOK(response.statusCode)) {
                    let playModel = new PlayViewModel(response.content.toJSON());
                    Navigation.navigate({
                        moduleName: Views.play,
                        context: playModel
                    });
                } else {
                    Notifications.showError(response.content.toString());
                }
            }, (error: any) => {
                Notifications.showError(error.message);
            })
    }

    public joinGame(): void {
            http.request({
                url: Constants.Server.JoinGameEndpoint,
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": authentication.authorizationHeader
                },
                timeout: 2000 /* miliseconds */
            })
            .then((response: http.HttpResponse) => {
                if (StatusCodes.isOK(response.statusCode)) {
                    let joinModel = new JoinViewModel(response.content.toJSON());
                    Navigation.navigate({
                        moduleName: Views.join,
                        context: joinModel
                    });
                } else {
                    Notifications.showError(response.content.toString());
                }
            }, (error: any) => {
                Notifications.showError(error.message);
            })
    }
}
