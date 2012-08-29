


var TiBridge = function(_args) {
	_args = _args || {};
	
	var API = {
		
		/**
		 * MESSAGES
		 */
		MSG: {
			NAVIGATE: 'NAVIGATE',
			COMM	: 'COMM',
			MAP		: 'MAP',
			SAVE	: 'SAVE',
			
			info : function (object) {
				Ti.API.info('===================================');
				Ti.API.info('=         Ti WebView Bridge       =');
				Ti.API.info('===================================');
				Ti.API.info('EVT: '+ object.type);
				Ti.API.info(JSON.stringify(object.data));
				return;
			}
		},
		
		/**
		 * WebView Bridge Properties
		 * 
		 */
		webview: _args.webview, 	/* Required param for use */
		history: [],
		
		
		
		/**
		 * WebView bridge Methods
		 */
		navigate: function(url) {
			
		}
	};
	
	/**
	 * WebView Bridge Event trapping
	 */
	Ti.App.addEventListener(API.MSG.NAVIGATE, function(e) {
		API.MSG.info(e);
		if(API.webview) {
			API.webview.url = 'html/'+e.data.location;
		}	
	});
	
	Ti.App.addEventListener(API.MSG.SAVE, function(e){
		API.MSG.info(e);
		if(e.data) {
			Ti.App.Properties.setString(e.data.form, JSON.stringify(e.data));
			webView.evalJS('TiBridge.alert("Form '+e.data.form+' data stored succesfully!")');
		}
	});
	
	Ti.App.addEventListener(API.MSG.COMM, function(e){
		API.MSG.info(e);
		if(e.data.msg === 'deviceType')
				webView.evalJS('TiBridge.alert("'+Ti.Platform.osname+'")');
	});
	
	Ti.App.addEventListener(API.MSG.MAP, function(e){
		API.MSG.info(e);
		var mapContainer = Ti.UI.createView({
			height: 400,
	        width: 300,
		});
		
		var mountainView = Titanium.Map.createAnnotation({
	        latitude: e.latitute || 37.390749,
	        longitude: e.longitude || -122.081651,
	        title:"Appcelerator Headquarters",
	        subtitle:'Mountain View, CA',
	        pincolor:Titanium.Map.ANNOTATION_RED,
	        animate:true,
	        leftButton: '../images/appcelerator_small.png',
	        myid:1 // Custom property to uniquely identify this annotation.
	    });
	    
	    var mapview = Titanium.Map.createView({
	        mapType: Titanium.Map.STANDARD_TYPE,
	        region: {latitude:33.74511, longitude:-84.38993, 
	                latitudeDelta:0.01, longitudeDelta:0.01},
	        animate:true,
	        regionFit:true,
	        userLocation:true,
	        annotations:[mountainView],
	        top: 10,
	        height: 390,
	        width: 290,
	        borderColor: '#ececec',
	        borderRadius: 7,
	        borderWidth: 3
	    });
	    mapContainer.add(mapview);
	    
	    var closeButton = Ti.UI.createImageView({
			image: 'images/close-button.png',
			width: Ti.UI.SIZE,
			height: Ti.UI.SIZE,
			top:0,
			right:0,
		});
		closeButton.addEventListener('click', function(e){
			mountainView = null;
			mapview = null;
			
			API.webview.parent.remove(mapContainer);
		});
	    mapContainer.add(closeButton);
	    
	    API.webview.parent.add(mapContainer);
	});
	
	return API;
};

module.exports = TiBridge;





