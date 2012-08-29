
// create base UI tab and root window
//
var win = Titanium.UI.createWindow({  
    title:'Main Window',
    backgroundColor:'#fff'
});

var webView = Ti.UI.createWebView({
	height: Ti.UI.FILL,
	width: Ti.UI.FILL,
	url: 'html/index.html'
})
win.add(webView);

win.open();

/**
 * WebView Bridge
 */
var TiWebBridge = require('libs/tibridge');
new TiWebBridge({webview: webView});

/*
Ti.App.addEventListener('fromwebview', function(e){
	Ti.API.info('WEBVIEW_EVENT:fromwebview '+e.msg);
	
	switch(e.msg){
		case 'NAVIGATE':
			webView.url = "html/"+e.data.location;
		break;
		
		case 'MAP':
			var mapContainer = Ti.UI.createView({
				height: 400,
		        width: 300,
			});
			
			var mountainView = Titanium.Map.createAnnotation({
		        latitude:37.390749,
		        longitude:-122.081651,
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
				
				win.remove(mapContainer);
			});
		    mapContainer.add(closeButton);
		    
		    win.add(mapContainer);
		break;
		
		case "COMM":
			if(e.data.msg === 'deviceType')
				webView.evalJS('TiBridge.alert("'+Ti.Platform.osname+'")');
		break;
		
		case "SAVE":
			if(e.data) {
				Ti.App.Properties.setObect(e.data);
				webView.evalJS('TiBridge.alert("Form '+e.data.form+' data stored succesfully!")');
			}
		break;
		
	}
	
});
*/