import {ITable} from './table.conponent.interface';

export class TreeData {

    static convertTreeToList(root: any, dataId: string, childrenProp = 'children'): any[] {
        const stack: any[] = [];
        const array: any[] = [];
        const hashMap = {};
        this.setProp(root, 0, true);
        stack.push(root);
        while (stack.length !== 0) {
            const node = stack.pop()!;
            this.visitNode(node, hashMap, array, dataId);
            if (node[childrenProp]) {
                for (let i = node[childrenProp].length - 1; i >= 0; i--) {
                    this.setProp(node[childrenProp][i], node.__level__! + 1, true, node);
                    stack.push(node[childrenProp][i]);
                }
            }
        }
        return array;
    }

    static setProp(obj: any, level: number, expand: boolean, node?: any) {
        Reflect.defineProperty(obj, '__level__', {
            value: level,
            configurable: true
        });
        Reflect.defineProperty(obj, '__expand__', {
            value: expand,
            configurable: true,
            writable: true
        });
        if(node){
            Reflect.defineProperty(obj, '__parent__', {
                value: node,
                configurable: true,
            });
        }
    }

    static visitNode(node: any, hashMap: { [key: string]: boolean }, array: any[], dataId: string): void {
        if (!hashMap[node[dataId]]) {
            hashMap[node[dataId]] = true;
            array.push(node);
        }
    }

    static treeToList(data: any[]) {
        let res = [];
        data.forEach((item, index) => {
            let arr = this.getChildren(item);
            res.push(...arr);
        });
    }

    static getChildren(data: any[], childrenProp = 'children', size = {index: 0}): any[] {
        if (!Array.isArray(data)) {
            return;
        }
        let res = [];
        data.forEach((item, ind) => {
            Reflect.defineProperty(item, '__y__', {
                value: size.index
            })
            let arr = [item];
            size.index++;
            if (item[childrenProp]) {
                arr.push(...this.getChildren(item[childrenProp], childrenProp, size));
            }
            res.push(...arr);
        });
        return res;
    }

    static toTreeMap(data: any[], idProp: string, childrenProp: string){
        let map = {};
        data?.forEach(item => {
            map[item[idProp]] = TreeData.convertTreeToList(item, idProp, childrenProp);
        });
        return map
    }


    static setDefineProp(o: any, p: PropertyKey, attributes: any) {
        let pDescriptor = Object.getOwnPropertyDescriptor(o, p);
        let attr: PropertyDescriptor = attributes;
        if(Object.prototype.toString.call(attributes) !== '[object Object]'){
            attr = {
                value: attributes,
                writable: true
            }
        }
        if (!pDescriptor) {
            Object.defineProperty(o, p, attr);
        } else if (pDescriptor.writable) {
            o[p] = attr.value;
        }
    }

    static setColSpan(data: ITable[]): [ITable[][], ITable[], number] {
        let manyCfg:ITable[][] = [];
        let inpCfg:ITable[] = [];
        let maxDeep = 0;
        if(Array.isArray(data) && data.length) {
            let deepArr = [];
            let setColSpan = (d, deep = 0, parent = null) => {
                if (Array.isArray(d)) {
                    deep++;
                    deepArr.push(deep);
                    manyCfg[deep - 1] = manyCfg[deep - 1] || [];
                    const childLen = d.reduce((a, b) => {
                        this.setDefaultProp(b);
                        this.setDefineProp(b, '__parent__', {value: parent, writable: true});
                        if(b.show){
                            manyCfg[deep - 1].push(b);
                            if (b.serialNum || !b.children?.length) {
                                inpCfg.push(b);
                            }
                            let l = setColSpan(b.children, deep, b);
                            this.setDefineProp(b, '__colSpan__', l);
                            this.setDefineProp(b, '__deep__', deep);
                            return a + l;
                        }
                        return a
                    }, 0);
                    if(childLen > 0){
                        deepArr.push(deep);
                        return childLen
                    }
                    return 1
                }
                return 1;
            };
            setColSpan(data);
            maxDeep = (deepArr.length ? Math.max(...deepArr) : 1) + 1;
        }
        return [manyCfg, inpCfg, maxDeep]
    }

    static setRowSpan(data, maxDeep){
        if(Array.isArray(data) && data.length){
            let childDeepArr = [];
            data.forEach(o => {
                if(o.show){
                    let childD = this.setRowSpan(o.children, maxDeep);
                    childDeepArr.push(childD);
                    this.setDefineProp(o, '__rowSpan__', childD ? 1 : maxDeep - o.__deep__ - childD);
                }
            })
            return childDeepArr.length ? Math.max(...childDeepArr) + 1 : 0;
        }
        return 0
    }

    static judgeTheadRight(data, isRight = true){
        if(Array.isArray(data) && data.length){
            const len = data.length - 1;
            let hasRight = false;
            for (let i = len; i >= 0; i--) {
                let o = data[i]
                let currRight = false;
                if(!hasRight && isRight && o.show){
                    hasRight = true;
                    currRight = true;
                }
                this.judgeTheadRight(o.children, currRight);
                this.setDefineProp(o, '__isRight__',  currRight);
            }
        }
    }

    static setDefaultProp(item: ITable){

        if(!Reflect.has(item, 'show')){
            item.show = true;
        }

        if(!Reflect.has(item, '__guid__')){
            this.setDefineProp(item, '__guid__', {
                value: `${this.s4()}_${this.s4()}`
            })
        }

    }

    static s4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }


}

export class TreeTools {

    static getTreeData<T>(id: string, data: T[], idProp: string = 'typeid', childrenProp: string = 'children'): T {
        if (Array.isArray(data)) {
            for (const item of data) {
                if (item[idProp] == id) {
                    return item;
                }
                let res = this.getTreeData<T>(id, item[childrenProp], idProp, childrenProp);
                if (res) {
                    return res;
                }
            }
        }
    }

    static findParentTree<T, D>(id: T, data: D[], idProp: string = 'typeid', childrenProp: string = 'children'): D[] {
        let res: D[] = [];
        this.findParent<T, D>(id, data, res, idProp, childrenProp);
        return res;
    }

    private static findParent<T, D>(id: T, data: D[], res: D[], idProp: string = 'typeid', childrenProp: string = 'children') {
        if (Array.isArray(data)) {
            for (const item of data) {
                res.push(item[idProp]);
                this.findParent(id, item[childrenProp], res, idProp, childrenProp);
                if (res.slice(-1)[0][idProp] == id) {
                    break;
                } else {
                    res.splice(-1, 1);
                }
            }
        }
    }

}
