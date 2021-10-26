import {
    ComponentFactory,
    ComponentFactoryResolver, ComponentRef,
    Directive,
    ElementRef, EmbeddedViewRef,
    Input,
    OnChanges,
    SimpleChanges,
    ViewContainerRef
} from '@angular/core';
import {TestInputComponent} from '../test-input/test-input.component';

@Directive({
    selector: '[appInput]',
    exportAs: 'appInput'
})
export class InputDirective implements OnChanges{

    @Input() showInput = true;
    private _disposeFn: () => void;
    @Input() data: any;

    private _componentRef: ComponentRef<TestInputComponent>;
    constructor(
        public elementRef: ElementRef,
        private viewContainerRef: ViewContainerRef,
        private componentFactoryResolver: ComponentFactoryResolver
    ) {
    }

    ngOnChanges(changes: SimpleChanges) {
        if(changes.showInput){
            this.showInput ? this.attach() : this.detach();
        }
        if(changes.data){
            this.updateCfg();
        }
    }

    attach(){
        if(!this._componentRef){
            const factory = this.componentFactoryResolver.resolveComponentFactory(TestInputComponent)
            this._componentRef = this.viewContainerRef.createComponent(
                factory,
                this.viewContainerRef.length,
                this.viewContainerRef.injector
            );
            this._componentRef.instance.changeValue.subscribe((v) => {
                console.log('value :>> ', v);
            })
        } else {

            this._componentRef.hostView.reattach();
            this._componentRef.hostView.detectChanges();
        }

        console.log(' :>> ', this._componentRef.hostView.destroyed);

        this.setDisposeFn(() => {
            // TODO 如何缓存
            // this._componentRef.destroy();
            console.log('123 :>> ', 2222222222);
            this._componentRef.hostView.detach();
            // this._componentRef.instance
            this._componentRef.changeDetectorRef.detach();
            console.log('this._componentRef :>> ', this._componentRef);
        });
        console.log('this.elementRef.nativeElement :>> ', this.elementRef.nativeElement);
        (this.elementRef.nativeElement as HTMLElement).appendChild(this._getComponentRootNode(this._componentRef));

    }

    detach(){
        if (this._disposeFn) {
            this._disposeFn();
            this._disposeFn = null;
        }
    }

    updateCfg(){
        if(this._componentRef){
            this._componentRef.instance.v = this.data;
            console.log('this._componentRef.instance :>> ', this._componentRef.instance);
            this._componentRef.instance.changeDetectorRef.detectChanges()
        }
    }

    private setDisposeFn(fn: () => void) {
        this._disposeFn = fn;
    }

    private _getComponentRootNode(componentRef: ComponentRef<any>): HTMLElement {
        return (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    }

}
