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

//     let gridLayout = new GridLayout();
//     var btn1 = new Button();
// var btn2 = new Button();
// var btn3 = new Button();
// var btn4 = new Button();
// gridLayout.addChild(btn1);
// gridLayout.addChild(btn2);
// gridLayout.addChild(btn3);
// gridLayout.addChild(btn4);
}

export class GameBoard extends GridLayout {
    constructor(a: string) {
        super()

        let counter: number = 0;
        let btn = new Button();
        btn.text = a;
        this.addChild(btn);
    }
}

export function makeMove(args: any) {
    console.log('MAKE MOVE');
    console.log(args);
}



// import observable = require("data/observable");
// import observableArray = require("data/observable-array");
// import pages = require("ui/page");
// // import gridView = require("nativescript-grid-view");

// var viewModel: observable.Observable;

// export function navigatingTo(args: observable.EventData) {
//     console.log(items);
//     var page = <pages.Page>args.object;
//     var items = new observableArray.ObservableArray();

//     for (var loop = 0; loop < 200; loop++)
//     {
//         items.push({ value: "test " + loop.toString() });
//     }
//     viewModel = new observable.Observable();
//     viewModel.set("items", items);
//     page.bindingContext = viewModel;
// }

// export function gridViewItemTap(args: any) {
//     console.log("tap index " + args.index.toString());
// }

// export function gridViewItemLoading(args: any) {
//     console.log("item loading " + args.index.toString())
// }

// export function gridViewLoadMoreItems(args: observable.EventData) {
//     console.log("load more items");
// }