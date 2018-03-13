// JavaScript source code

/*
=============================
Create the DO NOT ENTER sign
=============================
*/

// set variables for Do Not Enter sign
var dne = document.getElementById('DoNotEnter');
var ctx = dne.getContext('2d');

// Draw circle for sign
ctx.beginPath();
ctx.arc(250, 250, 200, 0, 2 * Math.PI);
ctx.fillStyle = 'red';
ctx.fill();

// Write the words on the sign
ctx.font = 'bold 60px Arial';
ctx.fillStyle = 'white';
ctx.fillText('DO NOT', 145, 200);
ctx.fillText('ENTER', 155, 350);

// draw line in middle
ctx.moveTo(100, 250);
ctx.lineTo(400, 250);
ctx.lineWidth = 30;
ctx.strokeStyle = 'white';
ctx.stroke();

/*
=======================
Create the ONE WAY sign
=======================
*/

// set variables for One Way sign
var oneWay = document.getElementById('OneWay');
var ctx1 = oneWay.getContext('2d');
ctx1.lineJoin = 'round';

// draw background and inner stroke for sign
ctx1.fillStyle = 'blue';
ctx1.fillRect(105, 55, 285, 335);
ctx1.strokeStyle = 'blue';
ctx1.lineWidth = 10;
ctx1.strokeRect(95, 45, 305, 355);

// draw the rectangle of the arrow
ctx1.moveTo(250, 150);
ctx1.lineTo(250, 360);
ctx1.lineWidth = 85;
ctx1.strokeStyle = 'white';
ctx1.stroke();

// draw the arrow head of the arrow
ctx1.beginPath();
ctx1.moveTo(250, 85);
ctx1.lineTo(350, 175);
ctx1.lineTo(150, 175);
ctx1.fillStyle = 'white';
ctx1.fill();

// draw "ONE WAY" text at bottom of sign
ctx1.font = 'bold 60px Arial';
ctx1.fillStyle = 'blue';
ctx1.fillText('ONE WAY', 110, 475);
