/// <reference path="../.d.ts" />

import * as dialogsModule from "ui/dialogs";

export module Notifications {
    export function showError(error: string): Promise<void> {
        return dialogsModule.alert({ title: "Oops", message: error, okButtonText: "Close" });
    }

    export function showInfo(message: string): Promise<void> {
        return dialogsModule.alert({ title: "Info", message: message, okButtonText: "OK" });
    }

    export function confirm(title: string, message: string): Promise<boolean> {
        return dialogsModule.confirm({
            title: title,
            message: message,
            okButtonText: "YES",
            cancelButtonText: "NO"
        });
    }
}