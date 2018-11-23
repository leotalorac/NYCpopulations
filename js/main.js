let map;
let api = "https://data.cityofnewyork.us/resource/rreq-n6zk.json";
let data = [];
let ck = Object.keys(coords)
//get the data
function getData(){
	let response = $.get(api)
	//save the data
	.done(() =>{
		response.responseJSON.forEach((v,i,a) =>{
			if(ck.includes(v["jurisdiction_name"])){
				data.push(v);
			}
		});
	});
	
	
}

//create the map
function initMap(){
	map = new google.maps.Map(document.getElementById('map'), {
		//center of the map
          center: {lat: 40.7142700, lng: -74.0059700},
          // the zoom
          zoom: 6,
          //remove the ui
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          disableDefaultUI: true,
        });
}
//show and hide the filters
$('#show-button').click(() =>{
	if($('#map-container').attr("class") != 'col-md-12'){
		$('#map-container').addClass('col-md-12').removeClass('col-md-9');
		$('#info-container').addClass('col-md-0').removeClass('col-md-3');
	}else{
		$('#map-container').addClass('col-md-9').removeClass('col-md-12');
		$('#info-container').addClass('col-md-3').removeClass('col-md-0');
	}
});
//main
$(document).ready(() =>{
	getData();
});