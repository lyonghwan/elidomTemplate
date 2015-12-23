'use strict';

/**
 * @ngdoc function
 * @name core.services:DynamicLoadService
 * @description 
 *  # 플러그인 동적 로딩 서비스
 */
angular.module('Elidom.Core')
    .factory('DynamicLoadService', function($rootScope, $q, $ocLazyLoad, ApiService) {

        return {
            /**
             * 플러그 인 파일 동적 로드
             */
            loadFiles : function(filePaths) {
                var deferred = $q.defer();
                $ocLazyLoad.load(filePaths).then(function() {
                        console.log('Loaded plugin files successfully.');
                        deferred.resolve('ok');
                    }, function() {
                        console.log('Failed plugin files loading!');
                        deferred.reject('fail');
                    });
                
                return deferred.promise;
            },

            /**
             * 플러그 인 모듈 동적 로드
             */
            loadModule : function(moduleName, filePaths) {
                var deferred = $q.defer();
                $ocLazyLoad.load({
                        name: moduleName,
                        files: filePaths
                    }).then(function() {
                        console.log('Loaded plugin [' + moduleName + '] successfully.');
                        deferred.resolve('ok');
                    }, function() {
                        console.log('Failed plugin loading : [' + moduleName + ']');
                        deferred.reject('fail');
                    });

                return deferred.promise;
            },

            /**
             * 플러그 인 모듈들을 동적 로드 
             */
            loadPluginModules : function() {
                var me = this;
                var url = '/data/plugins/uiModuleServiceList.json';
                ApiService.list(url, null, 
                    function(dataSet) {
                        var moduleList = dataSet.list;
                        for(var i = 0 ; i < moduleList.length ; i++) {
                            me.loadPluginModule(moduleList[i]);
                        }
                    }, 
                    null, 
                    function(dataSet) {
                        console.log(dataSet);
                    });
            },

            /**
             * 플러그 인 모듈 동적 로드 
             */
            loadPluginModule : function(url) {
                var me = this;
                ApiService.get(url, null, function(moduleInfo) {
                    if(moduleInfo.files) {
                        me.loadModule(moduleInfo.name, moduleInfo.files);
                    }
                });
            }
        };
    });