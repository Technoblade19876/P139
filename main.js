img = "";
state = "";
objects = [];

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
}



function preload(){
    
}

function draw(){
    image(img, 0, 0, 380, 380);
    objectDector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Decting Objects";
    if(state != ""){
        objectDector.detect(img, gotResult);
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Object Detected ";
            document.getElementById("number_of_objects").innerHTML = "Number of Objects Detected are: "+objects.length;

            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x+15, objects[i].y+25);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function modelLoaded(){
    console.log("Model Loaded");
    state = true;
    
}

function gotResult(error , results){
    if(error){
        console.log(error);
    }

    console.log(results)
    objects = results
}