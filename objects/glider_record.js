var liveprofileGR = new GlideRecord('live_profile');
liveprofileGR.addQuery('document', current.u_user.sys_id);
liveprofileGR.query();
if (liveprofileGR.next()){
    current.u_user.photo = current.u_avatar;
}