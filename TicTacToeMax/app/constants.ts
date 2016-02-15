/// <reference path=".d.ts" />

export module Constants {
    export let AuthenticationTokenKey = "auth_token_tictactoemax";
    export let UsernameKey = "username_tictactoemax";
    export module Server {
        export let Protocol = "http";
        export let Address = "192.168.56.1:1234";
        export let BaseUrl = `${Protocol}://${Address}`;
        export let WebSocketUrl = `ws://${Address}`;
        export let LoginEndpoint = `${BaseUrl}/login`;
        export let RegisterEndpoint = `${BaseUrl}/register`;
        export let CreateGameEndpoint = `${BaseUrl}/create`;
        export let JoinGameEndpoint = `${BaseUrl}/join`;
    }

	export module Responses {
		export let MoveMade = "Move made";
		export let JoinGameSuffix = " joined the game";
		export let OpponentNameRegex = new RegExp(`(.*)${JoinGameSuffix}`);
	}

	export module GameSymbols {
		export let X = "X";
		export let O = "O";
	}
}