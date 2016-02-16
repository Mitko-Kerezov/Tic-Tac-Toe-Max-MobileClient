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
	private _opponentName: string = null;
	private _currentPlayerSymbol: string = null;
	private _playerSymbol: string = null;
	private _opponentSymbol: string = null;
	private _playingBoard: IBoardCoordinates = null;

	constructor(game: IGame, playerSymbol, opponentName?: string) {
		super();

		let that = this;
		this._game = game;
		this._board = [];
		this._playingBoard = {
			boardCol: Constants.Game.PlayAnyWhere,
			boardRow: Constants.Game.PlayAnyWhere
		};
		this._playerSymbol = playerSymbol;
		this._opponentSymbol = playerSymbol === Constants.Game.Symbols.X ? Constants.Game.Symbols.O : Constants.Game.Symbols.X;
		this._ws = new WebSocket(Constants.Server.WebSocketUrl);
		this._opponentName = opponentName || "No opponent yet";
		this._currentPlayerSymbol = ` ${this._game.currentPlayerSymbol}'s move`;
		this._ws.addEventListener('message', function(evt: MessageEvent) {
			console.log("We got a message: ", JSON.stringify(evt.data, null, 2));
			let response: IWebSocketResponse = JSON.parse(evt.data);
			if (~response.usernames.indexOf(authentication.username)) {
				if (response.isError) {
					Notifications.showError(response.message);
				} else {
					if (response.message === Constants.Responses.MoveMade) {
						that._game.board = response.board;
						that._board = [];
						that._currentPlayerSymbol = ` ${response.currentPlayerSymbol}'s move`;
						that._playingBoard = response.nextBoard;
						that.notifyPropertyChange("board", that.board);
						that.notifyPropertyChange("currentPlayerSymbol", that.currentPlayerSymbol);
						that.notifyPropertyChange("playingBoard", that.playingBoard);
					} else {
						if(endsWith(response.message, Constants.Responses.JoinGameSuffix)) {
							let opponentName = response.message.match(Constants.Responses.OpponentNameRegex)[1];
							that._opponentName = opponentName;
							that.notifyPropertyChange("opponent", that.opponent);
						}
						Notifications.showInfo(response.message);
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

	public get username(): string {
		return authentication.username;
	}

	public get opponent(): string {
		return this._opponentName;
	}

	public get playerSymbol(): string {
		return this._playerSymbol;
	}

	public get opponentSymbol(): string {
		return this._opponentSymbol;
	}

	public get playingBoard(): IBoardCoordinates {
		return this._playingBoard;
	}

	public get currentPlayerSymbol(): string {
		return this._currentPlayerSymbol;
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

function endsWith(str: string, suffix: string): boolean {
	return !!~str.indexOf(suffix, str.length - suffix.length);
}
