
const express = require('express'),
    bodyParser = require('body-parser'),
	checker = require("./checker");

const app = express();
app.use(bodyParser.json());


app.set('port', (process.env.PORT || 5000));




// a useless function that returns a fixed object. you can use it, if you want, for testing purposes
app.get('/count',function (req, res) {
    res.json({count: 3})
})

app.post('/check',function (req, res) {
	checker(
		req.body["url"],					//url
		req.body["invocationParameters"],	//invocationParameters
		req.body["expectedResultData"],		//expectedResultData
		req.body["expectedResultStatus"]	//expectedResultStatus
		)
	.then(
		(results) =>
			{
			res.json(results);
			}
		);
	
		
})

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
