angular.module('DashboardApp')
    .service('SettlementAccountService', ['$request', 'toastr', function ($request, toastr) {
        
        this.getAll = function () {
            return $request.get('/servlet/SettlementAccount/SelectAll');
        }

        this.getById = function (idSettlementAccount) {
            //console.log(idSettlementAccount);
            var param = {id: idSettlementAccount};
            return $request.post('/servlet/SettlementAccount/Select', param);
        }

        this.set = function (SettlementAccount, isUpdate) {
            //console.log(SettlementAccount);
            if (isUpdate) {
                //console.log("Update");
                $request.put('/servlet/SettlementAccount/Update', SettlementAccount)
                    .then(function (Response) {
                            toastr.success("Data successfully updated", "Success");
                        }
                    );
            }
            else
                $request.post('/servlet/SettlementAccount/Insert', SettlementAccount)
                    .then(function (Response) {
                            //console.log("Insert");
                            //console.log(Response.data.dataResponse);
                            SettlementAccount.id = Response.data.dataResponse;
                            toastr.success("Successfully stored data", "Success");
                        }
                    );
        }

        this.delete = function (idSettlementAccount) {
            var params = {

                "id": idSettlementAccount
            };

            //console.log(params);

            $request.delete('/servlet/SettlementAccount/Delete', params)
                .then(function (Response) {

                    toastr.success("Data successfully removed", "Success")
                });
        }

    }]);