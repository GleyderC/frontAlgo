angular.module('DashboardApp')
    .service('GroupsService', ['$request', 'toastr', '$q', function ($request, toastr, $q) {

        this.getAll = function () {
            return $request.get('/servlet/UserGroups/SelectAll');
        }

        this.getById = function (IdUserGroups) {

            var param = {id: IdUserGroups};
            //console.log(param);

            return $request.post('/servlet/UserGroups/Select', param);

        }

        this.set = function (UserGroups, isUpdate) {
            let defered = $q.defer();
            let promise = defered.promise;

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
                        let groupId = Response.data.dataResponse;

                        if(groupId == 0){

                            toastr.error("Group's Name already exists", "Error");

                        }
                        else {

                            toastr.success("Successfully stored data", "Success");
                        }
                        defered.resolve(groupId);

                    });
            return promise;
        }

        this.delete = function (idUserGroups) {
            var params = {

                "id": idUserGroups
            };

            //console.log(params);

            $request.delete('/servlet/UserGroups/Delete', params)
                .then(function (Response) {

                    toastr.success("Data successfully removed", "Success");
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

            let defered = $q.defer();
            let promise = defered.promise;

            var params = {
                "userGroupID": IdGroup,
                "userID": IdUser
            }
            $request.post('/servlet/UserGroups/DeleteUser',params)
                .then(function (Response) {
                    if(Response.data.dataResponse == "Successfully removed User") {
                        toastr.success("Successfully removed User", "Success");
                        defered.resolve("Successfully removed User");
                    }
                    else if(Response.data.dataResponse == "User not found") {
                        toastr.error("User not found", "Success");
                        defered.resolve("User not found");
                    }
                    else if(Response.data.dataResponse == "The user can not be removed"){
                        toastr.warning("The user can not be removed", "Warning");
                        defered.resolve("The user can not be removed");

                    }
                });

            return promise;
        }
        
        this.addPermission = function (IdGroup, IdPermission, typePermission) {

            var params = {
                "userGroupID": IdGroup,
                "groupPermissionID": IdPermission,
                "typePermission": typePermission
            }
            $request.post('/servlet/UserGroups/AddPermission', params).then(function (result) {

                if(result == true){

                    toastr.success("Permissions Successfully Added", "Success");

                }
                else{

                    toastr.error("Permissions can not be Added", "Success");

                }
            });
        }

    }]);