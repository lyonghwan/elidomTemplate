'use strict';

/**
 * @ngdoc function
 * @name core.directive:ngDownload
 * @description
 * #  Directive to trigger an asynchronous-like file download
 */
angular.module('Elidom.Core')
    .directive('ngDownload', function(RestApiService) {

        return {
            restrict: 'A',
            scope: {
                params: '='
            },
            link: function($scope, element, iAttrs) {

                var form,
                    params,
                    paramsLength,
                    url;

                iAttrs.$observe('ngDownload', function() {
                    url = iAttrs.href ? iAttrs.href : iAttrs.ngDownload;
                });

                element.on('click', function(e) {

                    e.stopPropagation();
                    e.preventDefault();
                    url = RestApiService.makeFullUrl(RestApiService.getContextPathUrl(), url);
                    form = angular.element('<form id="ngDownloadForm" style="display:none" method="GET" action="' + url + '"></form>');

                    if (angular.isObject($scope.params)) {

                        params = Object.keys($scope.params),
                            paramsLength = params.length;

                        params.forEach(function(key) {
                            form.append('<input type="hidden" name="' + key + '" value="' + $scope.params[key] + '">');
                        });

                    }

                    var body = angular.element(document).find('body');
                    body.append(form);

                    ngDownloadForm.submit();
                    ngDownloadForm.remove();

                });


            }
        };
    });