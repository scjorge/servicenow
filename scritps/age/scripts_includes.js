var UserUtils = Class.create();
UserUtils.prototype = Object.extendsObject(AbstractAjaxProcessor, {
    type: 'UserUtils',

	calculateAge: function() {
		var birthday = this.getParameter("sysparm_birthdate");

		var userBirthdate = new Date(birthday + "T00:00:00");
		var currentDate = new Date();

		var age = currentDate.getFullYear() - userBirthdate.getFullYear();
		var mouthDiff = currentDate.getMouth() - userBirthdate.getMouth();

		if (mouthDiff < 0 || mouthDiff === 0 && currentDate.getDate() < userBirthdate.getDate()){
			age --;
		}

		if (age < 0 ){
			return false;
		}

		return String(age);
	},
	updateAge: function() {
		var table = this.getParameter("sysparm_table");
		var sys_id = this.getParameter("sysparm_sys_id");
		var age = this.getParameter("sysparm_age");
		var birthdate = this.getParameter("sysparm_birthdate");
		
		var gr = new GlideRecord(table);
		if (gr.get(sys_id)){
			gr.u_age = Number(age);
			gr.u_birthdate = birthdate;
			gr.update();
		}
	}
});