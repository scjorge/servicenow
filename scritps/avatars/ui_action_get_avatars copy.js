function getSVGImage(){
    const style = current.u_type;
    const seed = Math.random().toString(36).substring(2);
    const url = `http://api.dicebear.com/9.x/${style}/svg?seed=${seed}`;

    const request = new GlideHTTPRequest(url);
    const response = request.get();

    if (!response || response.haveError() || response.getStatusCode() !== 200){
        let error = `Get Avatars | Failed to connect api ${url}`;
        if (response){
            error += ` | ${response.getErrorMessage()}`;
        }
        throw error;
    }

    return {
        name: seed,
        image: response.getBody(),
        contentType: response.getHeader('Content-Type')
    };
}

function saveImage(imageName, imageContent, contentType){
    var attachment = new GlideSysAttachment();
    var fileName = `avatar_${imageName}.svg`;
    var attachSysId = attachment.write(current, fileName, contentType, imageContent);
    return attachSysId;
}

try {
    let result = getSVGImage();
    if (result){
        const attachSysId = saveImage(result.name, result.image, result.contentType);
        current.u_avatar = attachSysId;
        current.update();
    }
} catch (error){
    gs.error(error);
}

action.setRedirectURL(current);
