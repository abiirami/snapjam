const express = require("express");
const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();

const app = express()
//app.get("/", (req, res)=>res.send("Hello World"))

app.get('/', async function (req,res){
	const [result] = await client.faceDetection('./face.jpg');
	const faces = result.faceAnnotations;
	console.log('Faces:');
	faces.forEach((face, i) => {
 		console.log(`  Face #${i + 1}:`);
 		console.log(`    Joy: ${face.joyLikelihood}`);
		console.log(`    Anger: ${face.angerLikelihood}`);
  		console.log(`    Sorrow: ${face.sorrowLikelihood}`);
		console.log(`    Surprise: ${face.surpriseLikelihood}`);
	});	
	return res.send("testing");
})

app.listen(8080, ()=>console.log("Running on 8080"))