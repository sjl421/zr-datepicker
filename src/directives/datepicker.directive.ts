import {
    Directive, OnInit,
    ElementRef, AfterViewInit,
    Input, Output, EventEmitter
} from '@angular/core';

declare const $: any;

@Directive({
    selector: '[appDatepicker]'
})

export class DatepickerDirective implements OnInit, AfterViewInit {
    @Input() ngModel?: any;
    @Input() dateType?: string = 'displayDate';        // 传出时间类型['originalDate'：原始时间类型，'displayDate'：常见显示类型]
    @Input() format?: string = 'yyyy-mm-dd hh:ii:ss';  // 日期格式化[string类型]
    @Input() showMeridian?: boolean = true;            // 显示上午/下午[boolean类型]
    @Input() autoclose?: boolean = true;               // 选择日期后自动关闭[boolean类型]
    @Input() startView?: number = 2;                   // 开始视图[number类型],0：时分视图，1：时视图，2：日视图，3：月视图，4：年视图
    @Input() weekStart?: number = 1;                   // 开始星期[number类型],0：星期一，1：星期二，2：星期三，3：星期四，4：星期五，5：星期六，6：星期天
    @Input() startDate?: Date;                         // 开始日期[Date类型]，开始日期前面的不能选择
    @Input() endDate?: Date;                           // 结束日期[Date类型]，结束日期后面的不能选择
    @Input() daysOfWeekDisabled?: string | any[]; // 禁选星期[string类型 | array类型]，例如：'0,6'或者[0,6]，即：禁止选择星期六和星期天的所有日期
    @Input() minView?: string | number = 0;            // 最小选择视图[string类型 | number类型]，0：时分视图，1：时视图，2：日视图，3：月视图，4：年视图
    @Input() maxView?: string | number = 4;            // 最大选择视图[string类型 | number类型]，0：时分视图，1：时视图，2：日视图，3：月视图，4：年视图
    @Input() todayBtn?: boolean = false;               // 显示今日按钮[boolean类型]
    @Input() clearBtn?: boolean = false;               // 显示清楚按钮[boolean类型]
    @Input() todayHighlight?: boolean = true;          // 今日高亮[boolean类型]
    @Input() keyboardNavigation?: boolean = true;      // 键盘选择[boolean类型]
    @Input() forceParse?: boolean = true;              // 强制解析[boolean类型]
    @Input() minuteStep?: number = 5;                  // 选择分时最小步长[number类型]
    @Input() pickerPosition?: string = 'bottom-right'; // 选择框位置[string类型]
    @Input() initialDate?: Date;                       // 打开时初始日期[Date类型]
    @Input() isIcon?: boolean = true;                  // 设置图标触发[boolean类型]
    @Input() iconClass?: string = 'la la-calendar';    // 设置图标[string类型]

    @Output() ngModelChange = new EventEmitter();

    constructor(private el: ElementRef) { };

    ngOnInit() { };

    ngAfterViewInit() {
        this.setDatePicker().then(() => {
            this.setIconTrigger().then(() => {
                this.setBlur().then(() => {
                    this.repairIcon();
                });
            });
        });
    };

    setDatePicker() {
        return new Promise((resolve) => {
            $(`#${this.el.nativeElement.id}`).datetimepicker({
                language: 'zh-CN',
                format: this.format,
                showMeridian: this.showMeridian,
                autoclose: this.autoclose,
                startView: this.startView,
                weekStart: this.weekStart,
                startDate: this.startDate,
                endDate: this.endDate,
                daysOfWeekDisabled: this.daysOfWeekDisabled,
                minView: this.minView,
                maxView: this.maxView,
                todayBtn: this.todayBtn,
                clearBtn: this.clearBtn,
                todayHighlight: this.todayHighlight,
                keyboardNavigation: this.keyboardNavigation,
                forceParse: this.forceParse,
                minuteStep: this.minuteStep,
                pickerPosition: this.pickerPosition,
                initialDate: this.initialDate
            }).on('changeDate', (ev: any) => {
                if (this.dateType === 'displayDate') {
                    this.ngModelChange.emit(ev.target.value);
                } else if (this.dateType === 'originalDate') {
                    this.ngModelChange.emit(ev.date);
                }
            });
            resolve();
        });
    };

    // set blur
    setBlur() {
        return new Promise((resolve) => {
            $(`#${this.el.nativeElement.id}`).blur((ev: any) => {
                if (this.ngModel) {
                    this.ngModelChange.emit(this.ngModel);
                    $(`#${this.el.nativeElement.id}`).val(this.ngModel);
                    return;
                };

                if (this.dateType === 'displayDate') {
                    this.ngModelChange.emit(ev.target.value);
                } else if (this.dateType === 'originalDate') {
                    this.ngModelChange.emit(ev.date);
                }
            });
            resolve();
        });
    };

    // set icon trigger
    setIconTrigger() {
        return new Promise((resolve) => {
            if (this.isIcon) {
                $(`#${this.el.nativeElement.id}`).after(`<span class="input-group-addon" style="cursor: pointer;"><i class="${this.iconClass}"></i></span>`);

                $(`#${this.el.nativeElement.id}`).next('span').click(() => {
                    this.el.nativeElement.focus();
                });
                resolve();
            };
        });
    };

    // Fix the last page / next page icon
    repairIcon() {
        $('.glyphicon-arrow-left').addClass('fa fa fa-angle-double-left');
        $('.glyphicon-arrow-right').addClass('fa fa fa-angle-double-right');
    };
};
