import { Component } from '@angular/core';
import {ITable} from '../../projects/right-menu/src/components/table-cfg/table/table.conponent.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'zhou-ng-lib';
    listOfData = Array.from({length: 10}).map(() => ({
        AcceptTaskName: '是打发士大夫阿斯蒂芬撒旦法士大夫阿斯蒂芬阿斯蒂芬阿萨德发的发的发的富士达发的发的否',
        dddd: '是打发士大夫阿斯蒂芬夫阿斯蒂芬阿斯蒂芬阿萨德发的发的发的富士达发的发的否',
        ddde: '是打发士大夫阿斯蒂芬夫阿斯蒂芬阿斯蒂芬阿萨德发的发的发的富士达发的发的否',
        dddf: '是打发士大夫阿斯蒂芬夫阿斯蒂芬阿斯蒂芬阿萨德发的发的发的富士达发的发的否',
        dddg: '是打发士大夫阿斯蒂芬夫阿斯蒂芬阿斯蒂芬阿萨德发的发的发的富士达发的发的否',
    }));
    tableCfg: ITable[] = [
        {
            cprop: '序号',
            nzWidth: '70px',
            serialNum: true,
            rowspan: 3
        }, {
            cprop: '任务名称',
            prop: 'AcceptTaskName',
            styleB: {
                nzAlign: 'left'
            },
            show: true,
            disableShow: true,
            rowspan: 3,
            colspan: 0
        }, {
            cprop: '项目类别',
            prop: '',
            // rowspan: 3,
            colspan: 3,
            children: [
                {
                    prop: '',
                    cprop: '尺寸',
                    colspan: 2,
                    // rowspan: 2,
                    children: [
                        {
                            prop: 'dddd',
                            cprop: '尺寸尺寸1',
                        }, {
                            prop: 'ddde',
                            cprop: '尺寸尺寸2',
                        }
                    ]
                }, {
                    // colspan: 2,
                    prop: '',
                    cprop: '尺寸',
                    rowspan: 2,
                    show: false
                }
            ]
        },
        {
            cprop: '任务类型',
            prop: '',
            rowspan: 3,
            show: false
        }, {
            cprop: '分配人',
            prop: 'TaskAssigner',
            styleB: {
                nzAlign: 'left'
            },
            rowspan: 3,
            show: true
        },
        // {
        //     cprop: '分配时间',
        //     prop: 'AcceptTaskTime',
        //     nzWidth: '160px',
        //     rowspan: 3,
        //     show: true,
        //     children: [
        //         {
        //             cprop: '分配时间1',
        //             children: [
        //                 {
        //                     cprop: '分配时间11'
        //                 },
        //                 {
        //                     cprop: '分配时间22'
        //                 }
        //             ]
        //         },
        //         {
        //             cprop: '分配时间2',
        //             children: [
        //                 {
        //                     cprop: '分配时间3',
        //                     show: false
        //                 },   {
        //                     cprop: '分配时间3'
        //                 }, {
        //                     cprop: '分配时间3',
        //                     children: [
        //                         {
        //                             cprop: '分配时间31'
        //                         },
        //                         {
        //                             cprop: '分配时间32'
        //                         }
        //                     ]
        //                 },
        //             ]
        //         },
        //     ]
        // },
        {
            cprop: '描述',
            prop: 'dddd',
            styleB: {
                nzAlign: 'left'
            },
            rowspan: 3,
            show: true,
            children: [
                {
                    prop: 'dddf',
                    cprop: '描述1'
                },
                {
                    prop: 'dddg',
                    cprop: '描述2'
                }
            ]
        }, {
            cprop: '备注',
            prop: 'Memo',
            isRight: true,
            styleB: {
                nzAlign: 'left'
            },
            rowspan: 3,
            show: false
        }
    ];
}
