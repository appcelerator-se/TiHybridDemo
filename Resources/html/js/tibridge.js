
var TiBridge = {
	
	comm: function(o){
		
	},
	
	image: function(i){
		return '<img alt="" src="data:image/png;base64,'+i+' />';
	}
};

/**
 * Events
 */
window.onload = function(e){
	TiBridge.comm({pageReady: true});
}