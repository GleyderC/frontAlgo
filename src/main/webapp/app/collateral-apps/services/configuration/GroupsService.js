angular.module('DashboardApp')
    .service('GroupsService', ['$request', 'toastr', function ($request, toastr) {

        this.getAll = function () {
            return $request.get('/servlet/UserGroups/SelectAll');
        }

        this.getById = function (IdUserGroups) {

            var param = {id: IdUserGroups};
            //console.log(param);

            return $request.post('/servlet/UserGroups/Select', param);

        }

        this.set = function (UserGroups, isUpdate) {

            if (isUpdate) {
                //console.log("Update");
                $request.put('/servlet/UserGroups/Update', UserGroups)
                    .then(function (Response) {
                            toastr.success("Data successfully updated", "Success");
                        }
                    );
            }
            else
                $request.post('/servlet/UserGroups/Insert', UserGroups)
                    .then(function (Response) {
                            //console.log("Insert");
                            //UserGroups.id = Response.data.dataResponse;
                            toastr.success("Successfully stored data", "Success");
                        }
                    );
        }

        this.delete = function (idUserGroups) {
            var params = {

                "id": idUserGroups
            };

            //console.log(params);

            $request.delete('/servlet/UserGroups/Delete', params)
                .then(function (Response) {

                    toastr.success("Data successfully removed", "Success")
                });
        }
        this.addUser = function(IdGroup,IdUser){

            var params = {
                "userGroupID": IdGroup,
                "userID": IdUser
            }
            $request.post('/servlet/UserGroups/AddUser',params)
                .then(function (Response) {
                    toastr.success("Successfully stored data", "Success");
                });

        }
        this.deleteUser = function(IdGroup,IdUser){

            var params = {
                "userGroupID": IdGroup,
                "userID": IdUser
            }
            $request.post('/servlet/UserGroups/DeleteUser',params)
                .then(function (Response) {
                    toastr.success("Data successfully removed", "Success")
                });

        }

    }]);