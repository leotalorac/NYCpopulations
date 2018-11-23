let map;
let api = "https://data.cityofnewyork.us/resource/rreq-n6zk.json";
let data = [];
let markers = []
let ck = Object.keys(coords)
//get the data
function getData() {
	let response = $.get(api)
		//save the data
		.done(() => {
			response.responseJSON.forEach((v, i, a) => {
				if (ck.includes(v["jurisdiction_name"])) {
					data.push(v);
				}
			});

		});
}
//put the markers
function putMarkers() {
	for (let i = 0; i < ck.length; i++) {
		let center = coords[ck[i]];		
		let marker = new google.maps.Marker({
			map: map,
			draggable: false,
			// animation: google.maps.Animation.DROP,
			position: center,
			icon: {                             
				url: "./information.png"                           
			},
			title: ck[i]
		})
		// To add the marker to the map, call setMap();
		markers.push(marker)
	}
}

//create the map
function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		//center of the map
		center: {
			lat: 40.7142700,
			lng: -74.0059700
		},
		// the zoom
		zoom: 10,
		//remove the ui
		// mapTypeId: google.maps.MapTypeId.ROADMAP,
		// disableDefaultUI: true,
	});
	putMarkers();
}
//zoom the map
function zoomMap(val){
	let newcenter = coords[val]
	map.panTo(newcenter)
	map.setZoom(13)
	resetmarkers()
	for(let i =0;i<markers.length;i++){
		if(markers[i].title == val){
			let center = newcenter;
			let title = markers[i].title;
			markers[i].setMap(null);
			markers[i] = new google.maps.Marker({
				map: map,
				draggable: false,
				animation: google.maps.Animation.BOUNCE,
				position: center,
				icon: {                             
					url: "./information2.png"                           
				},
				title: title
			})
		}
	}
}
// reset markers
function resetmarkers(){
	removemarkers();
	markers.forEach((v) =>{
		v.setMap(map)
		v.setIcon("./information.png")
	});
}
function removemarkers(){
	for(let i =0;i<markers.length;i++){
		markers[i].setMap(null);
	}
}
//show and hide the filters
$('#show-button').click(() => {
	if ($('#map-container').attr("class") != 'col-md-12') {
		$('#map-container').addClass('col-md-12').removeClass('col-md-9');
		$('#info-container').addClass('col-md-0').removeClass('col-md-3');
	} else {
		$('#map-container').addClass('col-md-9').removeClass('col-md-12');
		$('#info-container').addClass('col-md-3').removeClass('col-md-0');
	}
});
//fille the zip codes
function fillselect(){
	let slc = $("#zipselector");
	ck.forEach((v) =>{
		slc.append(new Option(v,v));
	});
	
}

$("#zipselector").change(()=>{
	let valkey = $("#zipselector").find(":selected").val();
	zoomMap(valkey);
	putCatSelec();
});
//main
$(document).ready(() => {
	getData();
	fillselect();
});