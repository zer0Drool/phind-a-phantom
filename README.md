# Phind a Phantom

[View Project](https://master.d1nd5t5z124ma2.amplifyapp.com/)

## Overview
- The project allows you to select different phantoms to view.  
- These have been generated using Stable Diffusion and the depth maps were made using MiDaS.  
- You can choose whether the parallax effect is automated or applied to the phantom based on the position of the mouse or rotation of the camera.  
- You can also adjust the intensty of the effect.  
- Or hit the rantom buttom and everything will be randomly picked for you.

## Technologies
* Amplify
* React
* Three.js
* React Three Fiber
* React Three Drei
* GSAP

## Improvements
- In hindsight perhaps landscapes would have been a better way to fully utilise the use of depth maps rather than trying to create objects but I liked the ghost idea.  
- I would've liked to try improving the depth maps myself as the generated ones often didn't create as much change in depth as I would've liked.  
- The camera movement is very limited due to the geometry that the image is on being a sphere and the ghosts being very large within the image, which was something I struggled with in Stable Diffusion. A way to increase the users ability to move around without breaking the illusion would be good.
- The interface is very basic and while personally I like default inputs, I wouldn't leave them like that for client projects.  
- Optimising the project for mobile.