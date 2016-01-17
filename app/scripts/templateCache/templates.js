angular.module("templates").run(["$templateCache", function($templateCache) {$templateCache.put("views/base.html","<div ng-form=\"form\" ng-class=\"{loading: loading, submitted: submitted, \'debug-mode\':debug}\">\r\nBASE\r\n  <div class=\"disabled-layout\"></div>\r\n  <main class=\"content-main\" role=\"main\">\r\n\r\n    <div class=\"page-hero\" ng-if=\"contents.header\">\r\n      <h2>{{contents.header}}</h2>\r\n      <p ng-repeat=\"text in contents.subTitle\">{{text}}</p>\r\n    </div>\r\n\r\n    <div class=\"inner-content\">\r\n\r\n      <div ng-repeat=\"item in contents.children\" tpl=\"item\"></div>\r\n\r\n    </div>\r\n  </main>\r\n</div>\r\n");
$templateCache.put("views/box.html","<p ng-if=\"data.desc\">{{data.desc}}</p>\n<div class=\"box\">\n	<div class=\"box-header\">\n		<h3>{{data.header}}</h3>\n\n		<button ng-if=\"data.button\" ng-click=\"button(data)\" type=\"button\">{{data.button.label}}</button>		\n	</div>\n	<div class=\"box-body\">\n		<div ng-repeat=\"item in data.children\" tpl=\"item\"></div>\n	</div>\n</div>");
$templateCache.put("views/components/header.html","<header class=\"header-main\" role=\"banner\">\r\n  <div class=\"site-title\">\r\n    <h1>{{data.title}}</h1>\r\n  </div>\r\n</header>\r\n");
$templateCache.put("views/components/navigation.html","<nav class=\"breadcrumb\" role=\"navigation\">\r\n  <ol>\r\n    <li ng-repeat=\"nav in data.nav\" ng-class=\"nav.class\">\r\n      <a ng-href=\"#/{{nav.url}}\" ng-if=\"!nav.disabled()\">\r\n        <span>{{nav.title}}</span>\r\n      </a>\r\n    </li>\r\n  </ol>\r\n</nav>\r\n");}]);