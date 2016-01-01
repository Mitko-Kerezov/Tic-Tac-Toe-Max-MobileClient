/// <reference path=".d.ts" />

export module Constants {
    export let AuthenticationTokenKey = "auth_token_tictactoemax";
    export let UsernameKey = "username_tictactoemax";
    export module Server {
        export let Protocol = "http";
        export let Address = "192.168.0.100:1234";
        export let BaseUrl = `${Protocol}://${Address}`;
        export let LoginEndpoint = `${BaseUrl}/login`;
        export let RegisterEndpoint = `${BaseUrl}/register`;
    }
}