I've always enjoyed travelling and exploring new places. Maps have been a way that I've been able to see what somewhere is like without actually visiting. It's a fun way to plan, dream, explor, and get familiar with an area before I'm able to visit in person. As a result, I've had an interest in mapping projects and development. One of the most popular open-source Javascript libraries out there for mapping is [Leaflet](https://leafletjs.com/). Playing around with this library led me to start building my project [My Vacation Map](https://myvacationmap.com), a React-based mapping app that lets you add map points to various places and enter information about places you'd like to see, things to do, etc.

Since the project is created in React, I came across the [React Leaflet](https://react-leaflet.js.org/) project that is taking the Leaflet library and building a set of React components to make the library easy to use in a React project.

With my project, I wanted to have different icons representing the different types of map points that a user can create. Leaflet already supports having different icons on the map as desired but there was no clear example for doing the same in React Leaflet. I did some investigation and found some ways that other people were doing this but aside from some Stack Overflow answers, there wasn't any real helpful example that I could find to do this myself.

After much trial and error, I was able to get the custom points working and decided to go ahead and create a simple example to share with the React Leaflet project team to show others how to do it.

The entire example can be viewed in the [React Leaflet Github Repository](https://github.com/PaulLeCam/react-leaflet/blob/master/example/components/custom-icons.js).

Here's a quick explanation of what's happening.

## Icons

The first part of the process is to create the actual icons.

Each icon is defined as a leaflet Icon component `L.Icon()` and then a variety of parameters are passed to override the defaults for the Icon.

The most obvious parameters are `iconUrl` and `shadowUrl`, which are the paths to the custom icon graphic and shadow graphic, respectively. `iconRetinaUrl` is the path to the graphic to be used for high resolution monitors. In this example, I created an SVG graphic so it'll work fine for both types.

`iconAnchor` and `popupAnchor` are used to determine how the image is positioned relative to the actual point on the map. Depending on the shape and design of your graphic, this might be above or even directly on top of the map point. These are in the x and y axes, respecively.

`popupAnchor` defines the location of where the popup for this point will display relative to the map point itself, assuming one is being used. These are in the x and y axes, respecively.

`iconSize` is the size of the custom icon itself with the first value being width and the second is height.

`shadowSize` and `shadowAnchor` are the same types of information as `iconSize` and `iconAnchor`, but for the shadow.

Here's the full example icon definition:

```javascript
export const pointerIcon = new L.Icon({
  iconUrl: require("../assets/pointerIcon.svg"),
  iconRetinaUrl: require("../assets/pointerIcon.svg"),
  iconAnchor: [5, 55],
  popupAnchor: [10, -44],
  iconSize: [25, 55],
  shadowUrl: "../assets/marker-shadow.png",
  shadowSize: [68, 95],
  shadowAnchor: [20, 92]
});
```

## Map Display

Displaying the custom icons is pretty easy once you get this far. Just like always, the `<Marker/>` component is called but with a new prop that's passed for the icon:

```javascript
<Marker position={position} icon={pointerIcon}>
  // Popup or other information
</Marker>
```

## Webpack Issue

For some reason, Webpack doesn't like to compile the code correctly when using custom icons. This is an issue with Create-React-App and might be for other Webpack setups, but my project is based on Create-React-App, so this is something I had to deal with.

What needs to be done is to remove the default icon from the original Leaflet class (imported here as `L.Icon`) and replace it with a custom icon. In my case, I created my own default point design, though using the default Leaflet point would work just fine, you would have to point to the files yourself here instead of relying on the defaults in the Leaflet package.

To override the defauts and force the use of the custom icons, here's a little snippet that I placed at the top of my component that was housing the React Leaflet `Map` component:

```javascript
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("../assets/starIcon.svg"),
  iconUrl: require("../assets/starIcon.svg"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});
```

## Conclusion

I hope this was helpful to understand a bit more about how to add custom map icons for Leaflet maps in React!
