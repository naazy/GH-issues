# GH-issues
When a person goes to our url (localhost:8008), they are redirected to github authentication page. This redirects them back to our server endpoint (/issues), activating our handler function loginhHandler. Which serves the authorised user our index.html page.

This then allows the user to enter an issue and title in a form which submits another request to our server. 
We would like to now create a post request from the backend server to Github to create the inputted issue. At this point, we would like help with the following:
  1) how to post the request to github
  2) a quick way to send the title and issue info from our form to our backend

