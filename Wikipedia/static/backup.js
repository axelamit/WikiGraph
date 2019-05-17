var color = 'gray';
var len = undefined;

var nodes = [];
var edges = [];

function scraper(search){
  $.post("receiver", {"myData": search});
  setTimeout(function(){
      start()
  }, 1000);
}

function start(){
  addNodes();
}

function reset(){
  $.getJSON("/static/graph.json", function( data ){
    nodes = [];
    edges = [];
    for (var i = 0; i < data.noder.length; i++){
      nodes.push({id: data.noder[i], label: data.noder[i], group: 0});
    }
    for (var i = 0; i < data.kanter.length; i++){
      edges.push({from: data.kanter[i][0], to: data.kanter[i][1]});
    }
    network.redraw();
  });
}

function addNodes(plot){
  $.getJSON("/static/graph.json", function( data ){
    nodes = [];
    edges = [];
    for (var i = 0; i < data.noder.length; i++){
      nodes.push({id: data.noder[i], label: data.noder[i], group: 0});
    }
    for (var i = 0; i < data.kanter.length; i++){
      edges.push({from: data.kanter[i][0], to: data.kanter[i][1]});
    }
    graph();
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
