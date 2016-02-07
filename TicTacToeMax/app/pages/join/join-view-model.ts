/// <reference path="../../.d.ts" />

import {authentication} from "../../config/auth";
import {Constants} from "../../constants";
import {Navigation} from "../../utilities/navigation";
import {Notifications} from "../../utilities/notifications";
import {Views} from "../../utilities/views";
import {ViewModelBase} from "../common/view-model-base";
import {PlayViewModel} from "../play/play-view-model";
import {StatusCodes} from "../../utilities/statusCodes";
import * as http from "http";

export class JoinViewModel extends ViewModelBase {
	private _joinableGames: IJoinableGame[] = null;

	constructor(games: IJoinableGame[]) {
		super();

		this._joinableGames = games;
	}

	public get joinableGames(): IJoinableGame[] {
		return this._joinableGames;
	}

	public joinGame(game: IJoinableGame): void {
			if (!this.beginLoading()) {
                return;
            }

            http.request({
                url: Constants.Server.JoinGameEndpoint,
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": authentication.authorizationHeader
                },
                content: JSON.stringify({
                    gameId: game.id
                }),
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
				this.endLoading();
            })
    }
}
