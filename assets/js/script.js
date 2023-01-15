async function getLocation() {
  var coordinates = {};
  var city = getCity();
  var apikey = "e5e80f690a1de46cd1c48d028667801f";
  var requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}&units=imperial`;

  await fetch(requestUrl)
    .then((response) => {
      return response.json();
    })
    .then(async function (data) {
      coordinates = await data.city.coord;
      console.log(coordinates);
    });

  return coordinates;
}

function getCity() {
  return "dallas";
}

//_embedded.events[0].name -- home vs away
// home icon
//_embedded.events[0]._embedded.attraces[0].url -- away icon
//_embedded.events[0]._embedded.attractions[1].images[1].url -- diff size away icon (goes til [9])

async function tmBasketball(userSelection) {
  var tmObj = {
    requestUrl: `https://app.ticketmaster.com`,
    apiKey: [`9XshdGRWAPA44uov6ogAAGLaYkru76D3`, `apikey=${this[0]}`],
    subGenreId: ["KZazBEonSMnZfZ7vFJA", `subGenreId=${this[0]}`],
    searchBy: ["events", `/discovery/v2/${this[0]}/`],
    keyword: ["", `keyword=${this[0]}`],
    startDateTime: ["", `&startDateTime=${this[0]}`],
    endDateTime: ["", `endDateTime=${this[0]}`],
  };

  userSelection.forEach(() => {
    Object.entries(el).forEach(([key, value]) => {
      tmObj[key][0] = value;
      tmObj.requestUrl.concat(tmObj[key][1]);
    });
  });

  var { lat, lon } = await tmObj.setLocation();
  console.log(lat, lon);
  //console.log(tmObj.setLocation())
  // &subGrenreId=${subGenreId}&pages=1000&per_page=100
  //var reqUrl = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=9XshdGRWAPA44uov6ogAAGLaYkru76D3`;
  fetch(tmObj.reqUrl())
    .then((response) => {
      return response.json();
    })
    .then((data) => {});
}

tmBasketball();

//Create elements on page
var landingSect = document.createElement("div");
var searchSect = document.createElement("div");
var resultSect = document.createElement("div");
//Set attributes to the containers
// landingSect.setAttribute("")
// searchSect.setAttribute("")
// resultSect.setAttribute("")
// append containers
document.body.appendChild(landingSect);
document.body.appendChild(searchSect);
document.body.appendChild(resultSect);

// function popTeamSelect() { //function iterate through 'nbaTeams'  + create checkboxes (discuss dropdown option)

// }

function popGameListing() {
  //function to show TM results w/ dates and headline
  var gameList = createElement("div");
  for (var i = 0; i < 5; i++) {
    // Look at ticketmaster data and append the titles

    var selectBtn = document.createElement("button");
    selectBtn.setAttribute("");
  }
}
//================= BALL DONT LIE API ============================//

var nbaTeams = {
  LAL: ["237", "472", "117"],
  GSW: ["115", "443", "185"],
  PHX: ["57", "367", "22"],
  LAC: ["274", "172", "467"],
  DAL: ["132", "486", "38017679"],
  PLR: ["278", "419", "349"],
  DEN: ["246", "335", "375"],
  UTA: ["297", "100", "413"],
  MEM: ["666786", "231", "3"],
  SAC: ["161", "30", "38017688"],
  NOP: ["666969", "303", "455"],
  MIN: ["3547238", "176", "447"],
  HOU: ["17895966", "38017684", " 666849"],
  SAS: ["666682", "373", "3547274"],
  OKC: ["175", "17896065", "666541"],
  BOS: ["434", "70", "219"],
  BKN: ["140", "228", "417"],
  MIL: ["15", "315", "214"],
  NYK: ["73", "387", "399"],
  CLE: ["666581", "285", "322"],
  CHI: ["268", "125", "27"],
  PHI: ["192", "145", "3547254"],
  MIA: ["79", "666633", "4"],
  TOR: ["416", "17896055", "458"],
  WAS: ["378", "37", "265"],
  ATL: ["490", "101", "334"],
  CHA: ["3547239", "204", "403"],
  IND: ["3547245", "452", "210"],
  DET: ["17896075", "54", "482"],
  ORL: ["28", "38017683", "165"],
};

// var seasonFrom = "2022";
// var seasonTo = "2022";
// var seasonStr = `?seasons[]=${seasonFrom}&seasons[]=${seasonTo}`;
// var perPage = "100";
// var perPageStr = `?per_page=${perPage}`;

var dataType = ["players", "stats", "teams", "season_averages"];

console.log(dataType[3])


//fetch player stats
function bdlApi(type,playerId) {
  var baseUrl = "https://www.balldontlie.io/api/v1/";
  // var requestUrl = `${baseUrl}${dataType[type]}?page=${pageNum}${seasonStr}${perPageStr}`;
  // var requestUrl = `${baseUrl}${dataType[type]}${perPageStr}&page=${pageNum}&search=${player}`
  // var requestUrl = `${baseUrl}${dataType[type]}?player_ids[]=${playerId}`;

  var requestUrl = `${baseUrl}${dataType[type]}?player_ids[]=${playerId}`;

  console.log(requestUrl)
  fetch(requestUrl)
    .then((response) => {
      return response.json();
    })
    .then((stats) => {
      // console.log(stats);
      displayPlayerStats(getPlayerStats(stats));
    });
}

function getTeamStats(inputTeam) {
  // for (var i = 0; i < 3; i++) {
  //   var id = nbaTeams[inputTeam][i];
  //   bdlApi(3,id);
  // }
// For each element within the array, call the bdlapi and pass datatype 3 and the element. 
  nbaTeams[inputTeam].forEach((el) => {bdlApi(3,el)})

}

function getPlayerStats(stats) {
  console.log(stats);
  //PTS, REB, AST, FG%
  var pts = stats.data[0].pts.toFixed(1);
  var totReb = (stats.data[0].oreb + stats.data[0].dreb).toFixed(1);
  var ast = stats.data[0].ast.toFixed(1);
  var fgp = (stats.data[0].fg_pct * 100).toFixed(1);

  return {
    PTS: pts,
    REB: totReb,
    AST: ast,
    "FG%": fgp + "%",
  };
}

// //Get names of players in nbaTeam from the bld/teams api
// function getplayerNames(inputTeam) {
//   for (var i = 0; i < 3; i++) {
//     var id = nbaTeams[inputTeam][i];
//     var type = 0
//     bdlApi(0, id);
//   }
// }
// getplayerNames("GSW")


function displayPlayerStats(pStatObj) {
  // console.log(pStatObj);
  //Creating an element
  var pstatsUl = $("<ul>");
  // Append that element to the Div tag with ID = "player-stats-card"
  $("#player-stats-card").append(pstatsUl);
  Object.entries(pStatObj).forEach(([key, value]) => {
    //create element
    var listEl = $("<li>");
    //set
    listEl.text(key + ": " + value);
    //append element
    pstatsUl.append(listEl);
  });
} // test push

/*Create event listener when Select Game button is clicked and pass the home 
team and away team ID's to displayPlayerStats function */

$("#selected-game").click(() => {
  getTeamStats("GSW");
});
