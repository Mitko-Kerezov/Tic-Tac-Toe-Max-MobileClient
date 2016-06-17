/// <reference path=".d.ts" />

export module Constants {
	export let AuthenticationTokenKey = "auth_token_tictactoemax";
	export let UsernameKey = "username_tictactoemax";
	export module Server {
		export let Protocol = "http";
		export let Address = "192.168.0.101:1234";
		export let BaseUrl = `${Protocol}://${Address}`;
		export let WebSocketUrl = `ws://${Address}`;
		export let LoginEndpoint = `${BaseUrl}/login`;
		export let RegisterEndpoint = `${BaseUrl}/register`;
		export let CreateGameEndpoint = `${BaseUrl}/create`;
		export let JoinGameEndpoint = `${BaseUrl}/join`;
		export let StatusEndpoint = `${BaseUrl}/status`;
	}

	export module Responses {
		export let MoveMade = "Move made";
		export let JoinGameSuffix = " joined the game";
		export let OpponentNameRegex = new RegExp(`(.*)${JoinGameSuffix}`);
	}

	export module Game {
		export module Symbols {
			export let X = "X";
			export let O = "O";
		}

		export module BoardStatuses {
			export let Draw = "Draw";
			export let StillPlaying = "Still playing";
			export let WonByO = "Won by O";
			export let WonByX = "Won by X";
		}

		export let PlayAnyWhere = 3;
	}

	export module GameEndings {
		export let Winner = "WINNER";
		export let Loser = "LOSER";
		export let Draw = "DRAW";
	}
}