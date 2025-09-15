function onChange(control, oldValue, newValue, isLoading) {
	if (isLoading || newValue == '') {
		return;
	}

	if(!(Number.isInteger(Number(newValue)) && Number(newValue) > 0)){
		g_form.addInfoMessage("Por favor selecione um número inteiro positivo");
		g_form.setValue("texto", null);
		return;
	}

	var ga = new GlideAjax('global.FillOutPaycheckUtils');
	ga.addParam("sysparm_name", 'getExtensiveFormatNumber');
	ga.addParam("sysparm_number", newValue);
	ga.getXMLAnswer(resultString => {
		var result = JSON.parse(resultString);
		var status = result.status;
		var text = result.msg;

		var statusHandler = {
			'error': function() {
				g_form.addErrorMessage("Desculpe, tivemos um problema interno");
				g_form.addErrorMessage(text);
				g_form.setValue("texto", null);
			},
			'success': function() {
				g_form.setValue("texto", text);
			}
		}

		statusHandler[status]();
	})
}
