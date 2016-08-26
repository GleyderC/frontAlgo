angular.module('DashboardApp')
    .service('SecurityService', ['$request', 'toastr', function ($request, toastr) {

        this.getAll = function () {
            return $request.get('/servlet/Security/SelectAll');
        }
        this.getByIsin = function(isin){
        	  var param  = {
        			  isin : isin
        	  };
        	  return $request.post('/servlet/Security/Select',param);
        };

    }]);