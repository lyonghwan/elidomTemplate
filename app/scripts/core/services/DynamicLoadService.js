'use strict';

/**
 * @ngdoc function
 * @name core.services:DynamicLoadService
 * @description 
 *  # 플러그인 동적 로딩 서비스
 */
angular.module('Elidom.Core')
    .factory('DynamicLoadService', function($rootScope, $q, $ocLazyLoad, RestApiService) {

        return {

            /**
             * 서비스 URL
             */
            getServiceUrl : function(url) {
                return RestApiService.makeFullUrl(RestApiService.getContextPathUrl(), url); 
            },

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
                var url = '/module/list.json';

                RestApiService.get(url, null, 
                    function(dataSet) {
                        var moduleList = dataSet.items;
                        for(var i = 0 ; i < moduleList.length ; i++) {
                            var module = moduleList[i];
                            var urlToLoad = module.uiManifestUrl;
                            if(urlToLoad && urlToLoad != '' && urlToLoad != 'none' && urlToLoad.length > 10) {
                                me.loadPluginModule(urlToLoad);
                            }
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
                var url = this.getServiceUrl(url);

                RestApiService.get(url, null, function(moduleInfo) {
                    var moduleFileList = moduleInfo.list;
                    for(var i = 0 ; i < moduleFileList.length ; i++) {
                        var moduleFile = moduleFileList[i];
                        me.loadPluginFiles(moduleFile);
                    }
                });
            },

            /**
             * 플러그 인 모듈 동적 로드 
             */
            loadPluginFiles : function(url) {
                var me = this;
                var url = this.getServiceUrl(url);
                
                RestApiService.get(url, null, function(moduleInfo) {
                    if(moduleInfo.files) {
                        var files = [];
                        for(var i = 0 ; i < moduleInfo.files.length ; i++) {
                            var url = me.getServiceUrl(moduleInfo.files[i]);
                            files.push(url);
                        }

                        me.loadModule(moduleInfo.name, files);
                    }
                });
            }
        };
    });