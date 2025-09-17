var r = new sn_ws.RESTMessageV2();
r.setHttpMethod("GET");
r.setEndpoint(url);

var response = r.execute();
var responseBody = response.getBody();
var parsed = JSON.parse(responseBody);
