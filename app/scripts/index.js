var $ = require('jquery');
var _ = require('underscore');
var Handlebars = require('handlebars');

// var githubtoken = require('./gitapikey.js');

// if (githubtoken !== undefined) {
//   $.ajaxSetup ({
//     headers: {
//       'Authorization': 'token ' + githubtoken.token
//     }
//   });
// }

var repos;
var profileItems;


$.ajax('https://api.github.com/users/tylerchasefranklin').then(grabProfile);
$.ajax('https://api.github.com/users/tylerchasefranklin/repos').then(grabRepos);

function grabRepos(data) {
  repos = data;
  console.log(data);
  displayRepos(repos);
}

function grabProfile(data) {
  profileItems = data;
  console.log(data);
  displayProfile(profileItems);
}

function displayRepos(repoList){

  var source = $('#repo-template').html();
  var repoTemplate = Handlebars.compile(source);

  _.each(repoList, function(repo){
    var $repoHtml = $(repoTemplate(repo));

    $('.repos').append($repoHtml);
  });
}

function displayProfile(){

  var source = $('#profile-template').html();
  var profileTemplate = Handlebars.compile(source);
  var $profileHtml = $(profileTemplate(profileItems));

    $('.profile').append($profileHtml);
}
