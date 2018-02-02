var request = require("request");


const fetch = require('node-fetch')

function check(url, invocationParameters,  expectedResultData, expectedResultStatus) {

	//get parameters array
	var arr = Object.keys(invocationParameters);
	//console.log(arr);
	//set request string
	if(arr.length > 0)
		{
		var request_url = url + "?";
		if(arr.length > 1)
			{
			for(var i=0; i<arr.length-1; i++)
				{
				request_url += arr[i] + "=" + invocationParameters[arr[i]] + "&";
				}
			}
		request_url += arr[arr.length-1] + "=" + invocationParameters[arr[arr.length-1]];
		}
	//console.log("Request url: '" + request_url + "'");
	
	//send request
	request.get(
		//options
		{
		url: request_url,
		json: true,
		headers: {"User-Agent": "request"}
		},
		//callback
		(err, res, data) =>
			{
			//if(err) //cit "non state li’ a gestire i casi non validi, basta che processiate correttamente una chiamata in questo formato)"
			//	{}
			
			const checkResult = 
				{ // this is the object you need to set and return
				urlChecked: url,
				resultData: data,
				resultStatus: res.statusCode,
				statusTestPassed: (res.statusCode == expectedResultStatus),
				resultDataAsExpected: compareResults(data, expectedResultData)
				}
			console.log(checkResult);
			}
		);
	
	
    /*const checkResult = { // this is the object you need to set and return
        urlChecked: url,
        resultData: null,
        resultStatus: null,
        statusTestPassed: null,
        resultDataAsExpected: null
    }*/



}


// funzione che confronta due oggetti semplici e verifica se actual contiene tutti gli attributi di expected, e se per
// questi ha gli stessi valori
function compareResults(expected, actual) {
    if (!expected) return true //always ok if there are no expectations
    if (!actual) return false
    for (let e of Object.keys(expected)) {
        if (actual[e]===undefined || expected[e]!=actual[e]  ) return false
    }
    return true
}

module.exports = check