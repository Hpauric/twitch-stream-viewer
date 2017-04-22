// Functions

/* global $ */

'use strict';

var channelLink;

function getProfilePicture(userName, imageId) {

  $.ajax({
    type: 'GET',
    url: 'https://api.twitch.tv/kraken/users/' +
      userName + '?',
    headers: {
      'Client-ID': '29wzlb5l6xa9y0bczcuwz9qyvkl491'
    },
    success: function(data) {
      $('#' + imageId).attr("src", data.logo);
      $('#' + userName + '-header').text(data.display_name);
      console.log("success");
      console.log(data);
    }
  });
}

function loadUserDetails(userName) {

  $.ajax({
    type: 'GET',
    url: 'https://api.twitch.tv/kraken/channels/' +
      userName + '?',
    headers: {
      'Client-ID': '29wzlb5l6xa9y0bczcuwz9qyvkl491'
    },
    success: function(data) {
      $('#video-banner').attr("src", data.video_banner);
      $('#profile-banner').attr("src", data.profile_banner);
      $('#followers').text(data.followers);
      $('#game').text(data.game);
      $('#status').text(data.status);
      channelLink = data.url;
    }
  });

  if ($('#' + userName + '-led').hasClass('led-green')) {
    $('#active-badge').html('<span class="label label-success">Active</span>');
  } else {
    $('#active-badge').html('<span class="label label-danger">Not active</span>');
  }
  loadUserLiveStream(userName);
}

// Check if User does not exist and updates screen accordingly if not
// Otherwise returns true

function checkIfUserAvailableScreen(userName) {
  if ($('#' + userName + '-status-container').hasClass('panel-default')) {
    $('#grey-box').show();
    $('#video-banner').hide();
    $('#video-display').hide();
    $('#stream-preview').hide();
    $('#views').hide();
    $('#profile-banner').hide();
    $('#followers').hide();
    $('#game').hide();
    $('#status').hide();
    $('#visit-channel').hide();
    return false;
  } else return true;
}

function showScreenElements() {
  $('#video-banner').show();
  $('#video-display').show();
  $('#stream-preview').show();
  $('#views').show();
  $('#profile-banner').show();
  $('#followers').show();
  $('#game').show();
  $('#status').show();
  $('#visit-channel').show();
}

function loadUserLiveStream(userName) {
  $('#username-display').text(userName);
  if (checkIfUserAvailableScreen(userName)) {
    showScreenElements();

    if ($('#' + userName + '-led').hasClass('led-green')) {
      var url = 'http://player.twitch.tv/?autoplay=false&channel=' + userName;
      var streamUrl = 'https://api.twitch.tv/kraken/streams/' + userName;
      $('iframe').attr('src', url);
      $('#video-banner').css('display', 'none');
      $('#grey-box').hide();
      $('#video-display').css('display', 'block');

      $.ajax({
        type: 'GET',
        url: streamURL,
        headers: {
          'Client-ID': '29wzlb5l6xa9y0bczcuwz9qyvkl491'
        },
        success: function(data) {
          $('#stream-preview').attr('src', data.stream.preview.medium);
          $('#views').html('<h5 id="views">Viewers: ' + data.stream.viewers + '</h5>');
        }
      });
    } else {
      $('#grey-box').hide();
      $('#video-banner').css('display', 'block');
      $('#video-display').css('display', 'none');
      $('#stream-preview').css('display', 'none');
      $('#views').html('<h5 id="views"></h5>');
    }
  }
}

function getAllProfilePictures() {
  getProfilePicture('freecodecamp', 'fcc-logo');
  getProfilePicture('kyente', 'kyente-logo');
  getProfilePicture('monstercat', 'monstercat-logo');
  getProfilePicture('giantwaffle', 'giantwaffle-logo');
}

getAllProfilePictures();

function checkIfActive(userName) {
  var elementSelector = '#' + userName + '-status-container';
  var htmlTextGreenLed = '<div id="' + userName + '-led"class="led-green pull-left"></div>';
  var htmlTextRedLed = '<div id="' + userName + '-led" class="led-red pull-left"></div>';
  var streamHtml = 'https://api.twitch.tv/kraken/streams/' + userName + '?';
  var channelHtml = 'https://api.twitch.tv/kraken/channels/' + userName + '?';

  $.ajax({
    type: 'GET',
    url: channelHtml,
    headers: {
      'Client-ID': '29wzlb5l6xa9y0bczcuwz9qyvkl491'
    },
    success: function(data) {
      if (data.error !== undefined) {
        $(elementSelector).addClass('panel-default');
      } else {
        $.ajax({
          type: 'GET',
          url: streamHtml,
          headers: {
            'Client-ID': '29wzlb5l6xa9y0bczcuwz9qyvkl491'
          },
          success: function(data) {
            if (data.stream !== null) {
              $(elementSelector).append(htmlTextGreenLed);
            } else {
              $(elementSelector).append(htmlTextRedLed);
            }
          }
        });
      }
    }
  });
}

function checkIfProfilesActive() {
  checkIfActive('freecodecamp');
  checkIfActive('monstercat');
  checkIfActive('kyente');
  checkIfActive('giantwaffle');
}

checkIfProfilesActive();

function displayOnlyOnlineUser(userName) {
  if (!($('#' + userName + '-led').hasClass('led-green'))) {
    $('#' + userName + '-status-container').hide();
  }
}

function displayOnlyOfflineUser(userName) {
  if (!($('#' + userName + '-led').hasClass('led-red'))) {
    $('#' + userName + '-status-container').hide();
  }
}

// Click Events

$('#visit-channel').click(function() {
  window.open(channelLink);
});

$('#all-button').click(function() {
  $('.panel').show();
});

$('#online-button').click(function() {
  $('.panel').show();
  displayOnlyOnlineUser('freecodecamp');
  displayOnlyOnlineUser('monstercat');
  displayOnlyOnlineUser('kyente');
  displayOnlyOnlineUser('giantwaffle');
});

$('#offline-button').click(function() {
  $('.panel').show();
  displayOnlyOfflineUser('freecodecamp');
  displayOnlyOfflineUser('monstercat');
  displayOnlyOfflineUser('kyente');
  displayOnlyOfflineUser('giantwaffle');
});

$('#' + 'freecodecamp-status-container').click(function() {
  loadUserDetails('freecodecamp');
});

$('#' + 'monstercat-status-container').click(function() {
  loadUserDetails('monstercat');
});

$('#' + 'kyente-status-container').click(function() {
  loadUserDetails('kyente');
});

$('#' + 'giantwaffle-status-container').click(function() {
  loadUserDetails('giantwaffle');
});
