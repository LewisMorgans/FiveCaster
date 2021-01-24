User Story – 5 day weather forecast
Description:
Our users travel between UK cities regularly and want to be able to see what they need to
pack before they travel. Most users check the weather for their destinations for the coming
week using the following service: https://openweathermap.org
API Endpoint: https://openweathermap.org/forecast5
API Key: fe3695759da76e0c9dcaf566634a08ed

As a weather app user
I want to see the weather for Birmingham, London, and Cardiff
So that I can know what clothes to take with me.
Acceptance criteria
Given that I have selected no city 
When I look at the page 
Then I see no weather forecasts
Given that I have selected a city
When I look at the page 
Then I see the weather for the next 5 days for that city
Given that I am looking at a weather prediction
When I look at each prediction 
Then I see the following for that day/location:
 Temperature in Degrees Celsius
 Windspeed
 Weather description
 Weather icon
Given that I have chosen a different city
When I look at the page
Then I see the weather for the newly chosen city only
