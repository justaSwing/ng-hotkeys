import { Injectable } from "@angular/core";
import { NgHotkeysService } from './ng-hotkeys.service';
import { map } from "rxjs/operators";

/**
 * Service to assist showing custom help screen
 */
@Injectable({
    providedIn: "root"
})
export class NgHotkeysHelpService {
    /**
     * @ignore
     * @param {NgHotkeysService} keyboard
     */
    constructor(private keyboard: NgHotkeysService) {}

    /**
     * Observable to provide access to all registered shortcuts in the app.
     * @type {Observable<any>}
     */
    public shortcuts$ = this.keyboard.shortcuts$.pipe(
        map(shortcuts =>
            shortcuts
                .filter(shortcut => Boolean(shortcut.label) && Boolean(shortcut.description))
                .map(({ key, label, description }) => ({
                    key,
                    label,
                    description
                }))
        )
    );
}
