/*
Default ACLs -> Scripted REST External Default
*/
(function process(/*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {

	const payload = request.body.data;

	const requestSchema = {
		person: {
			validation: (input) => typeof input === "string",
			message: "The field person must be a ServiceNow user"
		},
		tag: {
			validation: (input) => input === "SN",
			message: "The field Tag must be 'SN'"
		},
		ranking: {
			validation: (input) => typeof input === "string" && Number(input) >= 0 && Number(input) <= 5,
			message: "The field ranking must be a string between 0 to 5"
		},
	};

	function httpError(msg, statusCode){
		const messages = {
			400: "Invalid fields",
			404: "ServiceNow user not found"
		};

		throw new sn_ws_err.ServiceError()
			.setStatus(statusCode)
			.setMessage(gs.getMessageLang(messages[statusCode], "en"))
			.setDetail(gs.getMessage(msg));
	}

	function validateSchema(payload, requestSchema){
		const errors = [];

		for (const key in requestSchema){
			if (!Object.keys(payload).includes(key)){
				errors.push(`Missing ${key} field`);
			}
		}

		for (const key in payload){
			if (Object.keys(requestSchema).includes(key)){
				if (!requestSchema[key].validation(payload[key])){
					errors.push(requestSchema[key].message);
				}
			}
		}

		if(errors.length > 0){
			httpError(errors.join(". "), 400);
		}
	}

	function getUserEmail(personEmail){
		var userGR = new GlideRecord('sys_user');
		userGR.addQuery('email', personEmail);
		userGR.query();

		if (!userGR.next()){
			httpError(`Person with email ${personEmail} must be a ServiceNow user`, 404);
		}

		return userGR.sys_id;
	}

	function insertFeedback(payload, userSysId){
		new global.GlideRecord('u_person_feedback')
			.insert({
				u_note: payload.ranking
			});
	}

	validateSchema(payload, requestSchema);
	let personSysId = getUserEmail(payload.person);

	response.setBody({
		"msg": `Feedback received`
	});



})(request, response);