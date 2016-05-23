/**
 * Created by laclew on 22/05/16.
 */
angular.module('DashboardApp')
    .factory('ConfigurationService',['$q','$request','toastr',function ($q,$request,toastr) {
        var configuration = {};

        var legalEntities = [];

        var defered =  $q.defer();
        var promise = defered.promise;

        configuration.getLegalEntities = function(){
            $request.get('/servlet/LegalEntity/SelectAll').then(function (Response) {
                //Response.data.dataResponse[0].rolList.push('Other');
                legalEntities = Response.data.dataResponse;
                defered.resolve(legalEntities);

            }),function (error) {
                defered.reject(error);
            };
            return promise;
        }

        configuration.getLegalEntity = function(idLegal){
            var param = {id:idLegal};
            $request.get('/servlet/LegalEntity/Select',param).then(function (Response) {
                legalEntity = Response.data.dataResponse;
                defered.resolve(legalEntity);

            }),function (error) {
                defered.reject(error);
            };
            return promise;
        }

        configuration.setLegalEntity = function (legalEntity,isUpdate) {
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
                            toastr.success("Successfully stored data","Success");
                        }
                    );
        }

        configuration.deleteLegalEntity = function (idLegal) {
            var params = {

                "id": legalEntities[idLegal].id
            };

            console.log(legalEntities[idLegal].id);

            console.log(params);

            $request.delete('/servlet/LegalEntity/Delete', params)
                .then(function (Response) {
                       legalEntities.splice(idLegal, 1);
                        toastr.success("Data successfully removed","Success")
                    });
        }

        return configuration;
    }]);