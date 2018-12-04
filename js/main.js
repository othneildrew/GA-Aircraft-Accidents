$(function() {

  let accidents = new Array();

  function getXMLData() {
    return $.get({
      url: '/assets/data/general-aviation-accidents.xml',
      dataType: 'xml',
      async: false
    }).done(function(data) {
        $(data).find('ROW').each(function() {
          let eventId = $(this).attr('EventId');
          let investigationType = $(this).attr('InvestigationType');
          let accidentNo = $(this).attr('AccidentNumber');
          let eventDate = $(this).attr('EventDate');
          let location = $(this).attr('Location');
          let country = $(this).attr('Country');
          let latitude = $(this).attr('Latitude');
          let longitude = $(this).attr('Longitude');
          let airportCode = $(this).attr('AirportCode');
          let airportName = $(this).attr('AirportName');
          let injurySeverity = $(this).attr('InjurySeverity');
          let aircraftDamage = $(this).attr('AircraftDamange');
          let aircraftCategory = $(this).attr('AirplaneCategory');
          let aircraftNo = $(this).attr('RegistrationNumber');
          let aircraftMake = $(this).attr('Make');
          let aircraftModel = $(this).attr('Model');
          let amateurBuilt = $(this).attr('AmateurBuilt');
          let aircraftEngineCount = $(this).attr('NumberOfEngines');
          let aircraftEngineType = $(this).attr('EngineType');
          let farDescription = $(this).attr('FARDescription');
          let schedule = $(this).attr('Schedule');
          let flightPurpose = $(this).attr('PurposeOfFlight');
          let airCarrier = $(this).attr('AirCarrier');
          let totalFatalInjuries = $(this).attr('TotalFatalInjuries');
          let totalSeriousInjuries = $(this).attr('TotalSeriousInjuries');
          let totalMinorInjuries = $(this).attr('TotalMinorInjuries');
          let totalUninjured = $(this).attr('TotalUninjured');
          let weather = $(this).attr('WeatherCondition');
          let flightPhase = $(this).attr('BroadPhaseOfFlight');
          let reportStatus = $(this).attr('ReportStatus');
          let publicationDate = $(this).attr('PublicationDate');

          if(country === 'United States') {

            accidents.push({
              accident_no: accidentNo,
              accident_date: eventDate,
              aircraft: aircraftNo + ' ' + aircraftMake + ' ' + aircraftModel,
              aircraft_category: aircraftCategory,
              aircraft_engine_type: aircraftEngineType,
              aircraft_engine_count: aircraftEngineCount,
              aircraft_amateur_built: amateurBuilt,
              flight_purpose: flightPurpose,
              far_regulation: farDescription,
              schedule: schedule,
              air_carrier: airCarrier,
              injuries: {
                injury_severity: injurySeverity,
                fatal: totalFatalInjuries,
                serious: totalSeriousInjuries,
                minor: totalMinorInjuries,
                uninjured: totalUninjured
              },
              location: location,
              airport: airportName + airportCode ? ' (' + airportCode + ')' : '',
              weather: weather,
              phase_of_flight: flightPhase,
              coords: [Number(latitude), Number(longitude)],
              report_status: reportStatus,
              report_published: publicationDate
            });
          }
        });
      });
    }




  getXMLData();

  console.log(accidents);


  // Initialize vector map
  $('#map').vectorMap({
    map: 'us_aea',
    backgroundColor: '#1e88e5',
    markerSelectable: true,
    markerSelectableOne: true,
    zoomMax: 6,
    zoomMin: .6,
    zoomAnimate: true,
    regionsSelectable: true,
    markersSelectable: true,
    markersSelectableOne: true,
    markerStyle:{
      initial: {
        fill: '#',
        stroke: '#505050',
        "fill-opacity": 1,
        "stroke-width": 1,
        "stroke-opacity": 1,
        r: 5
      },
      hover: {
        stroke: 'black',
        "stroke-width": 2,
        cursor: 'pointer'
      },
      selected: {
        fill: 'blue'
      },
      selectedHover: {
      }
    },
    markers: accidents.map(function(x) {
      return { name: x.aircraft, latLng: x.coords }
    }),
    updateSize: true
  });























});







/* // Show only United States accidents
if($(this).attr('Country') === 'United States') {
  $('#accident-list').append('<div class="card accident-card rounded-0 m-3"><div class="card-body"><h5 class="card-title" id="aircraft">'+ aircraftNo + '</h5><h6 class="card-subtitle mb-2 text-muted" id="location">'+ location +'</h6><p class="card-text">Some quick example text to build on the card titland make up the bulk of the card\'s content.</p><small class="float-left" id="accident-date">'+ eventDate +'</small><a href="#" class="float-right btn btn-primary">Show</a></div></div>');
}
*/
