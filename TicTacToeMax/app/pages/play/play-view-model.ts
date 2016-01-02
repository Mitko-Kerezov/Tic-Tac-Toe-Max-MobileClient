/// <reference path="../../.d.ts" />

import {ViewModelBase} from "../common/view-model-base";

export class PlayViewModel extends ViewModelBase {
    private _game: IGame = null;
    private _board: any = null;

    constructor(game: IGame) {
        super();

        this._game = game;
        this._board = null;//Object.keys(this._game.board).map(outerKey => Object.keys(this._game.board[outerKey]).map(innerKey => this._game.board[outerKey][innerKey].tiles));
    }

    public get board(): IBoard {
        if (!this._board) {
            this._board = Object.keys(this._game.board).map(outerKey => {
                return {
                    value: Object.keys(this._game.board[outerKey]).map(innerKey => this._game.board[outerKey][innerKey].tiles),
                };
            });
        }

        console.log('this._board', JSON.stringify(this._board, null, 2))
        return this._board;
    }

    public set board(value: IBoard) {
        if (this._game.board !== value) {
            this._game.board = value;
            this.notifyPropertyChange("board", value);
        }
    }

    public get A(): string {
        return 'A';
    }
}