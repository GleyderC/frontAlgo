angular.module('DashboardApp')
    .service('ArrayService',function () {

        this.ArrayDuplicateCounter = function(original){
            var compressed = [];
            // make a copy of the input array
            var copy = original.slice(0);

            // first loop goes over every element
            for (var i = 0; i < original.length; i++) {

                var myCount = 0;
                // loop over every element in the copy and see if it's the same
                for (var x = 0; x < copy.length; x++) {
                    if (original[i] == copy[x]) {
                        // increase amount of times duplicate is found
                        myCount++;
                        // sets item to undefined
                        delete copy[x];
                    }
                }

                if (myCount > 0) {
                    var a = new Object();
                    a.value = original[i];
                    a.count = myCount;
                    compressed.push(a);
                }
            }

            return compressed;
        }

    });