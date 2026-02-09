# Notes

# Initial thoughts

- Started looking at [Salable task](./salable-.md).
- 1.1 Objectives:
  - Build a functioning Weather app using the Open Weather API
  - Search for a 5-day weather forecast of a specific city and display the results.
  - Display more details about the weather forecast of one of the days returned on the search when clicking on it
- 1.2 Prototype:
  - The main page displays a header and two search fields with a button to perform the search.
    - app
      - / (search screen)
      - /forecast/page (5-day list)
      - /forecast/[day]/page (on click day details)
      - /api/forecast/route (server route to call OpenWeather)
    - components/
      - SearchForm
      - ForecastCard
    - lib/
      - openWeather (fetch + mapping)
      - format (date/temp formatting)
    - type/
    - weather
  - The user is meant to type the name of a city in the input box and click the button.
  - After clicking on "Get Weather" the next page is displayed with the 5-day forecast
  - When clicking on one of the days presented, a detailed forecast for that day is displayed
- 1.3 Resource Open Weather app
  - free api but can't use endpoint https://api.openweathermap.org/data/2.5/forecast/daily as it is not part of the free tier.
  - I'll have to ask a question if I can use the https://api.openweathermap.org/data/2.5/forecast 5-day/3 hour
  - Does not work without API key, getting a 401 Unauthorized

## Using Claude

Prompt used to start:

Role:

- You are a senior software engineer helping design a new piece of production code.
- Expert in NextJS

Context:

- Language: TypeScript
- Using NextJS
- It's a take home technical test
- I want it production ready code

Task:

1. [Salable task](./salable-readme.md)
2. Identify assumptions and constraints.
3. Enumerate edge cases and failure modes.
4. Propose a high-level approach (no code).

Output format:

- Bullet points under clear headings
- No code
- Explicitly call out uncertainty

The prompt above gives a plan without any code.

Gives you:

- Assumptions
- Constraints
- Edge Cases & Failure Modes
- High-Level Approach
- Production concerns

From the result of the prompt. I start applying changes on how I want to do it (more prompts, testing, debugging... etc). Keep the design plan into context and I want to do it step by step.

- First I want a scaffold of NextJS with hello world, add vitest for testing and create test, add prettier, then run test, lint and format to verify.
- Create navbar and search form components. For Search do not add any functionality yet. We need a persistent navbar across pages with the app title "My Weather App" and a search form, plus a standalone search form on the home page body. Both search forms reuse the same component.
- The search form UI exists but has no functionality. We need to wire it up to the Open Weather free-tier /forecast API (3-hour intervals, 5 days) so we can search a city and see a 5-day forecast list. The API key must stay server-side.
- Show just the 5-day forecast list.
- Using https://openweathermap.org/img/wn/<code>@2x.png for the icons.
- We want each day to be clickable, navigating to /forecast/{city}/{date} which shows the detail for that day. The Open Weather data already has this groupByDay groups the intervals. We need to preserve them and expose them on a detail page.

## TODO list

Just a list of todos, or nice things to have.

- Add pre-commit hooks to run test, lint and formating. Maybe use Husky.
- Add End-to-End tests.
- Add Redux or other state management frameworks. 
- Add state persistance on refresh with same to better manage API limits
- Add better custom error handling, maybe a common component.
- Add a common component for the loading.
- Add more tests, currently testing only happy paths
- If there is no limit in open weather api, can do a range of forcast and paginate them
- Refactor fetching open where api
