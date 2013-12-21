// Accounts config
Accounts.loginServiceConfiguration.remove({
  service: "github"
});

Accounts.loginServiceConfiguration.insert({
  service: "github",
  clientId: "5c9b7e93a5830dd3634a",
  secret: "1fd43cfe0e0311e726e239a7a1bec03f8c3c2c89"
});

Accounts.onCreateUser(function(options, user){
  var accessToken = user.services.github.accessToken,
    result,
    profile;
  	
	result = Meteor.http.get("https://api.github.com/user", {
    headers: {"User-Agent": "Meteor/1.0"},
    params: {
      access_token: accessToken
    }
  });
	
  if (result.error) {
    throw error;
  }
  
  profile = _.pick(result.data,
    "login",
    "name",
    "avatar_url",
    "url",
    "company",
    "blog",
    "location",
    "email",
    "bio",
    "html_url");
  
  user.profile = profile;
  
  return user;
});
