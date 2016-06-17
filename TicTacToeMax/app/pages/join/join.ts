/// <reference path="../../.d.ts" />

import {EventData} from "data/observable";
import {Page} from "ui/page";
import {JoinViewModel} from "./join-view-model";

let viewModel: JoinViewModel;
export function navigatingTo(args: EventData) {
    let page = <Page>args.object;
    viewModel = <JoinViewModel>page.navigationContext;
    page.bindingContext = viewModel;
}

export function joinButtonTap(args : any): void {
    viewModel.joinGame(args.object._propertyEntries["45"]._effectiveValue);
}