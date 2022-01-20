/*
 * Public API Surface of ng-hotkeys
 */

export { HotKeysModule } from "./lib/ng-hotkeys.module";
import "./lib/polyfills";
export {
    ShortcutInput,
    ShortcutEventOutput,
    AllowIn,
    Shortcut as ShortcutDirectiveInput
} from "./lib/ng-hotkeys.interfaces";
export { NgHotkeysHelpService } from "./lib/ng-hotkeys-help.service";
export { NgHotkeysSelectService } from "./lib/ng-hotkeys-select.service";
export { NgHotkeysComponent } from "./lib/ng-hotkeys.component";
export { NgHotkeysDirective } from "./lib/ng-hotkeys.directive";
export { NgHotkeysHelpComponent } from "./lib/ng-hotkeys-help.component";
