
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
 * Events
 */
Ti.App.addEventListener('fromwebview', function(e){
	Ti.API.info('WEBVIEW_EVENT:fromwebview '+e.msg);
	
	switch(e.msg){
		case 'page2':
			webView.url = 'html/page2.html';
		break;
		case 'page1':
			webView.url = 'html/page1.html';
		break;
		case 'showMap':
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
		
		case "callAlert":
			webView.evalJS('callAlert("Hi There!!")');
		break;
		
	}
});
