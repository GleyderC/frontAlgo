angular.module('DashboardApp')
    .service('UsersService', ['$request', 'toastr','$q', function ($request, toastr, $q) {

        this.getAll = function () {
            return $request.get('/servlet/User/SelectAll');
        }

        this.getById = function (idUser) {
            return $request.get('/servlet/User/Select');
        }

        this.set = function (User, isUpdate) {
            let defered = $q.defer();
            let promise = defered.promise;

            if (isUpdate) {
                //console.log("Update");
                $request.put('/servlet/User/Update', User)
                    .then(function (Response) {
                        User.id = Response.data.dataResponse;

                        if(User.id != 0){
                            defered.resolve(User.id);
                            toastr.success("Data successfully updated", "Success");
                        }
                    });
            }
            else {
                $request.post('/servlet/User/Insert', User)
                    .then(function (Response) {
                            //console.log("Insert");
                            User.id = Response.data.dataResponse;

                        //console.log(User.id);
                            if(User.id == 0){
                                toastr.error("User login already exists", "Error");

                            }
                            else {

                                toastr.success("Successfully stored data", "Success");

                            }
                            defered.resolve(User.id);
                        }
                    );
            }
            return promise;
        }

        this.delete = function (idUser) {
            var params = {

                "id": idUser
            };

            //console.log(params);

            $request.delete('/servlet/User/Delete', params)
                .then(function (Response) {

                    toastr.success("Data successfully removed", "Success")
                });
        }

    }]);