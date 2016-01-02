/// <reference path="../../.d.ts" />

import {EventData} from "data/observable";
import {Page} from "ui/page";
import {HomeViewModel} from "./home-view-model";

let viewModel = new HomeViewModel();
export function navigatingTo(args: EventData) {
    let page = <Page>args.object;
    page.bindingContext = viewModel;
}

export function logoutButtonTap() {
    viewModel.logout();
}

export function newGameButtonTap(args : EventData): void {
    viewModel.newGame();
}

export function joinGameButtonTap(args : EventData): void {
    viewModel.joinGame();
}