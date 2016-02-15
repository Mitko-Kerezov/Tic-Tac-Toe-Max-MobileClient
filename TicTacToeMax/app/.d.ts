/// <reference path="../node_modules/tns-core-modules/tns-core-modules.d.ts" /> Enable smart suggestions and completions in Visual Studio Code JavaScript projects.

interface IUser {
    username: string;
    wins: number;
    losses: number;
}

interface ISmallBoard {
    tiles: string[][];
    gameResult: string;
}
interface ICell {
    value: string;
    boardRow: number;
    boardCol: number;
    cellRow: number;
    cellCol: number;
}

interface IBoard {
	[id: number] : { [id: number] : ISmallBoard }
}

interface IGame {
	_id: string;
    board: IBoard;
    gameResult: string;
    currentPlayingBoardRow: number;
    currentPlayingBoardCol: number;
    currentPlayerSymbol: string;
	users: { [id: number] : IJoinableGame };
}

interface IGameReference {
	gameId?: string;
}

interface IGameCell extends IGameReference, IBoardCoordinates  {
	cellRow: number;
	cellCol: number;
	value: string;
}

interface IWebSocketResponse {
	usernames: string[],
	message: string,
	isError: boolean,
	board: IBoard,
	nextBoard: IBoardCoordinates,
	currentPlayerSymbol: string
}

interface IBoardCoordinates {
	boardRow: number;
	boardCol: number;
}

interface IJoinableGame {
	id: string;
	username: string;
}