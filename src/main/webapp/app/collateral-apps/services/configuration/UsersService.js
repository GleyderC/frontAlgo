angular.module('DashboardApp')
    .service('UsersService', ['$request', 'toastr', function ($request, toastr) {

        this.getAll = function () {
            return $request.get('/servlet/User/SelectAll');
        }

        this.getById = function (idUser) {
            return $request.get('/servlet/User/Select');
        }

        this.set = function (User, isUpdate) {
            if (isUpdate) {
                console.log("Update");
                $request.put('/servlet/User/Update', User)
                    .then(function (Response) {
                            toastr.success("Data successfully updated", "Success");
                        }
                    );
            }
            else
                $request.post('/servlet/User/Insert', User)
                    .then(function (Response) {
                            console.log("Insert");
                            User.id = Response.data.dataResponse;
                            toastr.success("Successfully stored data", "Success");
                        }
                    );
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