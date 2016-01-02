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
    [id: number] : { [id: number] : ISmallBoard };
}

interface IGame {
    board: IBoard;
    gameResult: string;
    currentPlayingBoardRow: number;
    currentPlayingBoardCol: number;
    currentPlayerSymbol: string;
}