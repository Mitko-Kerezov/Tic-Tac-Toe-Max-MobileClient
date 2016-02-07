/// <reference path="../../.d.ts" />

import {Notifications} from "../../utilities/notifications";
import {ViewModelBase} from "../common/view-model-base";
import {Constants} from "../../constants";
import {authentication} from "../../config/auth";
require('nativescript-websockets');

export class PlayViewModel extends ViewModelBase {
    private _game: IGame = null;
    private _board: IGameCell[] = null;
	private _ws: WebSocket = null;

    constructor(game: IGame) {
        super();

		let that = this;
		this._game = game;
		this._board = [];
		this._ws = new WebSocket(Constants.Server.WebSocketUrl);

		this._ws.addEventListener('message', function(evt: MessageEvent) {
			console.log("We got a message: ", JSON.stringify(evt.data, null, 2));
			let response: IWebSocketResponse = JSON.parse(evt.data);
			if (~response.usernames.indexOf(authentication.username)) {
				if (response.isError) {
					Notifications.showError(response.message);
				} else {
					Notifications.showInfo(response.message);
					if (response.message === Constants.Responses.MoveMade) {
						that._game.board = response.board;
						that._board = [];
						that.notifyPropertyChange("board", that.board);
					}
				}
			}
		});

		this._ws.addEventListener('close', function(evt: CloseEvent) {
			Notifications.showError(`The Socket was Closed: Code: ${evt.code} Reason: ${evt.reason}`);
		});

		this._ws.addEventListener('error', function(evt: ErrorEvent) {
			Notifications.showError(`The socket had an error: ${JSON.stringify(evt.error, null, 2)}`);
		});
	}

	public get board(): IGameCell[] {
		if (!this._board || !this._board.length) {
			Object.keys(this._game.board).forEach((boardRow: string) => {
				Object.keys(this._game.board[boardRow]).forEach((boardCol: string) => {
					this._game.board[boardRow][boardCol].tiles.forEach((boardValue: string[], cellRow: string) => {
						boardValue.forEach((cellValue: string, cellCol: number) => {
							this._board.push({
								boardRow: +boardRow,
								boardCol: +boardCol,
								cellRow: +cellRow,
								cellCol: +cellCol,
								value: cellValue
							})
						})
					})
				})
			})
		}

		return this._board;
	}

	public makeMove(cell: IGameCell): void {
		if (cell.value) {
			Notifications.showError("Cell already taken!");
			return;
		}

		cell.gameId = this._game._id;
		this._ws.send(JSON.stringify({
			data: cell,
			token: authentication.token
		}));
	}
}