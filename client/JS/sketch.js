
var recordedText = "";

//Web socket functionality 
start("ws://127.0.0.1:8000/");
function start(websocketServerLocation) {

  ws = new WebSocket(websocketServerLocation);

  ws.onopen = function() {
    console.log("open");
  };

  ws.onmessage = function (evt) {
    console.log("message received");
    createComic(evt.data);
  };

  ws.onclose = function() {
    console.log("closed");
  };

  ws.onerror = function(err) {
    console.log(err);
  };
}

var recorder = new p5.SpeechRec();
recorder.continuous = true; // do continuous recognition 

function parseResult() {
  console.log("parsing");
  recordedText += recorder.resultString + ". ";
    //if (recordedText.length > 100) {
      console.log("sending");
    //ws.send(recordedText);
    ws.send(recorder.resultString);
    //recordedText = "";
  //}
}
var comicStrip = [];
function createComic(data)
{
  console.log(JSON.parse(data));
  var jsonData = JSON.parse(data);
  var framesArray = jsonData["frames"];
  
  framesArray.forEach(function(panelData){
         var act = panelData["action"];
         var subs = panelData["subjects"];
         var predis = panelData["predicates"];
         //var relates = panelData["relationships"];
         var emoColor = panelData["color"];
         var set = panelData["setting_preposition"];
         var subjectArray = [];
         var predArray = [];
         var relationsArray = [];
         var actionPanel = {};
        subs.forEach(function(currentSubject)
        {
               if(currentSubject["subjectType"] == "agent")
               {
                if(currentSubject["agentType"] == "HUMAN")
                {
                    subjectArray.push(new Agent.Human(emoColor,currentSubject["gender"]));
                }
                else
                {
                   subjectArray.push(new Agent.NonHuman(emoColor,currentSubject["gender"]));
                }
               }
        });
         predis.forEach(function(currentSubject)
        {
               if(currentSubject["predicateType"] == "agent")
               {
                if(currentSubject["agentType"] == "HUMAN")
                {
                    predArray.push(new Agent.Human(emoColor,currentSubject["gender"]));
                }
                else
                {
                   predArray.push(new Agent.NonHuman(emoColor,currentSubject["gender"]));
                }
               }
        });
/*
       relates.forEach(function(rel){
            var pr = rel["primary_agent"];
            var sec = rel["secondary_agent"];
            var primaryA = {};
            var secondaryA = {};
            
                if(pr["agentType"] == "HUMAN")
                {
                    primaryA = new Agent.Human(emoColor,pr["gender"]);
                }
                else
                {
                   primaryA = new Agent.NonHuman(emoColor,pr["gender"]);
                }
                if(sec["agentType"] == "HUMAN")
                {
                    secondaryA = new Agent.Human(emoColor,sec["gender"]);
                }
                else
                {
                   secondaryA = new Agent.NonHuman(emoColor,sec["gender"]);
                }
               relationsArray.push(new Relation(rel["type"],rel["intimacy"],rel["positivity"],primaryA,secondaryA));

       });
*/
       actionPanel = new Comic.Action(subjectArray,predArray,act,emoColor,{},set);
       comicStrip.push(actionPanel);
  });
}

var G;
var t = 0;
var P = [];
var Q = [];

var comic = new Comic.Holder(comicStrip);

function preload()
{
  recorder.onResult = parseResult;
recorder.start();
  createCanvas(1200,800);
 // background('#DAA45E');
 background('#DAA45E');
  G = new pv.pt(width/2,height/2);
P = pv.drawSpiral1(G);
 Q = pv.drawSpiral2(G);

}
function setup()
{
  
// pv.spiral1(G,20,12.5);
// pv.spiral2(G,12,16);

//pv.questionMarkInverted(G);

  
}

function draw()
{
   comic.display(P,Q,G);
  // pv.show(G);
  // pv.show(pv.spiral(G,t));
  // t+=0.5;
 

 //pv.circleSpaceBetweenTwoArcs(G);
 
 //  for(var i = 1 ; i < P.length ; i++)
   // line(P[i-1].x,P[i-1].y,P[i].x,P[i].y);

}




/*


function setup() {
 //recorder.onResult = parseResult;
// recorder.start();
 createCanvas(2000, 800);
  


}*/



/*
var testAgent = new Agent.Human("green","FEMALE");
var testAgent2 = new Agent.Human("blue","MALE");
var r = new Relation("dominant",1,2,[testAgent],[testAgent2]);

var p1 = new Comic.Action([testAgent2],[testAgent2],"think-about","blue",r,"on");
//subjects,predicates , action,emotionColor,relation,setting ,bgColor,name
var p2 = new Comic.Action([testAgent2],[testAgent2],"move-body-part","blue",r,"from");
var strip = new Comic.ComicStrip([p1,p2]);
var strip2 = new Comic.ComicStrip([p1,p2]);
var comic = new Comic.Holder([strip,strip2]);
var testColor = "red";

function setup()
{
  createCanvas(400,400);
}

function draw()
{
  
  background(255);

  comic.display();
  
}

*/
/*
//TESTING and animating the FERMAT'S SPIRAL FOR HOLDING THE COMIC STRIPS
var G;
var t = 0;
var P = [];
var Q = [];
var testAgent = new Agent.Human("green","FEMALE");
var testAgent2 = new Agent.Human("blue","MALE");
var r = new Relation("dominant",1,-2,[testAgent],[testAgent2]);

var p1 = new Comic.Action([testAgent],[testAgent2],"expel","blue",r,"from");
//subjects,predicates , action,emotionColor,relation,setting ,bgColor,name
var p2 = new Comic.Action([testAgent2],[testAgent],"expel","blue",r,"in");
var comic = new Comic.Holder([p1,p2,p2,p2]);
function preload()
{
  createCanvas(1200,800);
 // background('#DAA45E');
 background('#DAA45E');
  G = new pv.pt(width/2,height/2);
P = pv.drawSpiral1(G);
 Q = pv.drawSpiral2(G);

}
function setup()
{
  
// pv.spiral1(G,20,12.5);
// pv.spiral2(G,12,16);

//pv.questionMarkInverted(G);

  
}

function draw()
{
   comic.display(P,Q,G);
  // pv.show(G);
  // pv.show(pv.spiral(G,t));
  // t+=0.5;
 

 //pv.circleSpaceBetweenTwoArcs(G);
 
 //  for(var i = 1 ; i < P.length ; i++)
   // line(P[i-1].x,P[i-1].y,P[i].x,P[i].y);

}





    */