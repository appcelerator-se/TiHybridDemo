
var TiBridge = {
	
	MSG: {
		NAVIGATE: 'NAVIGATE',
		COMM	: 'COMM',
		MAP		: 'MAP',
		SAVE	: 'SAVE'
	},
	
	comm: function(o){
		Ti.App.fireEvent(this.MSG.COMM, {msg:this.MSG.COMM, data: o});
	},
	
	showMap: function(o){
		Ti.App.fireEvent(this.MSG.MAP, {msg:this.MSG.MAP});
		
	},
	
	image: function(i){
		return '<img alt="" src="data:image/png;base64,'+i+' />';
	},
	
	storeFormData: function(form) {
		
		var f = document.getElementById(form);
		var obj = {};
		obj.form = form;
		obj.fields = {};
		
		for(var i=0; i<f.elements.length; i++){
			obj.fields[f.elements[i].id] = f.elements[i].value;
		}
		
		Ti.App.fireEvent(this.MSG.SAVE, {data: {test:'myvalue'}});
		
	},
	
	navigate: function(url) {
		Ti.App.fireEvent(this.MSG.NAVIGATE, { msg:this.MSG.NAVIGATE, data: { location: url } } );
	},
	
	alert: function(msg) {
		alert(msg);	
	}
};

/**
 * Events
 */
window.onload = function(e){
	TiBridge.comm({pageReady: true});
}



