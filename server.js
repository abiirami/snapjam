const express = require("express");
const app = express();
const path = require('path');
const BodyParser = require('body-parser')


const fs = require('fs')
//const router = express.Router();

app.use(express.static('public'))
app.use(BodyParser.json({limit: '10mb', extended:true}))

// google 
const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();


app.get("/", (req, res)=>res.render("index.html"))

async function img(face){
	try{
	const [result] = await client.faceDetection(face);
	const faces = result.faceAnnotations;
	console.log('Faces:');
	faces.forEach((face, i) => {
 		console.log(`  Face #${i + 1}:`);
 		console.log(`    Joy: ${face.joyLikelihood}`);
		console.log(`    Anger: ${face.angerLikelihood}`);
  		console.log(`    Sorrow: ${face.sorrowLikelihood}`);
		console.log(`    Surprise: ${face.surpriseLikelihood}`);





		
		if(face.joyLikelihood == "VERY_LIKELY"){
			console.log("face worky")
		} else if(face.angerLikelihood == "VERY_LIKELY"){

		}else if(face.sorrowLikelihood == "VERY_LIKELY"){

		}else if(face.surpriseLikelihood == "VERY_LIKELY"){

		} else if(face.joyLikelihood == "LIKELY"){
			console.log("face worky")
		} else if(face.angerLikelihood == "LIKELY"){

		}else if(face.sorrowLikelihood == "LIKELY"){

		}else if(face.surpriseLikelihood == "LIKELY"){

		} else {
 			console.log(" NOT face worky")
		}







	});	
		} catch(error){
		console.log(error.message)
	}
}

app.post('/testapi', async function (req,res){
	console.log(req.body)

	fs.writeFile('./face.png', req.body.image.split(';base64,').pop(), {encoding: 'base64'}, function(err){
		console.log('File created')
	})
	img('./face.png')
	return res.json({data: req.body.image});
})


//app.use('/', router);
app.listen(process.env.port || 8080)