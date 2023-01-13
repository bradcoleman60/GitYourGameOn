function tmEvents(){
//Brad Coleman
var apiKey ='nPYUXzYriSK7f0xcD6RYhwFUMGiFgMgr'
//Troy Johnson
//Daniele Bensan

var baseUrl = 'https://app.ticketmaster.com'
var page = '2'
var size = '20'
var test = 'page=${page}&size=${size}'

    var requestUrl = `${baseUrl}/discovery/v2/events.json?apikey=${apiKey}`
    fetch(requestUrl)
    .then ((response) => {
        return response.json()

    })
    .then ((data) =>{
        console.log(data)

    })
}
tmEvents();

//================= BALL DONT LIE API ============================//

var nbaTeams = {
    LAL: ['237', '472', '117'],
    GSW: ['115','443', '185'],
    PHX: ['57', '367', '22'],
    LAC: ['274', '172','467'],
    DAL: ['132', '486', '38017679'],
    PLR: ['278', '419', '349'],
    DEN: ['246', '335', '375'],
    UTA: ['297', '100', '413'],
    MEM: ['666786', '231', '3'],
    SAC: ['161', '30', '38017688'],
    NOP: ['666969','303','455'],
    MIN: ['3547238','176','447'],
    HOU: ['17895966','38017684',' 666849'],
    SAS: ['666682','373','3547274'],
    OKC: ['175','17896065','666541'],
    BOS: ['434','70','219'],
    BKN: ['140','228','417'],
    MIL: ['15','315','214'],
    NYK: ['73','387','399'],
    CLE: ['666581','285','322'],
    CHI: ['268','125','27'],
    PHI: ['192','145','3547254'],
    MIA: ['79','666633','4'],
    TOR: ['416','17896055','458'],
    WAS: ['378','37','265'],
    ATL: ['490','101','334'],
    CHA: ['3547239','204','403'],
    IND: ['3547245','452','210'],
    DET: ['17896075','54','482'],
    ORL: ['28','38017683','165']
  }

// var seasonFrom = "2022";
// var seasonTo = "2022";
// var seasonStr = `?seasons[]=${seasonFrom}&seasons[]=${seasonTo}`;
// var perPage = "100";
// var perPageStr = `?per_page=${perPage}`;

var dataType = ["players", "stats", "teams", "season_averages"]

//fetch player stats
function bdlApi(playerId) { 
  var baseUrl = "https://www.balldontlie.io/api/v1/";
  // var requestUrl = `${baseUrl}${dataType[type]}?page=${pageNum}${seasonStr}${perPageStr}`;
  // var requestUrl = `${baseUrl}${dataType[type]}${perPageStr}&page=${pageNum}&search=${player}`
  var requestUrl = `${baseUrl}${dataType[3]}?player_ids[]=${playerId}`

  fetch(requestUrl)
    .then((response) => {
      return response.json();
    })
    .then((stats) => {
      console.log(stats);
    });
}

function getTeamStats(inputTeam) {
  for (var i=0; i<3; i++) {
  var id = nbaTeams[inputTeam][i];
  bdlApi(id);
}}



getTeamStats('GSW');

