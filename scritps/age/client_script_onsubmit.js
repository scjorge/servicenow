function onChange(control, oldValue, newValue, isLoading, isTemplate) {
	if (isLoading || newValue === '') {
		return;
	}

    var ga = new GlideAjax("global.UserUtils");
	ga.addParam("sysparm_name", "calculateAge");
	ga.addParam("sysparm_birthdate", newValue);
	ga.getXMLAnswer( age => {
		if(age === 'false'){
			g_form.addInfoMessage("Por favor selecione uma data válida");
			g_form.setValue("u_age", null);
			return;
		}
		g_form.setValue("u_age", age);
	});   
}