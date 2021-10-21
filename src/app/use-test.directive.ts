import {Directive, EmbeddedViewRef, Inject, Input, OnChanges, SimpleChanges, TemplateRef, ViewContainerRef} from '@angular/core';
import {TestDirective} from './test.directive';
import {DOCUMENT} from '@angular/common';

@Directive({
    selector: '[appUseTest]'
})
export class UseTestDirective implements OnChanges{

    @Input('appTestOrigin') appTestOrigin: TestDirective;

    @Input('isOpen') isOpen = false

    private _templatePortal: TemplateRef<any>;

    private _instance: EmbeddedViewRef<any>;

    constructor(
        templateRef: TemplateRef<any>,
        private _viewContainerRef: ViewContainerRef,
        @Inject(DOCUMENT) private _document: Document,
    ) {
        this._templatePortal = templateRef;
    }

    ngOnChanges(changes: SimpleChanges) {
        if(changes['isOpen']){
            if(this.isOpen){
                // if(!this._instance){
                    let _instance = this._viewContainerRef.createEmbeddedView(this._templatePortal);
                    let divHtmlElement = this._document.createElement('div');
                    divHtmlElement.classList.add('test-class');
                    this._document.body.appendChild(divHtmlElement);
                    // TODO
                    // 元素被放入其他地方则不会再次放入_viewContainerRef中
                    _instance.rootNodes.forEach(i => divHtmlElement.appendChild(i))
                    console.log(' :>> ',_instance, );
                // } else {
                // }
            } else {

            }
        }
    }

}
