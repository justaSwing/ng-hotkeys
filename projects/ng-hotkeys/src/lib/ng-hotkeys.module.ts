import { ModuleWithProviders, NgModule } from "@angular/core";
import { NgHotkeysComponent } from './ng-hotkeys.component';
import { NgHotkeysService} from './ng-hotkeys.service';
import { NgHotkeysHelpService } from './ng-hotkeys-help.service';
import { NgHotkeysSelectService } from "./ng-hotkeys-select.service";
import { NgHotkeysDirective } from './ng-hotkeys.directive';
import { NgHotkeysHelpComponent } from "./ng-hotkeys-help.component";
import { NgHotkeysHelpItemComponent } from './ng-hotkeys-help-item.component';
import { CommonModule } from "@angular/common";

@NgModule({
    imports: [CommonModule],
    declarations: [
        NgHotkeysComponent,
        NgHotkeysDirective,
        NgHotkeysHelpItemComponent,
        NgHotkeysHelpComponent
    ],
    exports: [
        NgHotkeysComponent,
        NgHotkeysDirective,
        NgHotkeysHelpComponent
    ]
})
export class HotKeysModule {
    public static forRoot(): ModuleWithProviders<HotKeysModule> {
        return {
            ngModule: HotKeysModule,
            providers: [
                NgHotkeysService,
                NgHotkeysHelpService,
                NgHotkeysSelectService
            ]
        };
    }
}
