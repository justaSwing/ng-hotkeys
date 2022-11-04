# ng-hotkeys
<p>
      <a href="https://badge.fury.io/js/ng-hotkeys" alt="npm version" target="_blank">
        <img src="https://badge.fury.io/js/ng-hotkeys.svg" />
      </a>
      <a href="https://badge.fury.io/js/ng-hotkeys" alt="npm downloads per month" target="_blank">
        <img src="https://img.shields.io/npm/dw/ng-hotkeys" />
      </a>
      <a href="https://bundlephobia.com/result?p=ng-hotkeys" alt="Bundle size" target="_blank" >
        <img src="https://img.shields.io/bundlephobia/minzip/ng-hotkeys" />
      </a>
      <a href="https://gitter.im/ng-hotkeys/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge" alt="Join the chat at our community" target="_blank">
        <img src="https://badges.gitter.im/ng-hotkeys/community.svg" />
      </a>
       <a href="https://img.shields.io/npm/l/ng-hotkeys" target="_blank" alt="MIT License">
        <img src="https://img.shields.io/npm/l/ng-hotkeys" />
      </a>
</p>  
  
An Angular module that provides a declarative API using components/directive to manage Keyboard shortcuts in scalable way.  

See demo here:  
[demo](https://codesandbox.io/s/yvyovny43v)  

Compatible with Angular 14+  
  
  
* [Install](#install)  
* [Setup](#setup)  
* [Demo](https://codesandbox.io/s/yvyovny43v)
* [Usage](#usage)  
    * [Combinations](#combinations)
    * [Sequences](#sequences)
    * [Components](#components)  
        * [Keyboardshortcuts](#ng-hotkeys)  
        * [HelpScreen](#ng-hotkeys-help)  
    * [Directive](#directive)  
        * [NgHotkeysDirective](#NgHotkeysDirective)  
    * [Service](#service)  
        * [NgHotkeysHelpService](#NgHotkeysHelpService)
        * [NgHotkeysSelectService](#NgHotkeysSelectService)  
* [API](#api)  
    * [Types](#types)  
        * [AllowIn](#AllowIn)  
        * [Shortcut](#Shortcut)  
        * [ShortcutInput](#ShortcutInput)  
        * [ShortcutEventOutput](#ShortcutEventOutput)  
* [Building](#building)  
* [Publishing](#publishing)  
* [License](#License)  
  
  
# Install:  
##### NPM
###### Angular latest
```npm install --save ng-hotkeys```


##### Yarn
###### Angular latest
```yarn add ng-hotkeys```

# Setup:  
```typescript  
import { HotKeysModule }     from 'ng-hotkeys';  
  
@NgModule({  
    declarations: [  
    ],  
    imports: [  
        BrowserModule,  
        HotKeysModule.forRoot()  
    ],  
    bootstrap: [AppComponent]  
})  
export class AppModule {  
}  
```  
  
  
  
# Usage:  

## Combinations

key combinations are used with meta keys like control, shift, command, etc... and are defined using plus(+) sign as a separator.
there can be multiple combinations for the same command, so either of the key combination will trigger the callback.
Since combinations uses the plus sign as a seperator, if you want to bind to the actual + charachater,
you will need to use "plus" instead.

#### Examples:

```typescript
   [
       {
            key: ["cmd + a"],
            command: (output: ShortcutEventOutput) => console.log("command + a", output),
        },
        {
            key: "ctrl + a",
            preventDefault: true,
            command: (output: ShortcutEventOutput) => console.log("control + a", output),
            
        },
        {
            key: "ctrl + plus",
            preventDefault: true,
            command: (output: ShortcutEventOutput) => console.log("control + plus key", output),
        }
    ]
```

## Sequences

Sequences can be used to support gmail like actions where you click "g" then "a", or "g" then "o" to perform certain actions.

##### __Important note__
The library can get very confused if you have a single key handler that uses the same key that a sequence starts with. 
This is because it can't tell if you are starting the sequence or if you are pressing that key on its own.

To counter this, there is a __500ms__ delay(__only__ when single key is used in the beginning of another sequence, so it won't affect performance)
. This gives the library time to wait for a more complete sequence, otherwise the single sequence will be triggered.

for example: binding both "? a" and "?", then clicking "?" will trigger the "?" callback, but only after 500ms delay.
However, in all other cases there's no delay in execution of the callback (unless debounceTime is provided)


#### Examples:

This library supports gmail style sequences:
```typescript
   [{
        key: ["g a"],
        command: (output: ShortcutEventOutput) => console.log("? a", output),
    }]
```
konami code:
```typescript
    [{
         key: ["up up down down left right left right b a enter"],
         label: "Sequences",
         description: "Konami code!",
         command: (output: ShortcutEventOutput) => console.log("Konami code!!!", output),
    }]
```

Sequences can be used inside components or directives and are declared __without__ the plus(+) sign, for example:
``` key: ["a b c"] ```
will require clicking, a, then b, then c.

## Components:  
### ng-hotkeys  
Component that can be used across the app to bind to various shortcuts  
  
#### Inputs:  
| Name   |      Type      |  Default         | Description |  
|----------|:-------------:|-----------------:  |:-------------:|  
| shortcuts |  ```ShortcutInput``` / ```ShortcutInput[]``` | [] | List of shortcut inputs types see [types](#ShortcutInput) |  
| disabled |    `boolean`  |   `false`   | disable the shortcuts for the component |  
  
#### Methods:  
| Name  | Input | Return  | Description |  
|----------|:------|:------:|:-------------:|  
| select | `string` - key to listen to events (example: `'cmd + e'`) | `Observable<ShortcutEventOutput>` |Listen to specific key events (**will only work for registered keys**) |  
  
  
```typescript  
  
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from "@angular/core";  
import { ShortcutInput, ShortcutEventOutput, NgHotkeysComponent } from "ng-hotkeys";  
  
@Component({  
    selector: 'demo-component',  
    template: "<ng-hotkeys [shortcuts]="shortcuts"></ng-hotkeys>"  
})  
export class DemoComponent implements AfterViewInit {  
  
    shortcuts: ShortcutInput[] = [];  
    @ViewChild('input') input: ElementRef;  
  
    ngAfterViewInit(): void {  
        this.shortcuts.push(  
            {  
                key: "ctrl + t",  
                preventDefault: true,  
                allowIn: [AllowIn.Textarea, AllowIn.Input],  
                command: e => console.log("clicked " , e.key)  
            },
           {
                key: ["? a"],
                label: "Sequences",
                description: "Sequence ? and a",
                command: (output: ShortcutEventOutput) => console.log("? a", output),
                preventDefault: true
            },            
            {
                key: ["up up down down left right left right b a enter"],
                label: "Sequences",
                description: "Konami code!",
                command: (output: ShortcutEventOutput) => console.log("Konami code!!!", output),
            },
            {  
                key: "cmd + shift + f",  
                command: (output: ShortcutEventOutput) => console.log(output),  
                preventDefault: true,  
                throttleTime: 250,  
                target: this.input.nativeElement  
            },  
            {  
                key: ["cmd + =", "cmd + z"],  
                command: (output: ShortcutEventOutput) => console.log(output),  
                preventDefault: true  
            },  
            {  
                key: "cmd + f",  
                command: (output: ShortcutEventOutput) => console.log(output),  
                preventDefault: true  
            }  
        );  
  
        this.keyboard.select("cmd + f").subscribe(e => console.log(e));  
    }  
  
    @ViewChild(NgHotkeysComponent) private keyboard: NgHotkeysComponent;  
  
}  
```  
### ng-hotkeys-help  
1. **Make sure to install `@angular/animations` ( `npm install --save @angular/animations` or `yarn add @angular/animations`**  
2. **Add BrowserAnimationsModule to your app.module imports**  
  
Can be used to show an help screen ( will be attached to body and be shown as a modal)  
  
Should be placed in the root of your app, preferably in app.component.html  
  
 #### Inputs  
| Name   |      Type      |  default         | description |  
|----------|:-------------:|-----------------:  |:-------------:|  
| key |  ```string``` | none | The key to show/hide the help modal
| keyDescription |  ```string``` | none | Description to show in the menu shortcut list for the toggle shortcut
| keyLabel |  ```string``` | none | Label that can be used to group shortcuts together in the help menu
| closeKey |  ```string``` | none | Close key to be used to close the modal
| closeKeyDescription |  ```string``` | none | Description to show in the menu shortcut list for closing the modal shortcut
| closeKeyLabel |  ```string``` | none | Label that can be used to group shortcuts together in the help menu
| title |  ```string``` | "Keyboard shortcuts" | The title of the help screen
| emptyMessage |  ```string``` | "No shortcuts available" | What message to show when no commands are registered when help modal is opened.
| disableScrolling |  ```boolean``` | true | Whether to disable body scrolling when modal help screen is opened.
  
 #### Methods:  
| Name  | Input | Return  | Description |  
|----------|:------|:------:|:-------------:|  
| hide | void| ```NgHotkeysHelpComponent``` | Programmatically hide the modal |   
| reveal | void| ```NgHotkeysHelpComponent``` | Programmatically hide the modal |
| visible | void| ```boolean``` | Check whether the modal is visible or not. |
| toggle | void| ```NgHotkeysHelpComponent``` | Programmatically toggle the modal visibility |

#### Methods:  
| Name  | Input | Return  | Description |  
|----------|:------|:------:|:-------------:|  
| select | `string` - key to listen to events (example: `'cmd + e'`) | `Observable<ShortcutEventOutput>` |Listen to specific key events (**will only work for registered keys**) |  
  
`app.component.ts`  
```typescript  
import { Component } from "@angular/core";  
  
@Component({  
  selector: "app-root",  
  template: "./app.component.html",  
  styleUrls: ["./app.component.css"]  
})  
export class AppComponent {  
  title = "Hello";  
}  
  
```  
`app.component.html`  
```html  
<div style="text-align:center">  
   <h1>  
      Welcome to {{ title }}!  
   </h1>  
   <ng-hotkeys-help [key]="'f1'" [closeKey]="'escape'" [title]="'Help'"></ng-hotkeys-help>  
</div>  
  
```  
  
## Directive  
### NgHotkeysDirective 
Directive can only be used for focusable elements, such as textarea, select, input, etc...  
##### Important: 
The shortcut then will only be active while the element is in __focus__.
  

#### Inputs  
| Name   |      Type      |  default         | description |  
|----------|:-------------:|-----------------:  |:-------------:|  
| ngHotKeys |  ```Shortcut``` / ```Shortcut``` | [] | List of shortcuts see [types](#shortcut) |  
| disabled |    `boolean`  |   `false`   | disable the shortcuts for the directive |  
| disableScrolling | `boolean` | `true` | disable body scrolling while modal is open |  
  
#### Example 
  
```typescript  
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from "@angular/core";  
import { ShortcutInput, ShortcutEventOutput, NgHotkeysComponent } from "ng-hotkeys";  
  
@Component({  
    selector: 'demo-component',  
    template: "<input [ngHotKeys]="shortcuts" />"  
})  
export class DemoComponent implements AfterViewInit {  
  
    shortcuts: ShortcutInput[] = [];  
    @ViewChild('input') input: ElementRef;  
  
    ngAfterViewInit(): void {  
        this.shortcuts.push({  
            key: "cmd + e",  
            label: "test",  
            description: "hello world",  
            command: () => console.log('directive cmd + e'),  
            preventDefault: true  
        });  
  
        this.keyboard.select("cmd + f").subscribe(e => console.log(e));  
    }  
  
    @ViewChild(NgHotkeysComponent) private keyboard: NgHotkeysComponent;  
  
}  
```  
# Service  
## NgHotkeysHelpService  
  
Singleton service that can be used to render a custom help screen. (used to build the [Built in help component](#ng-hotkeys-help))  
Provides access to all registered shortcuts in the app using Observable that updates on shortcuts changes.  
Since shortcuts can be added or removed during the lifecycle of the app, an observable data structure needed to be used.  
  
| properties   |  type   | description |  
|----------|:---------:|:-------------:|  
| shortcuts$ | ```Observable<{ key: string, label: string, description: string }[]>```| Array of registered shortcuts across the whole app |  
 
 
## NgHotkeysSelectService

A singleton service that can be used globally to listen to any registered shortcut:
| Name  | Input | Return  | Description |  
|----------|:------|:------:|:-------------:|  
| select | `string` - key to listen to events (example: `'cmd + e'`) | `Observable<ShortcutEventOutput>` |Listen to specific key events (**will only work for registered keys**) |
 
 
# API:  
  
## Types:  
  
### AllowIn  
```typescript  
export enum AllowIn {  
    Textarea = 'TEXTAREA',  
    Input = 'INPUT',  
    Select = "SELECT"  
}  
```  
### Shortcut  
Used for Directive input  
```typescript  
export interface Shortcut {  
  
    key: string | string[];  
  
    /**  
     * callback to be called when shortcut is pressed.  
     * @param event - the event out  
     */  
    command(event: ShortcutEventOutput): any;  
  
    /**  
     * Description for the command can be used for rendering help menu.  
     */  
    description?: string;  
  
    /**  
     * How much time to throttle in ms.  
     */  
    throttleTime?: number;  
  
    /**  
     * Label, can be used for grouping commands.  
     */  
    label?: string;  
  
    /**  
     * Prevent browser default, default: false  
     */  
    preventDefault?: boolean;  
}  
```  
  
### ShortcutInput  
Used for the component as input.  
```typescript  
export interface ShortcutInput extends Shortcut {  
    /**  
     * textarea, select and input are ignored by default, this is used to override  
     * this behavior.  
     * allow in node names, accepts: ["TEXTAREA", "SELECT", "INPUT]  
     */  
    allowIn?: AllowIn[];  
    /**  
     * Only trigger the command when the target is in focus.  
     */  
    target?: HTMLElement;  
}  
```  
  
### ShortcutEventOutput  
  
```typescript  
type = ShortcutEventOutput {  
    event: KeyboardEvent;  
    key: string | string[];  
}  
  
```  
  
  
# Building  
  
```npm run build-lib```  
  
# Publishing  
1. ```npm run build-lib```  
2. ```npm publish dist/ng-hotkeys```  
  
# License  
  
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
