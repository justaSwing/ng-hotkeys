import {
    AfterViewInit,
    Component,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    SimpleChanges
} from "@angular/core";
import { NgHotkeysService } from './ng-hotkeys.service';
import { ShortcutInput, ShortcutEventOutput } from "./ng-hotkeys.interfaces";
import { Observable } from "rxjs";

/**
 * A component to bind global shortcuts, can be used multiple times across the app
 * will remove registered shortcuts when element is removed from DOM.
 */
@Component({
    selector: "ng-hot-keys",
    template: ""
})
export class NgHotkeysComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
    /**
     * A list of shortcuts.
     */
    @Input() shortcuts: ShortcutInput[] | ShortcutInput = [];

    /**
     * @ignore
     * list of registered keyboard shortcuts
     * used for clean up on NgDestroy.
     */
    private clearIds: string[] = [];

    /**
     * @ignore
     */
    private _disabled = false;
    /**
     * Disable all shortcuts for this component.
     */
    @Input() set disabled(value) {
        this._disabled = value;
        if (this.clearIds) {
            this.keyboard.remove(this.clearIds);
            this.clearIds = [];
        }
        if (value) {
            return;
        }
        this.clearIds = this.keyboard.add(this.shortcuts);
    }

    /**
     * @ignore
     * @param {NgHotkeysService} keyboard
     */
    constructor(private keyboard: NgHotkeysService) {}

    /**
     * @ignore
     */
    ngOnInit() {}

    /**
     * Select a key to listen to, will emit when the selected key is pressed.
     */
    public select(key: string): Observable<ShortcutEventOutput> {
        return this.keyboard.select(key);
    }

    /**
     * @ignore
     */
    ngAfterViewInit(): void {}

    /**
     * @ignore
     */
    ngOnChanges(changes: SimpleChanges): void {
        if (!changes.shortcuts || !changes.shortcuts.currentValue) {
            return;
        }
        if (this.clearIds) {
            this.keyboard.remove(this.clearIds);
        }
        if (!this._disabled) {
            setTimeout(() => (this.clearIds = this.keyboard.add(changes.shortcuts.currentValue)));
        }
    }

    /**
     * @ignore
     */
    ngOnDestroy(): void {
        this.keyboard.remove(this.clearIds);
    }
}
