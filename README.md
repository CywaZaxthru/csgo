# Goal 

Website where user puts in a Steam ID and Counter-Strike related statistics of that account are displayed

# API Keys

Put your own inside a .env file in the same directory as APIhandler.js.

Faceit_API_KEY = {your Key}

Steam_API_KEY = {your Key}

# Code Documentation:

src: React development files

public/index.html: React standard file

src/index.js: Standard React file

App.js: Standard React file, loading Header, and Main

Header.js: Simple React file for Header

Main.js: React file for Main, Holds API response in state, Loads Form, Databox if API response exists or Error if in ERROR state

Form.js: React file for Form element and controlled Input, Submitting calls Backend and sets Main.js' state to API response, if API response is an error it sets ERROR state 

Databox.js: Iterates over all available API results and creates a DataTable for each API, passes that APIs response as props to DataTable

DataTable.js: goes through different API calls' reponses and loads desired Data, and Elo.js

Elo.js: loads Elo and skill level image

Error.js: loads Error messages

styles.css: Simple CSS FIle, Whole website is in a box div, Main, Form and div containing Databox are Flexboxes

index.js: Entry Point for Server, Routing Requests

APIhandler.js: Calls APIs by calling APIcallers which then call specific endpoints, returns data in array where each element stands for an API result which is an array of results of API calls to that API.

build: React Frontend Application packed by Webpack

# APIs:

Faceit: https://developers.faceit.com/docs/tools/data-api

Steam Iuser: https://partner.steamgames.com/doc/webapi/ISteamUser