/// <reference path="../../.d.ts" />

import {EventData} from "data/observable";
import {Page} from "ui/page";
import {SignUpViewModel} from "./sign-up-view-model";

var viewModel: SignUpViewModel;
export function navigatingTo(args: EventData) {
    var page = <Page>args.object;
    viewModel = new SignUpViewModel();
    page.bindingContext = viewModel;
}

export function signUpButtonTap(args) {
    viewModel.signUp();
}

export function loginButtonTap(args) {
    viewModel.login();
}
