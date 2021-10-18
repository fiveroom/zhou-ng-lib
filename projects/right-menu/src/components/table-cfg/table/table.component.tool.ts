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
