# HomeBrewd
## An interactive bar menu for Homebrewers to display whats on tap

**Live Demo at: https://homebrewd.rphall3.com**

### Main features in primary release:
1. Create a Bar Menu
    - make a bar with 1-12 taps
    - load in beers youve made, providing some tasty details about your brews
    - if you have a Brewfather account and want to input your BF API creds, you can import past brew sessions from BF via their API

2. Track your beers
    - any visitor can view your menu, given the URL
    - any visitor can 'drink' your beer, logging the approximate current amount left in the keg
    - add/remove/archive your beers as you wish or when empty
    - get email updates when your beers are low (<25%) and empty to remind you to start brewing/swap kegs out

3. As a user/visitor when logged in:
    - Save other bars to your 'Favorite Bars' list to easily view their menus again
    - Track your beer drinking stats across all the bars you've drank at

### Future Features coming soon (hopefully)
1. Bar Owners:
    - generate a downloadable QR code to post on your bar as a quick link to view your menu
    - recieve suggestions via 'suggestion box'

2. Logged in users:
    - change your liquid volume preferences
    - search for/find (public profile) bars by locations (near me, in a specific city/area)
    - recieve updates from your 'Favorite Bars', such as when a new brew is on tap
    - Rate/review beers youve tried
    - Suggestion box for your Homebrewer friends

# Setup
#### Things to know:
1. This project is build with a DRF backend and React frontend using the brewfather and Gmail APIs
2. The front and back ends are organized separately to allow split server development (for hot reload and debugging) and easy deployment with the current file structure

## Clone repo
~~~
git clone https://github.com/philliphall131/homebrewd
~~~
Setup your virtual environment
~~~
python -m venv venv
source venv/bin/activate
~~~
## Update .env file
Make a .env file (see template in repo)
~~~
cp .env.sample .env
~~~
- Add django secret key
- Set DEBUG=True for local development
- Set the user email you want during development (so all email traffic is routed to one email to debug/develop)
- In "frontend/src/utils" modify each files BASE_URL as follows:
Development:
~~~
const BASE_URL = 'http://localhost:8000/api/'
~~~
Deployment:
~~~
const BASE_URL = '/api/'
~~~

## Add Gmail API credentials
To use email notification features:
- Download your credentials for Gmail API use with .send() scope enabled.
**See https://developers.google.com/gmail/api/ for more info**
- Place the file you download from gmail API in the project root folder and rename as credentials.json
- **If you havent used gmail or google apis, the first time the api is called you will need to set up OAuth. See google docs to accomplish this. I suggest running a test Gmail project in a separate folder and moving the token.json file into this project root folder to enable a more seamless setup experience**
## Finish Setup
- In the "frontend" folder:
~~~
npm install
npm run start
~~~
or to serve the app from django (does not allow for hot reload of react)
~~~
npm run build
~~~
- In the "backend" folder:
~~~
python manage.py migrate
pythong manage.py runserver
~~~




