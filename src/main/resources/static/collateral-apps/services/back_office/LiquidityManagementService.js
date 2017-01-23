angular.module('DashboardApp')
    .service('LiquidityManagementService', ['$request', 'toastr', '$q', function ($request, toastr, $q) {

    	this.data = [
    			{
    				fecha: "16/11/2017",
    				currency : "EUR",
    				"1st_businessday" : -2857142.86,
    				"2nd_businessday" : 3562100.00,
    				"3rd_businessday" : 1800000.00,
    				"4th_businessday" : -578030.00,
    				"5th_businessday" : 5890321.00,
    				"2_weeks"  : 13568930.25,
    				"1_month"  :  9565231.25,
    				"6_months" : null,
                    trades :[
                                {
                                    tradeID: "000000043",
                                    originID : 1438338001,
                                    family : "Curr",
                                    group  : "Fwd",
                                    sense  : "B", 
                                    currency_pair  :  "EUR/USD", 
                                    amount : 3000000.00,
                                    settlement_date  : "12/12/2016",
                                    trade_date  : "23/11/2016"
                                },
                                {
                                    tradeID: "000000044",
                                    originID : 1438338002,
                                    family : "Curr",
                                    group  : "Fwd",
                                    sense  : "S", 
                                    currency_pair  :  "USD/JPY", 
                                    amount : 2500000.00,
                                    settlement_date  : "12/12/2016",
                                    trade_date  : "23/11/2016"
                                },
                                {
                                    tradeID: "000000045",
                                    originID : 1438338003,
                                    family : "Curr", 
                                    group  : "Spot",
                                    sense  : "S", 
                                    currency_pair  :  "USD/GBP", 
                                    amount : 2500000.00,
                                    settlement_date  : "12/12/2016",
                                    trade_date  : "23/11/2016"

                                },
                                

                    ]

    			},{
    				fecha: "16/11/2017",
    				currency : "USD",
    				"1st_businessday" : -2000000.86,
    				"2nd_businessday" : -3700000.00,
    				"3rd_businessday" : null,
    				"4th_businessday" : -2500000.00,
    				"5th_businessday" : 890065.00,
    				"2_weeks"  : -14247376.76,
    				"1_month"  :  -10589321.25,
    				"6_months" : null,
                    trades :[
                                {
                                    tradeID: "000000043",
                                    originID : 1438338001,
                                    family : "Curr",
                                    group  : "Fwd",
                                    sense  : "B", 
                                    currency_pair  :  "EUR/USD", 
                                    amount : 3000000.00,
                                    settlement_date  : "12/12/2016",
                                    trade_date  : "23/11/2016"
                                },
                                {
                                    tradeID: "000000044",
                                    originID : 1438338002,
                                    family : "Curr",
                                    group  : "Fwd",
                                    sense  : "S", 
                                    currency_pair  :  "USD/JPY", 
                                    amount : 2500000.00,
                                    settlement_date  : "12/12/2016",
                                    trade_date  : "23/11/2016"
                                },
                                {
                                    tradeID: "000000045",
                                    originID : 1438338003,
                                    family : "Curr", 
                                    group  : "Spot",
                                    sense  : "S", 
                                    currency_pair  :  "USD/GBP", 
                                    amount : 2500000.00,
                                    settlement_date  : "12/12/2016",
                                    trade_date  : "23/11/2016"

                                },
                                

                    ]

    			},{
    				fecha: "16/11/2017",
    				currency : "CNH",
    				"1st_businessday" : null,
    				"2nd_businessday" : null,
    				"3rd_businessday" : null,
    				"4th_businessday" : null,
    				"5th_businessday" : null,
    				"2_weeks"  : null,
    				"1_month"  :  null,
    				"6_months" : null,
                    trades :[
                                {
                                    tradeID: "000000033",
                                    originID : 3438338001,
                                    family : "Curr",
                                    group  : "Fwd",
                                    sense  : "B", 
                                    currency_pair  :  "EUR/USD", 
                                    amount : 3000000.00,
                                    settlement_date  : "12/12/2016",
                                    trade_date  : "23/11/2016"
                                },
                                {
                                    tradeID: "000000044",
                                    originID : 1438338002,
                                    family : "Curr",
                                    group  : "Spot",
                                    sense  : "S", 
                                    currency_pair  :  "USD/JPY", 
                                    amount : 2500000.00,
                                    settlement_date  : "12/12/2016",
                                    trade_date  : "23/11/2016"
                                },
                                {
                                    tradeID: "000000045",
                                    originID : 1438338003,
                                    family : "Curr", 
                                    group  : "Spot",
                                    sense  : "S", 
                                    currency_pair  :  "USD/GBP", 
                                    amount : 2500000.00,
                                    settlement_date  : "12/12/2016",
                                    trade_date  : "23/11/2016"

                                },
                                

                    ]

    			},{
    				fecha: "16/11/2017",
    				currency : "PLN",
    				"1st_businessday" : null,
    				"2nd_businessday" : null,
    				"3rd_businessday" : null,
    				"4th_businessday" : null,
    				"5th_businessday" : null,
    				"2_weeks"  : null,
    				"1_month"  : null,
    				"6_months" : null,
                    trades :[
                                {
                                    tradeID: "000000043",
                                    originID : 1438338001,
                                    family : "Curr",
                                    group  : "Fwd",
                                    sense  : "B", 
                                    currency_pair  :  "EUR/USD", 
                                    amount : 3000000.00,
                                    settlement_date  : "12/12/2016",
                                    trade_date  : "23/11/2016"
                                },
                                {
                                    tradeID: "000000044",
                                    originID : 1438338002,
                                    family : "Curr",
                                    group  : "Fwd",
                                    sense  : "S", 
                                    currency_pair  :  "USD/JPY", 
                                    amount : 2500000.00,
                                    settlement_date  : "12/12/2016",
                                    trade_date  : "23/11/2016"
                                },
                                {
                                    tradeID: "000000045",
                                    originID : 1438338003,
                                    family : "Curr", 
                                    group  : "Spot",
                                    sense  : "S", 
                                    currency_pair  :  "USD/GBP", 
                                    amount : 2500000.00,
                                    settlement_date  : "12/12/2016",
                                    trade_date  : "23/11/2016"

                                },
                                

                    ]

    			},{
    				fecha: "16/11/2017",
    				currency : "MXN",
    				"1st_businessday" :  null,
    				"2nd_businessday" :  null,
    				"3rd_businessday" : null,
    				"4th_businessday" :  null,
    				"5th_businessday" : null,
    				"2_weeks"  : null,
    				"1_month"  :  null,
    				"6_months" : null,
                    trades :[
                                {
                                    tradeID: "000000043",
                                    originID : 1438338001,
                                    family : "Curr",
                                    group  : "Fwd",
                                    sense  : "B", 
                                    currency_pair  :  "EUR/USD", 
                                    amount : 3000000.00,
                                    settlement_date  : "12/12/2016",
                                    trade_date  : "23/11/2016"
                                },
                                {
                                    tradeID: "000000044",
                                    originID : 1438338002,
                                    family : "Curr",
                                    group  : "Fwd",
                                    sense  : "S", 
                                    currency_pair  :  "USD/JPY", 
                                    amount : 2500000.00,
                                    settlement_date  : "12/12/2016",
                                    trade_date  : "23/11/2016"
                                },
                                {
                                    tradeID: "000000045",
                                    originID : 1438338003,
                                    family : "Curr", 
                                    group  : "Spot",
                                    sense  : "S", 
                                    currency_pair  :  "USD/GBP", 
                                    amount : 2500000.00,
                                    settlement_date  : "12/12/2016",
                                    trade_date  : "23/11/2016"

                                },
                                

                    ]

    			},{
    				fecha: "16/11/2017",
    				currency : "CHF",
    				"1st_businessday" :   null,
    				"2nd_businessday" :   null,
    				"3rd_businessday" :  null,
    				"4th_businessday" :   null,
    				"5th_businessday" : null,
    				"2_weeks"  :  null,
    				"1_month"  :   null,
    				"6_months" : null,
                    trades :[
                                {
                                    tradeID: "000000043",
                                    originID : 1438338001,
                                    family : "Curr",
                                    group  : "Fwd",
                                    sense  : "B", 
                                    currency_pair  :  "EUR/USD", 
                                    amount : 3000000.00,
                                    settlement_date  : "12/12/2016",
                                    trade_date  : "23/11/2016"
                                },
                                {
                                    tradeID: "000000044",
                                    originID : 1438338002,
                                    family : "Curr",
                                    group  : "Fwd",
                                    sense  : "S", 
                                    currency_pair  :  "USD/JPY", 
                                    amount : 2500000.00,
                                    settlement_date  : "12/12/2016",
                                    trade_date  : "23/11/2016"
                                },
                                {
                                    tradeID: "000000045",
                                    originID : 1438338003,
                                    family : "Curr", 
                                    group  : "Spot",
                                    sense  : "S", 
                                    currency_pair  :  "USD/GBP", 
                                    amount : 2500000.00,
                                    settlement_date  : "12/12/2016",
                                    trade_date  : "23/11/2016"

                                },
                                

                    ]

    			},
    			{
    				fecha: "16/11/2017",
    				currency : "JPY",
    				"1st_businessday" : 288306811.67,
    				"2nd_businessday" : -87895736.15,
    				"3rd_businessday" : null,
					"4th_businessday" : null,
    				"5th_businessday" : -576613623.34,
    				"2_weeks"  : null,
    				"1_month"  :  null,
    				"6_months" : null,
                    trades :[
                                {
                                    tradeID: "000000043",
                                    originID : 1438338001,
                                    family : "Curr",
                                    group  : "Fwd",
                                    sense  : "B", 
                                    currency_pair  :  "EUR/USD", 
                                    amount : 3000000.00,
                                    settlement_date  : "12/12/2016",
                                    trade_date  : "23/11/2016"
                                },
                                {
                                    tradeID: "000000044",
                                    originID : 1438338002,
                                    family : "Curr",
                                    group  : "Fwd",
                                    sense  : "S", 
                                    currency_pair  :  "USD/JPY", 
                                    amount : 2500000.00,
                                    settlement_date  : "12/12/2016",
                                    trade_date  : "23/11/2016"
                                },
                                {
                                    tradeID: "000000045",
                                    originID : 1438338003,
                                    family : "Curr", 
                                    group  : "Spot",
                                    sense  : "S", 
                                    currency_pair  :  "USD/GBP", 
                                    amount : 2500000.00,
                                    settlement_date  : "12/12/2016",
                                    trade_date  : "23/11/2016"

                                },
                                

                    ]


    			},
    			{
    				fecha: "16/11/2017",
    				currency : "GBP",
    				"1st_businessday" : 1974839.58,
    				"2nd_businessday" : 1100000.00,
    				"3rd_businessday" : null,
    				"5th_businessday" : 2356900.00,
    				"4th_businessday" : null,
    				"2_weeks"  : 489035.26,
    				"1_month"  :null,
    				"6_months" : null,
                    trades :[
                                {
                                    tradeID: "000000043",
                                    originID : 1438338001,
                                    family : "Curr",
                                    group  : "Fwd",
                                    sense  : "B", 
                                    currency_pair  :  "EUR/USD", 
                                    amount : 3000000.00,
                                    settlement_date  : "12/12/2016",
                                    trade_date  : "23/11/2016"
                                },
                                {
                                    tradeID: "000000044",
                                    originID : 1438338002,
                                    family : "Curr",
                                    group  : "Fwd",
                                    sense  : "S", 
                                    currency_pair  :  "USD/JPY", 
                                    amount : 2500000.00,
                                    settlement_date  : "12/12/2016",
                                    trade_date  : "23/11/2016"
                                },
                                {
                                    tradeID: "000000045",
                                    originID : 1438338003,
                                    family : "Curr", 
                                    group  : "Spot",
                                    sense  : "S", 
                                    currency_pair  :  "USD/GBP", 
                                    amount : 2500000.00,
                                    settlement_date  : "12/12/2016",
                                    trade_date  : "23/11/2016"

                                },
                                

                    ]

    			}



    	];
        this.getAll = function () {
            return this.data;
        }

       

    }]);