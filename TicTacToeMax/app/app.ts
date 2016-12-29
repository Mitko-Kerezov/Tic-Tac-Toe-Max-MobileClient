/// <reference path=".d.ts" />

import * as application from "application";
import { Views } from "./utilities/views";
import { authentication } from "./config/auth";

if (application.ios) {
    console.log("HERE?")
    class MyDelegate extends UIResponder implements UIApplicationDelegate {
        public static ObjCProtocols = [UIApplicationDelegate];

        applicationDidFinishLaunchingWithOptions(application: UIApplication, launchOptions: NSDictionary): boolean {
            return FBSDKApplicationDelegate.sharedInstance().applicationDidFinishLaunchingWithOptions(application, launchOptions);
        }

        applicationOpenURLSourceApplicationAnnotation(application, url, sourceApplication, annotation) {
            return FBSDKApplicationDelegate.sharedInstance().applicationOpenURLSourceApplicationAnnotation(application, url, sourceApplication, annotation);
        }

        applicationDidBecomeActive(application: UIApplication): void {
            FBSDKAppEvents.activateApp();
        }
    }

    application.ios.delegate = MyDelegate;
}

if (authentication.isAuthenticated) {
    application.mainModule = Views.home;
} else {
    application.mainModule = Views.login;
}

application.start();
