var color = 'gray';
var len = undefined;

var nodes = new vis.DataSet();
var edges = new vis.DataSet();

var depth = 1;

var c = 0;
var difC = true;

function scraper(search){
  $.post("receiver", {"search": search, "depth": depth});
  setTimeout(function(){
      addNodes(false);
  }, 1000);
  if (difC){
    c += 1;
  }
}

function start(){
  addNodes(true);
}

function clearAll(){
  nodes.clear();
  edges.clear();
}

function wiki(){
  //pointer-events:none;
  var searchBar = document.getElementById('searchBar');
  searchBar.style.display = "none";
  searchBar.style.pointerevents = "none";
  document.getElementById('mynetwork').style.backgroundColor = "#222222";
  clearAll();
  scraper(document.getElementById("submit").value);
  document.getElementById("submit").value = "";
}

function addNodes(plot){
  $.getJSON("/static/graph.json", function( data ){
    //nodes = new vis.DataSet();
    //edges = new vis.DataSet();
    for (var i = 0; i < data.noder.length; i++){
      try{
        nodes.add({id: data.noder[i], label: data.noder[i], group: c});
        console.log("Added: " + data.noder[i]);
      }
      catch(error){
        var x = 5;
      }
    }
    for (var i = 0; i < data.kanter.length; i++){
      try{
        //console.log(edges.include({from: data.kanter[i][0], to: data.kanter[i][1]}));
        if (edges.get(data.kanter[i][0]+data.kanter[i][1]) == null){
          edges.add({from: data.kanter[i][0], to: data.kanter[i][1], id: data.kanter[i][0]+data.kanter[i][1]});
        }
        //console.log(edges.get(1));
        //console.log(edges.include({from: data.kanter[i][0], to: data.kanter[i][1]}));
      }
      catch(error){
        var x = 5;
      }
    }
    if (plot == true){
      graph();
    }
  });
}


function graph(){
  // create a network
  var container = document.getElementById('mynetwork');
  var data = {
      nodes: nodes,
      edges: edges
  };
  var options = {
      nodes: {
          shape: 'dot',
          size: 30,
          font: {
              size: 12,
              color: '#ffffff'
              //color: 'black'
          },
          borderWidth: 2
      },
      edges: {
          width: 2
      }
  };
  network = new vis.Network(container, data, options);
  network.on("click", function (params) {
      params.event = "[original event]";
      scraper(this.getNodeAt(params.pointer.DOM));
      console.log('click event, getNodeAt returns: ' + this.getNodeAt(params.pointer.DOM));
  });
}

start();
