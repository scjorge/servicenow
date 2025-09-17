/*
condition -> (!current.u_avartar.nil() && !current.u_user.nil())
*/

(() => {
    if (!current.u_user || !current.u_avatar){
        return;
    }

    function saveImage(avatarGR, userGR){
        var gsa = new GlideSysAttachment();
        var attachSysId = gsa.writeContentStream(
            userGR,
            avatarGR.file_name,
            avatarGR.content_type,
            gsa.getContentStream(avatarGR.sys_id)
        );

        var liveprofileGR = new GlideRecord('live_profile');
        liveprofileGR.addQuery('document', userGR.sys_id);
        liveprofileGR.query();
        if (liveprofileGR.next()){
            liveprofileGR.photo = attachSysId;
            liveprofileGR.update();
            GlideCacheManager.flush("user_avatar_cache");
        }
    }

    var avatarGR = new GlideRecord('sys_attachment');
    avatarGR.get(current.u_avatar);

    var userGR = new GlideRecord('sys_user');
    userGR.get(current.u_user.sys_id);

    saveImage(avatarGR, userGR);

    action.setRedirectURL(current);
})();


// Alternative

var liveprofileGR = new GlideRecord('live_profile');
liveprofileGR.addQuery('document', current.u_user.sys_id);
liveprofileGR.query();
if (liveprofileGR.next()){
    current.u_user.photo = current.u_avatar;
    current.u_user.update();
    liveprofileGR.photo = current.u_avatar;
    liveprofileGR.update();
    GlideCacheManager.flush("user_avatar_cache");
}
action.setRedirectURL(current);
