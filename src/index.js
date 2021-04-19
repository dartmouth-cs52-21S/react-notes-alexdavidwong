import $ from 'jquery';
import './style.scss';

$('#main').html('Here we go!');

let count = 0;

setInterval(() => {
  count += 1;
  $('#main').html(`You have been here ${count} seconds.`);
}, 1000);
