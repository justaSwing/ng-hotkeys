import { AfterViewInit, ChangeDetectorRef, Component} from "@angular/core";
import { MediaMatcher } from "@angular/cdk/layout";
import { NgHotkeysHelpService, NgHotkeysSelectService } from "ng-hotkeys";

@Component({
    selector: "demo-app",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"]
})
export class AppComponent implements AfterViewInit {
    mobileQuery: MediaQueryList;

    private _mobileQueryListener: () => void;

    constructor(
        changeDetectorRef: ChangeDetectorRef,
        media: MediaMatcher,
        public help: NgHotkeysHelpService,
        private keyboardSelect: NgHotkeysSelectService
    ) {
        this.mobileQuery = media.matchMedia("(max-width: 600px)");
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addEventListener('change',this._mobileQueryListener);
        this.keyboardSelect.select('cmd + g').subscribe(e => console.log("using select to listen to shortcuts", {e}));
    }

    ngOnDestroy(): void {
        this.mobileQuery.removeEventListener('change',this._mobileQueryListener);
    }

    public showHelp = false;
    ngAfterViewInit(): void {}
}
