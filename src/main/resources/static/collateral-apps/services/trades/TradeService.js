angular.module('DashboardApp')
    .service('TradeService', ['$request', 'toastr', function ($request, toastr) {

        var data = {
            TestData: [{"Trader":"Ramón","Desk":"FX","DateTime":"12/04/2017 12:34","Notional":10000000,"Principal":"Inversis","Client":"HedgeFund XXX","Counterparty":"BBVA","Mercado":"OTC","Producto":"FX_FWD EUR/USD 12/04/2018","Vencimiento":"12/04/2018","Precio":"1.23","Sentido":"COMPRA","Status":"B.O. POR VALIDAR"},
                {"Trader":"Ramón","Desk":"FX","DateTime":"12/04/2017 11:12","Notional":50000000,"Principal":"Inversis","Client":"","Counterparty":"BBVA","Mercado":"OTC","Producto":"FX_SPOT EUR/JPY","Vencimiento":"13/04/2017","Precio":"134.34","Sentido":"VENTA","Status":"B.O. CONFIRMADA"},
                {"Trader":"Juan","Desk":"FI_FX","DateTime":"12/04/2017 10:01","Notional":100000000,"Principal":"","Client":"HedgeFund XXX","Counterparty":"","Mercado":"EuroClear","Producto":"US TREASURY BOND 12/04/2034 1,2%","Vencimiento":"12/04/2034","Precio":"98.4","Sentido":"COMPRA","Status":"B.O. CONFIRMADA"},
                {"Trader":"Ramón","Desk":"DEPO_FX","DateTime":"12/04/2017 09:01","Notional":250000000,"Principal":"Inversis","Client":"","Counterparty":"SANTANDER","Mercado":"OTC","Producto":"DEPO USD 3M","Vencimiento":"12/07/2017","Precio":"0,01%","Sentido":"COMPRA","Status":"B.O. CONFIRMADA"}]
        };

        this.getTestdata = function () {
            return data.TestData;
        }

        this.setTestdata = function (values) {
            data.TestData = values;
        }

        
    }]);