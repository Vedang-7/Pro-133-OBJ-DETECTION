status="";  
objects="";
function preload(){
    img=loadImage("Computer.jpg");
}
function setup() {
    canvas = createCanvas(540, 320);
    canvas.center();
    object_detector= ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML="Status:Detecting Objects";
}
function modelLoaded(){
    console.log("model loaded");
    status=true;
    object_detector.detect(img, gotResult);
}
function gotResult(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objects=results;
    }
}
function back(){
    window.location="index.html"
}
function draw(){
    image(img, 0, 0, 540, 320);
    if(status!=""){
     for(i=0; i<objects.length; i++){
         document.getElementById("status").innerHTML="Status: Object Detected";
         fill("red");
         percent=floor(objects[i].confidence*100);
         text(objects[i].label+" "+percent+"%", objects[i].x, objects[i].y);
         noFill();
         stroke("red");
         rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
     }    
    }
}