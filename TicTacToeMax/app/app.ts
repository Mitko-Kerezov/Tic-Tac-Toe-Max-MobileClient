/// <reference path=".d.ts" />

import * as application from "application";
import {Views} from "./utilities/views";

application.mainModule = Views.login;
application.cssFile = "./app.css";
application.start();
