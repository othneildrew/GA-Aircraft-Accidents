$(function() {

  let accidents = new Array();



  init();

  function getXMLData() {
    return $.ajax({
      method: 'GET',
      url: '../assets/data/general-aviation-accidents.xml',
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

          if(investigationType === 'Accident' && country === 'United States' && farDescription === "Part 91: General Aviation") {

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















    function populateList() {

      accidents.map(function(x) {
        $('#accident-list').append('<div class="card accident-card rounded-0 m-3 border-top-0 border-left-0 border-right-0"><div class="card-body"><span class="badge badge-pill badge-danger">' + x.injuries.injury_severity + '</span><p class="mb-0" id="aircraft">' + x.aircraft + '</p><p class="m-0 text-muted" id="location">' + x.location + '</p><small id="accident-date">' + x.accident_date + '</small><!--<a href="#" class="float-right btn btn-dark btn-sm rounded-0">Show</a>--></div></div>');
      });


    }





  function init() {
    getXMLData();

    // Initialize vector map
    let map = $('#map').vectorMap({
      map: 'us_aea',
      backgroundColor: '#448aff',
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
          fill: '#f44336',
          stroke: '#f44336',
          "fill-opacity": 1,
          "stroke-width": 2,
          "stroke-opacity": 1,
          r: 6
        },
        hover: {
          fill: '#d32f2f',
          stroke: '#d32f2f',
          "stroke-width": 2,
          cursor: 'pointer'
        },
        selected: {
          fill: '#b71c1c',
          stroke: '#b71c1c'
        },
        selectedHover: {
        }
      },
      markers: accidents.map(function(x) {
        return { name: x.aircraft + ' (' + x.accident_date + ')', latLng: x.coords }
      }),
      updateSize: true,
      onRegionSelected: function() {
        if(window.localStorage) {
          window.localStorage.setItem(
            'jvectormap-selected-markers',
            JSON.stringify(map.getSelectedRegions())
          );
        }
      }
    });

    populateList();
  }






  function closeDisclaimer() {
    console.log('User agrees to disclaimer.')
    $('#overlay-loader').fadeOut();
  }




  // Event Listeners
  $('#map').on('click', '#continue', function() {
    closeDisclaimer();
  });



});
