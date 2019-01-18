[React](https://reactjs.org/)

# My Vacation Map

Have you ever been preparing for a trip and found a bunch of cool places to visit, only to not know where to keep that information so that it's easily accessible when you're out and about? _My Vacation Map_ is a custom mapping app that is built on [React](https://reactjs.org/) and using the [Leaflet mapping library](https://leafletjs.com/) to solve this problem.

The app allows the user to add points onto the map with various information that the user would like to keep about that location. These can be personal notes, information from guidebooks, links to a website about that location, or many other possibilities. The user is able to add a category that will determine the icon and color of the map point for easier identification while reviewing their points. The app also is able to use geolocation to find the user's current location and even follow them as they move.

_My Vacation Map_ is built on [Create-React-App](https://github.com/facebook/create-react-app) with [Redux](https://redux.js.org/) for state management, the [React-Leaflet](https://react-leaflet.js.org/) component library for managing the Leaflet mapping, and the [React-Geolocated](https://github.com/no23reason/react-geolocated) component for geolocation. For data managemnet, there is a [Drupal 8](https://www.drupal.org) back-end connected via [REST](https://www.drupal.org/docs/8/api/restful-web-services-api/restful-web-services-api-overview) and [JSON Api](https://www.drupal.org/project/jsonapi) end points as well as the [Simple Oauth](https://www.drupal.org/project/simple_oauth) module for Oauth2 authentication management.

## Live Work In Progress

View the work in progress of this project at: https://rlahoda.github.io/my-vacation-map/

## Known issues/limitations

In general, everything currently displayed works. However, there are some limitations.

- The routing is messed up on the hosted version of this site, I think because of the hosting on Github pages. So if you type in the url /map it will give a 404 error. This works locally as expected and I'm working on a solution for this hosted site.
- There is no form validation so a user can submit a map point with no information without error.
- In the WIP site, the log in and log out functionality is not working. The buttons for both just trigger react-router to switch to the main app or to the login screen.
