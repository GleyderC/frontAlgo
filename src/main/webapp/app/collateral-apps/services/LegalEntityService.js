angular.module('DashboardApp')
    .service('LegalEntityService',['$q','$request','toastr',function ($q,$request,toastr) {
        var LegalEntity = {};

        var legalEntities = [];

        var defered =  $q.defer();
        var promise = defered.promise;

        this.getAll = function(){
            return $request.get('/servlet/LegalEntity/SelectAll');
        }

        this.getById = function(idLegal){
            //console.log(idLegal);
            var param = {id:idLegal};
            return $request.post('/servlet/LegalEntity/Select',param);
        }

        this.set = function (legalEntity,isUpdate) {
            console.log(legalEntity);
            if(isUpdate){
                console.log("Update");
                $request.put('/servlet/LegalEntity/Update', legalEntity)
                    .then(function (Response) {
                            toastr.success("Data successfully updated","Success");
                        }
                    );
            }
            else
                $request.post('/servlet/LegalEntity/Insert', legalEntity)
                    .then(function (Response) {
                            console.log("Insert");
                            console.log(Response.data.dataResponse);
                            legalEntity.id = Response.data.dataResponse;
                            legalEntities.push(legalEntity);
                            toastr.success("Successfully stored data","Success");
                        }
                    );
        }

        this.delete = function (idLegal) {
            var params = {

                "id": idLegal
            };

            //console.log(params);

            $request.delete('/servlet/LegalEntity/Delete', params)
                .then(function (Response) {
                       
                        toastr.success("Data successfully removed","Success")
                    });
        }

    }]);