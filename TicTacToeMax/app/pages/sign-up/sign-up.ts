/// <reference path="../../.d.ts" />

import {EventData} from "data/observable";
import {Page} from "ui/page";
import {SignUpViewModel} from "./sign-up-view-model";

let viewModel: SignUpViewModel;
export function navigatingTo(args: EventData) {
    let page = <Page>args.object;
    viewModel = new SignUpViewModel();
    page.bindingContext = viewModel;
}

export function signUpButtonTap(args) {
    viewModel.signUp();
}

export function loginButtonTap(args) {
    viewModel.login();
}
