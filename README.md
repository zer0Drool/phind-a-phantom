# Phind a Phantom

[View Project](https://github.com/facebook/create-react-app)

## Overview
The project allows you to select different phantoms to view.
These have been generated using Stable Diffusion and the depth maps were made using MiDaS.
You can choose whether the parallax effect applied to the phantom is based upon the position of the mouse or rotation of the camera.
You can also adjust the intensty of the effect.
Or hit the rantom buttom and everything will be randomly picked for you.

## Technologies
* Amplify
* React
* Three.js
* React Three Fiber
* React Three Drei
* GSAP

## Improvements
In hindsight perhaps landscapes would have been a better way to fully utilise the use of depth maps rather than trying to create objects but I liked the ghost idea.
I would've liked to try improving the depth maps myself as the generated ones often didn't create as much change in depth as I would've liked.
Rather than linking the parallax movement to the mouse or camera it might be interesting to animate it so that the ghosts appear to be moving/floating on their own.
The interface is very basic and while personally I like default inputs, I wouldn't leave them like that for client projects.