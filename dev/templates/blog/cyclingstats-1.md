
"IMDB" for cycling is a pretty lofty goal, but one that comes to mind when I think of my new project that I'm working on. I call it "CyclingStats" and my goal is to create a site that compiles results from all kinds of worldwide cycling events to give information and insights about races, teams, and racers. I'll admit this is a very daunting goal and far beyond my capabilities, but the goal is to make a site that I can have fun with, reflects my love of professional cycling, and gives me another fun Drupal project to work on.

### Styleguide

The first thing I want to do with it is have a living style guide as I go. I haven't thought too much about which option will be the best one to use, but I've played with [Patternlab](https://patternlab.io/) before and I know there has been work done before to link it with Drupal so that's a good contender.

### Custom Theme

As a front-end developer, I definitely plan on creating a custom theme for this site. It wil be responsive for all different viewport sizes, use modern CSS with the appropriate fallbacks, and look cool (of course).

### Meaningful Data

I don't want this to just be a basic listing of races and results, I want to have added data that would make this site something that people could look at and get more out of than just the basic "who won" kind of insights. I know a lot of that comes with time and working through data and stuff, but it's something that I want to do.

### Clearly Connected Data

Drupal really excels at complex data connections and I plan to exploit this as much as possible. I want results to be something you can click on and go to the rider involved and see all their results, or click on the team and see a list of races they've participated in, or all the racers on that team and their results.

### Interactive Route Maps

One of the other things I really love is mapping. So having the route mapped out in an interactive map format is something I really want to do. I also want to include having some way to export the data to mapping sites like [Garmin Connect](https://connect.garmin.com/), [RideWithGPS](https://ridewithgps.com/), or [Strava](https://www.strava.com/).

### Data Ingest

At some point down the line, I'd really like to automate the data ingest process as much as possible. The initial version of this will probably just be something like a Javascript interface that allows the user to paste in CSV data or JSON that's then ingested using the JSON API but I'd really like to find or build an import module that will allow for various types of importing formats and automatically linking the data. Ideally it would be able to give the user the ability to designate a race and stage, if applicable, then the importing would connect the data ingested with the appropriate racer and team as is goes through the various lines of results.

There are other things I'd like to do, but these are the main ones. There are a lot of things that I need to work through and figure out about how to structure the data and I need to work out the design, but those are parts of the next steps.

If you want to follow along with my progress, you can see the [full list of tagged posts](/tags/cycling-stats/).
