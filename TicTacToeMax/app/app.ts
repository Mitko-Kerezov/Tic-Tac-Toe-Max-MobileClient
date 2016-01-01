/// <reference path=".d.ts" />

import * as application from "application";
import {Views} from "./utilities/views";
import {authentication} from "./config/auth";

if (authentication.isAuthenticated) {
    application.mainModule = Views.home;
} else {
    application.mainModule = Views.login;
}

application.start();
