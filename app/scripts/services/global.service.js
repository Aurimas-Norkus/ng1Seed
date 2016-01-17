'use strict';

angular
  .module('appCore')
  .service('Global', function($filter, $location, $q, $http, $templateCache, $compile) {
	var that = this;

   	//-------------------------------------------------------------
	/**
	 * saves data to session storage
	 * @param {object} data
	 */
	this.setSavedData = function(data) {
		if (!data)
			data = this.savedData;
		var stringData = $filter('json')(data);
		sessionStorage.setItem('savedData', stringData);
	};

   	//-------------------------------------------------------------
	/**
	 * gets saved data from session storage
	 * @return {object}
	 */
	this.getSavedData = function() {
		var data = sessionStorage.getItem('savedData');
		if (data)
			this.savedData = JSON.parse(data);
		return this.savedData;
	};

   	//-------------------------------------------------------------
	/**
	 * extends and saves session storage data
	 * @param  {object} data
	 * @return {object}
	 */
	this.extendSavedData = function(data) {
		var existing = that.getSavedData();

		for (var i in data)
			if (typeof existing[i] == 'object' && !angular.isArray(existing[i]))
				angular.extend(existing[i], data[i]);
			else
				existing[i] = data[i];
		that.setSavedData(existing);
		return existing;
	};

   	//-------------------------------------------------------------
	/**
	 * clear all saved data
	 */
	this.clearData = function() {
		sessionStorage.clear();
		that.savedData = {};
		that.pageContents = {};
	};

   	//-------------------------------------------------------------
	/**
	 * redirect to urel and scroll to top
	 * @param  {string} url
	 */
	this.redirect = function(url) {
		$location.path(url);
		window.scrollTo(0, 0);
	};

	//---------------------------------------------------------------

	this.validate = {};
	this.pageContents = {};
	this.savedData = {};

	//-------------------------------------------------------------
	this.data = {};

	//-------------------------------------------------------------
	//	Get only values from visible templates
	//-------------------------------------------------------------
	this.getDataValues = function(name, data) {
		var result;

		if (!data)
			data = this.getDataByName(name);
		if (!data)
			return false;

		for(var i in data) {
			if (typeof data[i] == 'object' && i[0] == '|') {
				if (!result)
					result = {};

				result[i.substring(1)] = data[i].value;

				var child = this.getDataValues(false, data[i]);
				if (child)
					result[i.substring(1)] = child;
			}
		}

		return result;
	}

	//-------------------------------------------------------------
	this.getDataByName = function(name) {
		if (!name)
			return this.data;

		var path = name.split('.');
		var data = this.data;
		for (var i=0; path[i]; i++) {
			if (data['|'+path[i]])
				data = data['|'+path[i]];
			else
				return false;
		}
		return data;
	}

	//-------------------------------------------------------------
	this.setDataValue = function(name, value) {

		var data = this.getDataByName(name);
		if (data)
			data.value = value;
	};

	//-------------------------------------------------------------
	//	cache and compile templates
	//-------------------------------------------------------------
	this.tpls = {};
	this.compiledTpl = function(tpl, debugMode) {
		var q = $q.defer();
		var that = this;
		if (that.tpls[templateUrl])
			q.resolve(that.tpls[templateUrl]);
		else {
			var templateUrl = 'views/'+tpl+'.html';
	      	$http.get(templateUrl, {cache: $templateCache}).then( function(response) {
				var debug = '<div class="debug-tpl" debug="data">'+tpl+'</div>';
				if (that.debug !== true || debugMode === false)
					debug = '';

	            var compiled = $compile(debug+response.data);
	            that.tpls[templateUrl] = compiled;
	            q.resolve(compiled);
	      	});
		}

		return q.promise;
	}
	//-------------------------------------------------------------

	//-------------------------------------------------------------
	//	debug mode on/off via local storage
	//-------------------------------------------------------------
	var debugMode = localStorage.getItem('debugMode');
	this.debug = (debugMode == 'on') ? true:false;


	//-------------------------------------------------------------
	//	additional functions
	//-------------------------------------------------------------
	//	Convert date
	//-------------------------------------------------------------
	this.convertDate = function(dateString, format) {
		var date = new Date(dateString);
		var formatted = {
			YY: date.getFullYear(),
			mm: (date.getMonth()+1),
			dd: date.getDate(),
			Mf: date.getMonthNameShort(),
			MF: date.getMonthName()
		}

		var nrEnding = {1:'st', 2:'nd', 3:'rd', 21:'st', 22:'nd', 23:'rd', 31:'st'};

		formatted.MM = (formatted.mm < 10) ? '0'+formatted.mm:formatted.mm;
		formatted.DD = (formatted.dd < 10) ? '0'+formatted.dd:formatted.dd;
		formatted.df = (nrEnding[formatted.dd]) ? formatted.dd.toString()+nrEnding[formatted.dd]:formatted.dd+'th';

		if (typeof format == 'string') {
			for (var i in formatted) {
				format = format.replace(i, formatted[i]);
			}
			return format;
		} else
			return formatted.YY+'-'+formatted.MM+'-'+formatted.DD;
	}

	//-------------------------------------------------------------
	//	find age
	//-------------------------------------------------------------
   	this.yearDiff = function(dateString) {
   		var dateThen = new Date(dateString);
   		var dateNow = new Date();
   		var years = dateNow.getFullYear()-dateThen.getFullYear();
   		var month = dateNow.getMonth()-dateThen.getMonth();
   		var day = dateNow.getDate()-dateThen.getDate();

   		if (day < 0)
   			month--
   		if (month < 0)
   			years--
   		return years;
   	}

	//-------------------------------------------------------------
	//	total
	//-------------------------------------------------------------
   	this.total = function(values) {
   		var data = this.getDataValues(values);
   		var result = 0;
   		if (data)
   			for (var i in data)
   				if (typeof data[i] == 'number')
   					result += data[i];
   		return result;
   	};
});
