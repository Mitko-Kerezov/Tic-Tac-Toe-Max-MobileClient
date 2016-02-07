/// <reference path="../../.d.ts" />

import {EventData} from "data/observable";
import {Page} from "ui/page";
import {PlayViewModel} from "./play-view-model";
import {GridLayout} from "ui/layouts/grid-layout";
import {Button} from "ui/button";

let viewModel: PlayViewModel;
export function navigatingTo(args: EventData) {
    let page = <Page>args.object;
    viewModel = <PlayViewModel>page.navigationContext;
    page.bindingContext = viewModel;
}

export function makeMove(args: any) {
	viewModel.makeMove(args.object._propertyEntries["0"]._effectiveValue);
}
