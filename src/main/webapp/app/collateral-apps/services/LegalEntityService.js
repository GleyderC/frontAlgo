angular.module('DashboardApp')
    .factory('LegalEntityService',['$q','$request','toastr',function ($q,$request,toastr) {
        var LegalEntity = {};

        var legalEntities = [];

        var defered =  $q.defer();
        var promise = defered.promise;

        LegalEntity.getAll = function(){
            $request.get('/servlet/LegalEntity/SelectAll').then(function (Response) {
                //Response.data.dataResponse[0].rolList.push('Other');
                legalEntities = Response.data.dataResponse;
                defered.resolve(legalEntities);

            }),function (error) {
                defered.reject(error);
            };
            return promise;
        }

        LegalEntity.getById = function(idLegal){
            var param = {id:idLegal};
            $request.get('/servlet/LegalEntity/Select',param).then(function (Response) {
                legalEntity = Response.data.dataResponse;
                defered.resolve(legalEntity);

            }),function (error) {
                defered.reject(error);
            };
            return promise;
        }

        LegalEntity.set = function (legalEntity,isUpdate) {
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

        LegalEntity.delete = function (idLegal) {
            var params = {

                "id": idLegal
            };

            //console.log(params);

            $request.delete('/servlet/LegalEntity/Delete', params)
                .then(function (Response) {
                       
                        toastr.success("Data successfully removed","Success")
                    });
        }

        return LegalEntity;
    }]);