let Mock = require('mockjs');
let Random = Mock.Random;
const DEFAULTS = {
    "success": true,
    "messageCode": "",
    "message": "成功",
    "data": [],
};

const API = {
    api: {
        learning(data) {
            Object.assign(data, Mock.mock({
                "data": {
                    "userActivityExecuteInfo": {
                        "participants": 100,
                        "efficiency": 20,
                        "thingsWork": 30,
                        "intelligence": 30,
                        "ranking": 20
                    },
                    "itemList": [
                        {
                            "itemCode": "manualTax",
                            "itemName": "手工",
                            "open": 1,
                        },
                        {
                            "itemCode": "intelligentDeclaration",
                            "itemName": "智能申报",
                            "open": 2,
                        },
                        {
                            "itemCode": "intelligentTubeTax",
                            "itemName": "智能管税",
                            "open": 0,
                        },
                        {
                            "itemCode": "intelligentTaxRaising",
                            "itemName": "智能筹税",
                            "open": 0,
                        },
                    ]
                }
            }))
        },
    },
    api_activity: {
        pass(data) {
            Object.assign(data, Mock.mock({
                "data": true
            }))
        }
    },
    api_learning_item: {
        link(data) {
            Object.assign(data, Mock.mock({
                "data": {
                    "itemList": [
                        {
                            "itemCode": "zzsyjsccwbb",
                            "itemName": "增值税一键生成财务报表",
                            "open": 1,
                            "finish": 0
                        },
                        {
                            "itemCode": "xgmkjsb",
                            "itemName": "小规模快捷申报",
                            "open": 1,
                            "finish": 0
                        },
                        {
                            "itemCode": "yjdrcwbb",
                            "itemName": "一键导入财务报表",
                            "open": 1,
                            "finish": 0
                        },
                        {
                            "itemCode": "dsyjsb",
                            "itemName": "地税一键申报",
                            "open": 1,
                            "finish": 0
                        },
                        {
                            "itemCode": "sdsnbbbyjsc",
                            "itemName": "所得税年报报表一键生成",
                            "open": 0,
                            "finish": 0
                        },
                        {
                            "itemCode": "outInvoiceStandingBook",
                            "itemName": "销项台账",
                            "open": 0,
                            "finish": 0,
                            "extra": "{\"intelligence\": 4,\"efficiency\": 3,\"thingsWork\": 5,\"inOrOut\": \"out\"}"
                        },
                        {
                            "itemCode": "kpxmgl",
                            "itemName": "开票项目管理",
                            "open": 0,
                            "finish": 0,
                            "extra": "{\"intelligence\": 4,\"efficiency\": 3,\"thingsWork\": 5,\"inOrOut\": \"out\"}"
                        },
                        {
                            "itemCode": "kpxzs",
                            "itemName": "开票小助手",
                            "open": 0,
                            "finish": 0,
                            "extra": "{\"intelligence\": 4,\"efficiency\": 3,\"thingsWork\": 5,\"inOrOut\": \"out\"}"
                        },
                        {
                            "itemCode": "xssejs",
                            "itemName": "销项税额计算",
                            "open": 0,
                            "finish": 0,
                            "extra": "{\"intelligence\": 4,\"efficiency\": 3,\"thingsWork\": 5,\"inOrOut\": \"out\"}"
                        },
                        {
                            "itemCode": "inInvoiceStandingBook",
                            "itemName": "进项台账",
                            "open": 0,
                            "finish": 0,
                            "extra": "{\"intelligence\": 4,\"efficiency\": 3,\"thingsWork\": 5,\"inOrOut\": \"in\"}"
                        },
                        {
                            "itemCode": "jxfpjsrz",
                            "itemName": "进项发票极速认证",
                            "open": 0,
                            "finish": 0,
                            "extra": "{\"intelligence\": 4,\"efficiency\": 3,\"thingsWork\": 5,\"inOrOut\": \"in\"}"
                        },
                        {
                            "itemCode": "jxsejs",
                            "itemName": "进项税额计算",
                            "open": 0,
                            "finish": 0,
                            "extra": "{\"intelligence\": 4,\"efficiency\": 3,\"thingsWork\": 5,\"inOrOut\": \"in\"}"
                        },
                        {
                            "itemCode": "qdfpgl",
                            "itemName": "取得发票管理",
                            "open": 0,
                            "finish": 0,
                            "extra": "{\"intelligence\": 4,\"efficiency\": 3,\"thingsWork\": 5,\"inOrOut\": \"in\"}"
                        }
                    ],
                    "extra": {
                        "declarationPerson": {
                            "receive": 0,
                            "skillNumber": 1
                        },
                        "lotteryDraw": {
                            "lotteryDrawUrl": "http://www.baidu.com",
                            "skillNumber": 1
                        }
                    }
                }
            }))
        }
    },
    api_activity_lottery_draw: {
        url(data) {
            Object.assign(data, Mock.mock({
                "data|2-10": [
                    {
                        "lotteryDrawUrl": "http://www.baidu.com",
                        "acceptPrizeTime": Random.date('yyyy-MM-dd hh:mm:ss'),
                        "prizeName": Random.cword(5, 10),
                        "drawPrizeStatus": /[0-2]/,
                        "prizeType": /[0-1]/,
                    }
                ],
            }))
        }
    }
};

const init = (data, collection = API) => {
    for (let key in data) {
        let item = data[key]
        if (item instanceof Array) {
            init(item, collection[key])
        } else {
            if (typeof collection[item.id] === 'function') {
                Object.assign(item, DEFAULTS)
                collection[item.id].call(this, item)
            }

        }
    }
}

/**
 * 使用说明：
 * 1.按功能大类划分API，如commonAPI、xxfpAPI
 * 2.场景一： 两级接口，如/common/getSl：在data中配置common数组，数组中配置{"id" : "getSl"}
 * 3.场景二： 三级接口，如/common/annotations/add: 在data配置common_annotations，即一级+"_"+"二级"，数组中配置{"id" : "add"}
 * 4.数据构建：在mockData中添加接口名及数据，参照getSl
 *
 * @returns {}
 */
module.exports = function () {
    var data = {
        "api": [
            {"id": "learning"},
        ],
        "api_activity": [
            {"id": "pass"},
        ],
        "api_learning_item": [
            {"id": "link"}
        ],
        "api_activity_lottery_draw": [
            {"id": "url"}
        ]
    };

    init(data);
    return data;
};

