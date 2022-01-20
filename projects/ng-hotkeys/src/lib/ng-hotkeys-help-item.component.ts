import { Component, Input, OnInit } from "@angular/core";
import { Shortcut } from "./ng-hotkeys.interfaces";
import { symbols } from "./keys";
import { identity } from './utils';

/**
 * @ignore
 */
@Component({
    selector: "ng-hot-keys-help-item",
    templateUrl: "./ng-hotkeys-help-item.component.html",
    styleUrls: ["./ng-hotkeys-help-item.component.css"]
})
export class NgHotkeysHelpItemComponent implements OnInit {
    public parsedKeys: string[][];

    @Input() index: number;

    @Input()
    set shortcut(shortcut: Shortcut) {
        const key = Array.isArray(shortcut.key) ? shortcut.key : [shortcut.key];
        this.parsedKeys = key.map(key =>
            key
                .split(" ")
                .filter(identity)
                .filter(key => key !== "+")
                .map(key => {
                    if (symbols[key]) {
                        return symbols[key];
                    }
                    return key;
                })
        );
        this._shortcut = shortcut;
    }
    get shortcut() {
        return this._shortcut;
    }

    private _shortcut: Shortcut;

    constructor() {}

    ngOnInit() {}
}
