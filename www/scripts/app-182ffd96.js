"use strict";angular.module("ElidomTemplate",["ionic","ngCordova","ngResource","ionic-datepicker"]).run(["$ionicPlatform","$rootScope",function(e,t){e.ready(function(){window.cordova&&window.cordova.plugins&&window.cordova.plugins.Keyboard&&cordova.plugins.Keyboard.hideKeyboardAccessoryBar(!0);var e=ionic.Platform.platform();console.log(e),"android"==e&&(t.isDivicePlatform=!0)})}]).config(["$httpProvider","$stateProvider","$urlRouterProvider",function(e,t,n){t.state("app",{url:"/app","abstract":!0,templateUrl:"templates/main.html",controller:"MainController"}).state("app.home",{url:"/home",cache:!0,views:{viewContent:{templateUrl:"templates/views/home.html",controller:"HomeController"}}}).state("app.settings",{url:"/settings",cache:!0,views:{viewContent:{templateUrl:"templates/views/settings.html",controller:"SettingsController"}}}).state("tab.dash",{url:"/dash",views:{"tab-dash":{templateUrl:"templates/views/tab-dash.html",controller:"DashCtrl"}}}),n.otherwise("/app/home")}]),angular.module("ElidomTemplate").constant("API_ENDPOINT",{host:"http://192.168.35.227",port:8080,path:"/elidom",needsAuth:!1}),angular.module("ElidomTemplate").controller("DatePickerCtrl",["$scope","$filter",function(e,t){var n=([new Date(1437719836326),new Date(2015,7,10),new Date("Wednesday, August 12, 2015"),new Date("08-14-2015"),new Date(1439676e6)],new Date);e.inputDate=t("date")(n,"yyyyMMdd"),e.datepickerObjectModal={setButtonType:"button-assertive",modalHeaderColor:"bar-positive",modalFooterColor:"bar-positive",templateType:"modal",inputDate:n,callback:function(e){o(e)}};var o=function(n){"undefined"==typeof n?console.log("No date selected"):(e.inputDate=t("date")(n,"yyyyMMdd"),console.log("Selected date is : ",n))}}]),angular.module("ElidomTemplate").controller("HomeController",["$scope","ExampleService","ApiService",function(e,t,n){e.myHTML=null,e.from_date={},e.to_date={},e.data_model=new Date,e.fetchRandomText=function(){t.doAsync().then(t.fetchSomethingFromServer).then(function(t){e.myHTML=t.data.text,e.$broadcast("scroll.refreshComplete")},function(t){e.myHTML=t,e.$broadcast("scroll.refreshComplete")})},e.fetchGetTest=function(){var e={params:"hi"};n.get("/dnb/service/user/register.json",e,function(e){console.log(e)})},e.fetchPostTest=function(){var t={userId:"lyonghwan",userNm:"lyonghwan"},o=n.update("/dnb/service/user/register.json",null,t);o.$promise.then(function(t){console.log(t),e.myHTML=t.userNm},function(e){console.log(e)})},e.fetchPutTest=function(){var t={userId:"lyonghwan",userNm:"박용"},o=n.create("/dnb/service/user/register.json",null,t);o.$promise.then(function(t){console.log(t),e.myHTML=t.userNm},function(e){console.log(e)})},e.fetchRandomText(),e.$watch("data_model",function(t,n){t&&console.log(e.DataModel)},!0),e.print=function(){console.log(e.data_model)}}]),angular.module("ElidomTemplate").controller("MainController",["$scope",function(e){}]),angular.module("ElidomTemplate").controller("SettingsController",["$scope",function(e){}]),angular.module("ElidomTemplate").directive("datePicker",function(){return{restrict:"E",scope:{dateModel:"="},controller:["$scope","$filter",function(e,t){var n=([new Date(1437719836326),new Date(2015,7,10),new Date("Wednesday, August 12, 2015"),new Date("08-14-2015"),new Date(1439676e6)],new Date);e.inputDate=t("date")(n,"yyyyMMdd"),e.datepickerObjectModal={setButtonType:"button-assertive",modalHeaderColor:"bar-positive",modalFooterColor:"bar-positive",templateType:"modal",inputDate:n,callback:function(e){o(e)}};var o=function(n){"undefined"==typeof n?console.log("No date selected"):e.dateModel=t("date")(n,"yyyyMMdd")}}],link:function(e,t,n){e.$watch("dateModel",function(t,n){console.log(e.dateModel)},!0)},templateUrl:"templates/directive/date-picker.html"}}),angular.module("ElidomTemplate").factory("ApiService",["$window","$http","$ionicPopup","$resource","API_ENDPOINT",function(e,t,n,o,i){var a=i,r=a.port?a.host+":"+a.port+a.path:a.host+a.path;return a.needsAuth&&(t.defaults.headers.common.Authorization="Basic "+e.btoa(a.username+":"+a.password)),{getEndpoint:function(){return r},isSignedIn:function(e){var t=this;if("undefined"==typeof login)e({status:401});else{var n=o(t.getEndpoint()+"/users/"+login.id+".json",{});n.get(null,function(t,n){e(t,n)},function(t){e(null,t)})}},handleError:function(e){e&&e.status&&401==e.status?this.goToSingin():this.showErrorMessage(e)},showErrorMessage:function(e){0==status?n.alert({title:"Error",template:"서버이상이 발생되었습니다. 서버상태를 확인 해주세요."}):n.alert({title:"Error",template:"Status : "+e.status+", "+e.statusText})},search:function(e,t,n){var i=this;t&&(t.page=t.page?t.page:1,t.start=t.start?t.start:0,t.limit=t.limit?t.limit:20);var a=o(i.getEndpoint()+e,t);a.get(function(e,o){e.start=t.start,e.limit=t.limit,e.page=Math.ceil(e.start/e.limit)+1,e.total_page=e.total>t.limit?Math.ceil(e.total/t.limit):1,n(e)},function(e){i.handleError(e)})},list:function(e,t,n){var i=this,a=o(i.getEndpoint()+e,t);a.get(function(e,t){n(e.items)},function(e){i.handleError(e)})},get:function(e,t,n,i){var a=this,r=o(a.getEndpoint()+e,t);r.get(function(e,t){n(e)},function(e){i?i(e):a.handleError(e)})},checkUnique:function(e,t,n,o,i){var a=this;a.get(a.getEndpoint()+e,t,function(e,t){o(e)},function(e){404==e.status?n(e):i(e)})},getByName:function(e,t,n){var i=this,a=o(i.getEndpoint()+e,t);a.get(function(e,t){n(e)},function(e){i.handleError(e)})},create:function(e,t,n){var i=this,a=o(i.getEndpoint()+e,t,{create:{method:"POST",headers:{"Content-Type":"application/json;charset=UTF-8"},transformRequest:function(e,t){return t=angular.extend({},t,{Accept:"*/*","Content-Type":"application/json;charset=UTF-8"}),angular.toJson(n)}}});return a.create()},update:function(e,t,n){var i=this,a=o(i.getEndpoint()+e,t,{update:{method:"PUT",headers:{"Content-Type":"application/json;charset=UTF-8"},transformRequest:function(e,t){return t=angular.extend({},t,{Accept:"*/*","Content-Type":"application/json;charset=UTF-8"}),angular.toJson(n)}}});return a.update()},updateMultiple:function(e,t,n){var i=this,a=o(i.getEndpoint()+e,t,{updateMultiple:{method:"POST",headers:{Accept:"*/*","Content-Type":"application/json;charset=UTF-8"},transformRequest:function(e,t){return t=angular.extend({},t,{Accept:"*/*","Content-Type":"application/json;charset=UTF-8"}),angular.toJson({multiple_data:n})}}});return a.updateMultiple()},"delete":function(e,t){var n=this,i=o(n.getEndpoint()+e,{},{"delete":{method:"DELETE",headers:{Accept:"*/*","Content-Type":"application/json;charset=UTF-8"}}});return i["delete"]()}}}]),angular.module("ElidomTemplate").factory("ExampleService",["$http","$timeout","$q","ApiService",function(e,t,n,o){var i=function(){var e=n.defer(),t="error";return e.resolve(t),console.log(t),e.promise},a=function(){var t={headers:{}};t.headers["Content-Type"]="application/json;charset=UTF-8";var n=o.getEndpoint()+"/dnb/service/user/register.json",i={param:"Hello"},a=e.get(n,i,t).success(function(e,t,n,o){console.log(e)}).error(function(e,t,n,o){console.log(t,o)});return a},r=function(){var t={headers:{"Content-Type":"application/json;charset=UTF-8"}},n=o.getEndpoint()+"/dnb/service/user/register.json",i={userId:"mw1106.kim",userNm:"Kim minwoo"},a=e.post(n,i,t).success(function(e,t,n,o){console.log(e)}).error(function(e,t,n,o){console.log("headers : "+n),console.log("config : "+o),console.log("data: "+e),console.log("status:"+t)});return a},s=function(){var t={headers:{}};t.headers["Content-Type"]="application/json;charset=UTF-8";var n=o.getEndpoint()+"/dnb/service/user/register.json",i={param:"Hello"},a=e.put(n,i,t).success(function(e,t,n,o){console.log(e)}).error(function(e,t,n,o){console.log(t,o)});return a},l=function(){var t=e({url:"http://hipsterjesus.com/api",params:{paras:2},method:"GET"}).success(function(e){}).error(function(e){console.log("an error occured",e)});return t};return{doAsync:i,fetchSomethingFromServer:l,fetchGetServer:a,fetchPostServer:r,fetchPutServer:s}}]),angular.module("ElidomTemplate").factory("_",["$window",function(e){return e._}]),angular.module("ElidomTemplate").run(["$templateCache",function(e){e.put("templates/main.html",'<ion-side-menus>\n\n    <!-- Left menu -->\n    <ion-side-menu side="left" class="side-menu">\n\n        <ion-header-bar align-title="center" class="bar-positive">\n            <h1 class="title">Side Menu</h1>\n        </ion-header-bar>\n\n        <ion-content class="has-header">\n            <div class="list">\n                <a menu-close class="item item-icon-left" ui-sref-active="active" ui-sref="app.home">\n                    <i class="icon ion-home"></i>\n                    Home\n                </a>\n                <a menu-close class="item item-icon-left" ui-sref-active="active" ui-sref="app.settings">\n                    <i class="icon ion-settings"></i>\n                    Settings\n                </a>\n            </div>\n        </ion-content>\n    </ion-side-menu>\n\n    <!-- Center content -->\n    <ion-side-menu-content>\n\n        <ion-nav-view name="viewContent">\n\n        </ion-nav-view>\n\n    </ion-side-menu-content>\n\n    <!-- tab menu -->\n    <ion-tabs class="tabs-icon-top tabs-color-active-positive">\n\n      \n      <ion-tab title="Status" icon-off="ion-ios-pulse" icon-on="ion-ios-pulse-strong" href="#">\n         <ion-nav-view name="tab-dash"></ion-nav-view>\n      </ion-tab>\n\n      \n      <ion-tab title="Chats" icon-off="ion-ios-chatboxes-outline" icon-on="ion-ios-chatboxes" href="#">\n        <!-- <ion-nav-view name="tab-chats"></ion-nav-view> -->\n      </ion-tab>\n\n      \n      <ion-tab title="Account" icon-off="ion-ios-gear-outline" icon-on="ion-ios-gear" href="#">\n        <!-- <ion-nav-view name="tab-account"></ion-nav-view> -->\n      </ion-tab>\n\n    </ion-tabs>\n</ion-side-menus>\n'),e.put("templates/directive/date-picker.html",'<div class="scroll" style="transform: translate3d(0px, 0px, 0px) scale(1);">\n	<input ng-if="!isDivicePlatform" ionic-datepicker input-obj="datepickerObjectModal" ng-model="dateModel"/>\n	<input ng-if="isDivicePlatform" type="date"  ng-model="dateModel"/>\n</div>'),e.put("templates/views/home.html",'<ion-view>\n    <ion-header-bar align-title="center" class="bar-positive">\n    <button class="button button-icon icon ion-navicon" menu-toggle="left"></button>\n        <h1 class="title">ElidomTemplate</h1>\n    </ion-header-bar>\n\n    <ion-content>\n        <ion-refresher\n            pulling-text="Pull to refresh..."\n            on-refresh="fetchRandomText()">\n        </ion-refresher>\n\n        <div class="loader" ng-if="!myHTML">\n            <ion-spinner></ion-spinner>\n        </div>\n\n        <div class="content" ng-bind-html="myHTML">\n        </div>\n\n        <button ng-click="fetchGetTest()">Call Get API</button>\n        <button ng-click="fetchPostTest()">Call Post API</button>\n        <button ng-click="fetchPutTest()">Call Put API</button>\n        <button ng-click="print()">Print Model</button>\n\n        <date-picker date-model= "data_model"/>\n\n    </ion-content>\n\n</ion-view>\n'),e.put("templates/views/settings.html",'<ion-view>\n    <ion-header-bar align-title="center" class="bar-positive">\n    <button class="button button-icon icon ion-navicon" menu-toggle="left"></button>\n        <h1 class="title">Settings</h1>\n    </ion-header-bar>\n\n    <ion-content>\n        <div class="list">\n\n            <!-- connect toggles to controller using ng-model -->\n\n            <ion-toggle>\n                <span class="settings-item__text">\n                    Allow Push Notifications\n                </span>\n            </ion-toggle>\n\n            <ion-toggle>\n                <span class="settings-item__text">\n                    Allow cookies\n                </span>\n            </ion-toggle>\n\n        </div>\n    </ion-content>\n\n</ion-view>\n'),e.put("templates/views/tab-dash.html",'<ion-view view-title="Dashboard">\n  <ion-content class="padding">\n    <div class="list card">\n      <div class="item item-divider">Recent Updates</div>\n      <div class="item item-body">\n        <div>\n          There is a fire in <b>sector 3</b>\n        </div>\n      </div>\n    </div>\n    <div class="list card">\n      <div class="item item-divider">Health</div>\n      <div class="item item-body">\n        <div>\n          You ate an apple today!\n        </div>\n      </div>\n    </div>\n    <div class="list card">\n      <div class="item item-divider">Upcoming</div>\n      <div class="item item-body">\n        <div>\n          You have <b>29</b> meetings on your calendar tomorrow.\n        </div>\n      </div>\n    </div>\n  </ion-content>\n</ion-view>\n')}]);