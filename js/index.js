(function () {

    var app = angular.module('myApp', ['ui.router']);



    app.run(function ($rootScope, $location, $state, LoginService) {

        $rootScope.$on('$stateChangeStart',

            function (event, toState, toParams, fromState, fromParams) {

                console.log('Changed state to: ' + toState);

            });



        if (!LoginService.isAuthenticated()) {

            $state.transitionTo('login');

        }

    });



    app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/home');



        $stateProvider

            .state('login', {

                url: '/login',

                templateUrl: 'login.html',

                controller: 'LoginController'

            })

            .state('home', {

                url: '/home',

                templateUrl: 'home.html',

                controller: 'HomeController'

            })

            .state('membership', {

                url: '/membership',

                templateUrl: 'membership.html'

                // controller : 'MembershipController'

            })

            .state('Addgroup', {

                url: '/Addgroup',

                templateUrl: 'Addgroup.html',

                controller: 'GroupController'

            })

            .state('Membergroup', {

                url: '/Membergroup',

                templateUrl: 'Membergroup.html',

                controller: 'MemberGroupController'

            });

    }]);



    app.controller('LoginController', function ($scope, $rootScope, $stateParams, $state, LoginService) {

        $rootScope.title = "FitnessBI Login Sample";



        $scope.formSubmit = function () {

            if (LoginService.login($scope.username, $scope.password, $scope.orgid)) {

                $scope.error = '';

                $scope.username = '';

                $scope.password = '';

                $scope.orgid = '';

                $state.transitionTo('home');

            } else {

                $scope.error = "Incorrect username/password/OrgId !";

            }

        };



    });



    app.controller('HomeController', function ($scope, $rootScope, $stateParams, $state, LoginService) {

        $rootScope.title = "FitnessBI Login Sample";



    });

    app.controller('GroupController', function ($scope, $rootScope, $stateParams, $state, LoginService) {

        $scope.products = ["Milk", "Bread", "Cheese", "Tea", "Cold Drink", "chips", "Popcorn", "Bar", "Coffe"];

        $scope.addItem = function () {

            $scope.errortext = "";

            if (!$scope.addMe) { return; }

            if ($scope.products.indexOf($scope.addMe) == -1) {

                $scope.products.push($scope.addMe);

            } else {

                $scope.errortext = "The item is already in your shopping list.";

            }

        }





    });



    app.controller('MemberGroupController', function ($scope, $rootScope, $stateParams, $state, LoginService) {

        $scope.items = [{ name: 'Tea', team: 'Baverage' },

        { name: 'Coffe', team: 'Baverage' },

        { name: 'Juice', team: 'Baverage' },

        { name: 'Chips', team: 'Snack' },

        { name: 'Bar', team: 'Snack' },

        { name: 'Popcorn', team: 'Snack' },

        { name: 'Cold drink', team: 'Baverage' }

        ];
        $scope.deleteRow = function (i) {
            $scope.items.splice(i, 1);
        };

        var indexedTeams = [];

        $scope.AddItem = function () {



            // add to our js object array

            $scope.items.push({

                team: $scope.item.team,

                name: $scope.item.name

            });

        };

        $scope.editorEnabled = false;

        $scope.enableEditor = function () {



            $scope.editorEnabled = true;

            $scope.editableTitle = $scope.items;

        };



        $scope.playersToFilter = function () {

            indexedTeams = [];

            return $scope.items;

        }

        $scope.filterTeams = function (player) {

            var teamIsNew = indexedTeams.indexOf(player.team) == -1;

            if (teamIsNew) {

                indexedTeams.push(player.team);

            }

            return teamIsNew;

        }







    });



    app.factory('LoginService', function () {

        var admin = 'admin';

        var pass = 'pass';

        var abc = 'abc';

        var isAuthenticated = false;



        return {

            login: function (username, password, orgid) {

                isAuthenticated = username === admin && password === pass && orgid === abc;

                return isAuthenticated;

            },

            isAuthenticated: function () {

                return isAuthenticated;

            }

        };



    });



})();