# Kyleschrockcomedy.com

This is the source code for kyleschrockcomedy.com.<br> &copy; 2026 Kyle Schrock. All rights reserved.

## App structure
This app uses Next.js as it's a simple SPA. Each page has a folder under /app with a tsx file. When a branch is merged to main, AWS Amplify automatically builds and deploys it to the domain. The app uses AWS lambda to handle email function calls and SES to deliver the emails. 
