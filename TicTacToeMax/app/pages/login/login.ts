/// <reference path="../../.d.ts" />

import {EventData} from "data/observable";

import {Page} from "ui/page";

import {LoginViewModel} from "./login-view-model";

let viewModel : LoginViewModel;
export function navigatingTo(args: EventData): void {
    let page = <Page>args.object;
    viewModel = new LoginViewModel();
    page.bindingContext = viewModel;
}

export function loginButtonTap(args : EventData): void {
    viewModel.login();
}

export function signUpButtonTap(args : EventData): void {
    viewModel.signUp();
}