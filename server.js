const express = require("express");
const app = express();
const path = require('path');
const BodyParser = require('body-parser')
const http = require("http")


const fs = require('fs')
//const router = express.Router();
str = "";

app.use(express.static('public'))
app.use(BodyParser.json({limit: '10mb', extended:true}))

// google 
const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();


app.get("/login", (req, res)=>res.render("page.html"))
app.get("/", (req, res)=>res.render("index.html"))

//app.get("/login", (req, res)=>res.render("index.html"))


async function img(face){
	try{
	const [result] = await client.faceDetection(face);
	const faces = result.faceAnnotations;
	console.log('Faces:');
	faces.forEach((face, i) => {
 		console.log(`  Face #${i+1}:`);
 		console.log(`    Joy: ${face.joyLikelihood}`);
		console.log(`    Anger: ${face.angerLikelihood}`);
  		console.log(`    Sorrow: ${face.sorrowLikelihood}`);
		console.log(`    Surprise: ${face.surpriseLikelihood}`);

		
		if(face.joyLikelihood == "VERY_LIKELY"){
			//HAPPY
			str = "https://open.spotify.com/track/60nZcImufyMA1MKQY3dcCH?si=1GBzKM8PQbaID8-nxeHYnQ"

		} else if(face.angerLikelihood == "VERY_LIKELY"){
			// EMINEM
			str = "https://open.spotify.com/playlist/37i9dQZF1DX1clOuib1KtQ?si=6BmCBpIKTmCsFD3Hu2EmpQ"

		}else if(face.sorrowLikelihood == "VERY_LIKELY"){
			// EMO 5EVVAAAA
			str = "https://open.spotify.com/playlist/37i9dQZF1DX9wa6XirBPv8?si=SmfB4HB5Qrqa231PgL4l2A"

		}else if(face.surpriseLikelihood == "VERY_LIKELY"){
			//XFILES
			str = "https://open.spotify.com/playlist/4fLLu2cAL42PRGjVG9Nhpp?si=gwdsB5pdTWqctP6D_GsiGg"

		} else if(face.joyLikelihood == "LIKELY"){
			//Bubblegum pop
			str = "https://open.spotify.com/playlist/1ACJg32aFJFEVXHsGrtdui?si=8VgooP9jTWaXcqGTxZuwHQ"

		} else if(face.angerLikelihood == "LIKELY"){
			//SCREAMO
			str = "https://open.spotify.com/playlist/1vsa9yYbQF2pZA1CUsCTmo?si=6RRYzEiyTiC6Fbraym0B6w"

		}else if(face.sorrowLikelihood == "LIKELY"){
			// CAVE TOWN
			str = "https://open.spotify.com/artist/2hR4h1Cao2ueuI7Cx9c7V8?si=zAdcdV__S_KByyfM1iPayg"

		}else if(face.surpriseLikelihood == "LIKELY"){
			//MARIO
			str = "https://open.spotify.com/playlist/7GwHpTcgK2JjwKKUhFDQFj?si=2Bn1bJXuSyWPGgyp9ara-Q"

		} else if(face.joyLikelihood == "POSSIBLE"){
			// ABBA
			str = "https://open.spotify.com/playlist/37i9dQZF1DX3D78h6FPBPC?si=k19pmEK5SD6vnrGxQJd3kA"

		} else if(face.angerLikelihood == "POSSIBLE"){
			//BET ON IT
			str = "https://open.spotify.com/track/4EnwhEyuVrC1CgvSur5YL4?si=aFcDqOZhR1aFTgm5Lbp39g"

		}else if(face.sorrowLikelihood == "POSSIBLE"){
			// ADELE
			str = "https://open.spotify.com/playlist/37i9dQZF1DWZUozJiHy44Y?si=UOdjoNXkTby_udPlZhxnbg"

		}else if(face.surpriseLikelihood == "POSSIBLE"){
			//Pink Panther
			str = "https://open.spotify.com/track/1QPRmX2e3EZWskuOe5QqxM?si=wvSuffnVTUKTXMn7Li5A1Q"
			
		} else if(face.joyLikelihood == "UNLIKELY"){
			//80's Top Hits
			str = "https://open.spotify.com/playlist/2IaPO61eC3T5dTCC9eDAf9?si=adDgoufzTiG3MEEIPZT9jQ"

		} else if(face.angerLikelihood == "UNLIKELY"){
			//LAZY SONG
			str = "https://open.spotify.com/track/1ExfPZEiahqhLyajhybFeS?si=E4eXL7BWRjO-zf6Dsa_9-Q"

		}else if(face.sorrowLikelihood == "UNLIKELY"){
			// R&B
			str = "https://open.spotify.com/playlist/37i9dQZF1DX4SBhb3fqCJd?si=Zwi3pYewSqaxgYE2H9VMnQ"

		}else if(face.surpriseLikelihood == "UNLIKELY"){
			//FEAR AND DELIGHT
			str = "https://open.spotify.com/track/7zyqJJ0QwajaHaPLCqZFXN?si=eZM5-PkvTdO9RSBKq61IDw"
			} else{
			// Rick Rolled
			str = "https://open.spotify.com/album/4Y652sE7URm9a5ONkuL6fS?si=Y21SqrD-QASJYKJzumUvVg"
		}

	});	
		} catch(error){
		console.log(error.message)
	}
	
}

app.post('/testapi', async function (req,res){
	try {
		//console.log(req.body)

	fs.writeFile('./face.png', req.body.image.split(';base64,').pop(), {encoding: 'base64'}, function(err){
		console.log('File created')
	});
	
	// fetch data after checking cases here
	await img('./face.png');
	console.log(str)
	// store it and determine 
	// what to return from the /testapi endpoint 
	// using logic belo
	//link = "https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M?si=HS3qdBtxTqWHkqkrviq3Ow"
	return res.json({spotify: str});

	// more frontendish method
	// return res.json({ spotify: "urlinfo" })
	// { spotify: "www.go....." }
	// client code to redirct
	// window.location.href = data.spotify;
	//return res.redirect("login");
	}
	catch(err){
		console.log(err.message);
	}
});


/**
Resources
/users
/playlists
/recommendations

CRUD => CREATE (POST), READ (GET), UPDATE (PUT), DELETE (DELETE)
**/


//app.use('/', router);
app.listen(8080, () => console.log("8080"))