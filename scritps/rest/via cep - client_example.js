// Script include

var ViaCEP = Class.create();
ViaCEP.prototype = Object.extendsObject(AbstractAjaxProcessor, {
    getData: function() {
        var cep = this.getParameter("sysparm_cep");

        var r = new sn_ws.RESTMessageV2('Via CEP', 'Default GET');
        r.setStringParameterNoEscape('cep', cep);
        var response = r.execute();

        return JSON.stringify({
            "haveError": response.haveError(),
            "message": response.haveError() ? response.getErrorMessage() : JSON.parse(response.getBody())
        });
    },
    type: 'ViaCEP'
});



// Calogue client scritp
function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading || newValue == '') {
        return;
    }

    var ga = new GlideAjax("global.ViaCEP");
    ga.addParam("sysparm_name", "getData");
    ga.addParam("sysparm_cep", newValue);
    ga.getXMLAnswer(function(data) {
		var result = JSON.parse(data);
		if (result.haveError){
			g_form.addErrorMessage(result.message);
			return;
		}
		g_form.setValue("rua", result.message.logradouro);
        //g_form.addInfoMessage(data + "as");
    });
}