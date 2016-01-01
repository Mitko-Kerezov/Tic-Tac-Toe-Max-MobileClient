/// <reference path="../../.d.ts" />

import * as platformModule from "platform";
import {Observable} from "data/observable";
import {Visibility} from "ui/enums";
import {Notifications} from "../../utilities/notifications";
import {Strings} from "../../resources/strings";
import * as connectivity from "connectivity";

export class ViewModelBase extends Observable {
    private _loadingCount: number;
    private _isLoading: boolean;

    constructor() {
        super();

        this._loadingCount = 0;
    }

    public get isLoading(): boolean {
        return this._isLoading;
    }

    public set isLoading(value: boolean) {
        if (this._isLoading != value) {
            this._isLoading = value;
            this.notifyPropertyChange("isLoading", value);
        }
    }

    public get strings(): any {
        return Strings;
    }

    protected beginLoading(): boolean {
        if (connectivity.getConnectionType() === connectivity.connectionType.none){
            Notifications.showError("No internet connection.");
            return false;
        }

        if (!this._loadingCount) {
            this.isLoading = true;
        }

        this._loadingCount++;
        return true;
    }

    protected endLoading() {
        if (this._loadingCount > 0) {
            this._loadingCount--;
            if (!this._loadingCount) {
                this.isLoading = false;
            }
        }
    }
}
