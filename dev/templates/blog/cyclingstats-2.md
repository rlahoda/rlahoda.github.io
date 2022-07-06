
The first part of planning this project is to think through the data involved and how I'd like to structure the data.

### A Race

There are a few aspects of the data that I need to think about. The first is to try to determine the different types of data that need to be separated into discrete entities. When thinking about the Tour de France (TdF), the most famous cycling race in the world, there's once immediate entity that comes to mind: the race itself. But a grand tour, like the TdF, has multiple individual stages. A stage is basically the same as a regular race, though, so data-wise, they can be treated as a race but with a "parent race" that is then above the stages.

### Riders

Then there are the individual riders themselves. They make sense as another discrete entity type. These racers have information like names, teams, countries they're from, and other information that helps add to their profile.

### Teams

Those riders are a part of a team, usually, so that's something else to add in there. Teams change names from year-to-year sometimes so each name would be considered a unique entry. However, there needs to be a way to link previous variations of that team so that you can see the different names it's had over the years. Also, riders come and go from the team, even if the team doesn't change names. Initially the site will be focused on race results, but to be "IMDB for cycling" I need to include additional information and data about the rider that will not just be contained in a race result. Thankfully, Drupal will let me extend the content types as I need to add more in down the line, so it'll be fine.

### Other People

Thinking about teams, it would be good to have information about other people involved with the team. What about the directeur sportif or others involved with coaching the teams? Many of these people are former professional riders so it would be good to be able to incorporate any past results in their profile. So it would make sense not to have a "rider" entity and a separate other entity for "non-riders". So I think I'll have just a generic "person" type that will allow for additional information over time.

### Race Results

What about the race results? As I was thinking about this, I knew that I want the results to be data that can be worked with, not just a static text block or table. So I decided that there should be an entity I'm calling "Race Result". This would link the competitor who's result it is, the team of that competitor, the time of the result, any penalty or bonus time, and other important information.

### Other "Races"

That's all good for the Yellow Jersey, or the racer with the lowest overall time, but what about the Polka Dot Jersey, the racer with the most mountain points, or the Green Jersey, the racer with the most sprint points? I've decided that these are all just different kinds of results so I'm going to keep all that information available in the single entity. Essentially, the Polka Dot Jersey competition would be treated as a unique "race" within that stage or competition.

### Content Type Fields

So taking all this into consideration, here's my content types and the various fields that I can think of to include in them:

- Person
  - First name
  - Last name
  - DOB (to calculate age)
  - Country of origin
  - Team
  - First year as a professional (to calculate how many years)
- Race
  - Name
  - Is_multi-stage (bool to flag for the race that contains multiple stages)
  - Is_stage (bool to flag for a stage of a multi stage race)
  - Parent race (for stages to associate the race)
  - Country
  - Region (?)
  - Start Date
  - Is_multi-day (bool to flag for multi day races)
  - Stage Number
  - End Date (only for multi day races)
  - Organizing Body (?) (UCI or ASO or something)
  - Start location (Town/City)
  - End location (Town/City) (not required)
  - Length (for individual stage or total race)
  - Route (GPS line on embedded map)
  - Race type -> taxonomy
- Race Result
  - Competitor
  - Team (of the competitor)
  - Time
  - Placement (1st, 2nd, etc - would be an integer)
  - Penalty time
  - Bonus time
  - Overall Time (for multi day races)
  - KOM Points
  - Points
  - Gap (time between them and 1st place - calculated field)
  - Bib Number
  - Type of result (Overall, KOM, Points, Young, etc) -> taxonomy
- Team - new entity when team names change year-to-year
  - Former names -> association to previous versions of that team

If you have any suggestions or ideas for how these can be improved, feel free to reach out to me through any of my social media or other contact methods that you can find at the bottom of this page!

If you want to follow along with my progress, you can see the [full list of tagged posts](/tags/cycling-stats/).
