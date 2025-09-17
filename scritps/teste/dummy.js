function getData() {
    var r = new sn_ws.RESTMessageV2('Dummy', 'Default GET');
    var response = r.execute();
    if (response.haveError()) {
        gs.error(response.getErrorMessage());
    }

    result = []
    users = JSON.parse(response.getBody()).users;
    users.forEach((user, index) => {
        result.push({
            u_first_name: user.firstName,
            u_last_name: user.lastName,
            u_maiden_name: user.maidenName,
			u_id: user.id
        });
    });
	return result;
}


function saveRecords(){
	users = getData();
	users.forEach(user =>{
		gr.info(user.u_first_name)
		var gr = new GlideRecord('u_dummy_user')
		gr.addQuery('u_id', user.id);
		gr.query();
		if (!gr.next()){
			gs.info(user)
			gr.insert(user);
		}else{
			gr.setValue('u_first_name', user.firstName);
			gr.setValue('u_last_name', user.lastName);
			gr.setValue('u_maiden_name', user.maidenName);
			gr.update();
		}	
	});
}



saveRecords()