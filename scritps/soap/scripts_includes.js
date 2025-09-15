var FillOutPaycheckUtils = Class.create();
FillOutPaycheckUtils.prototype = Object.extendsObject(AbstractAjaxProcessor, {
    type: 'FillOutPaycheckUtils',
	_status: {
		SUCCESS: "success",
		ERROR: "error"
	},
	_makeResult: function(status, msg){
		return JSON.stringify({
			status: status,
			msg: msg
		});
	},
	_dataaccessRequest: function(number){
		var endpoint = "https://www.dataaccess.com/webservicesserver/numberconversion.wso";
		var soapBoby =`
			<?xml version="1.0" encoding="utf-8"?>
			<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
				<soap:Body>
				<NumberToWords xmlns="http://www.dataaccess.com/webservicesserver/">
					<ubiNum>${number}</ubiNum>
				</NumberToWords>
				</soap:Body>
			</soap:Envelope>
		`.trim();

		var timeoutSeconds = 15;

		var soapMessage = new sn_ws.SOAPMessageV2();
		soapMessage.setEndpoint(endpoint);
		soapMessage.setHttpMethod("POST");
		soapMessage.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
		soapMessage.setHttpTimeout(1000 * timeoutSeconds);
		soapMessage.setRequestBody(soapBoby);

		var response = soapMessage.execute();

		var statusCode = response.getStatusCode();
		var responseBody = response.haveError() ? response.getErrorMessage() : response.getBody();

		if (statusCode !== 200){
			throw `STATUS CODE: ${statusCode} | RESPONSE ${responseBody}`;
		}
		
		var xmlDoc = new XMLDocument2();
		xmlDoc.parseXML(responseBody);
		var formatNumber = xmlDoc.getNodeText('//m:NumberToWordsResult');

		return formatNumber;

	},
	getExtensiveFormatNumber: function() {
		var number = this.getParameter("sysparm_number");

		try {
			var formatNumber = this._dataaccessRequest(number);
		} catch (error){
			gs.error(`FillOutPaycheckUtils | Dataaccess | ${error}`);
			return this._makeResult(this._status.ERROR, error);
		}

		return this._makeResult(this._status.SUCCESS, formatNumber);
	}
});