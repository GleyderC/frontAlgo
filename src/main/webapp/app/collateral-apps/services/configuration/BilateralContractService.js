angular.module('DashboardApp')
    .service('BilateralContractService', ['$request', 'toastr', function ($request, toastr) {
        var BilateralContract = {};

        var bilateralContracts = [];

        this.getAll = function () {
            return $request.get('/servlet/BilateralContract/SelectAll');
        }

        this.getById = function (idBilateralContract) {
            var param = {id: idBilateralContract};
            return $request.post('/servlet/BilateralContract/Select', param);
        }

        this.set = function (bilateralContract, isUpdate) {
            if (isUpdate) {
                $request.put('/servlet/BilateralContract/Update', bilateralContract)
                    .then(function (Response) {
                            toastr.success("Data successfully updated", "Success");
                        }
                    );
            }
            else
                $request.post('/servlet/BilateralContract/Insert', bilateralContract)
                    .then(function (Response) {
                            bilateralContract.id = Response.data.dataResponse;
                            bilateralContracts.push(bilateralContract);
                            toastr.success("Successfully stored data", "Success");
                        }
                    );
        }

        this.delete = function (idBilateralContract) {
            var params = {

                "id": idBilateralContract
            };

            //console.log(params);

            $request.delete('/servlet/BilateralContract/Delete', params)
                .then(function (Response) {

                    toastr.success("Data successfully removed", "Success")
                });
        }

    }]);