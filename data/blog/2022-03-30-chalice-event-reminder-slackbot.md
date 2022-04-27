---
slug: chalice-event-reminder-slackbot
title: 'Serverless Birthday Slackbot with AWS Chalice and Upstash Redis'
authors: burak
tags: [slackbot, serverless, upstash, redis, python]
---

Sometimes it is the best to create reminders for your annual events so that you don't forget and miss those special dates.

If you and your team/friends are using Slack, then it is a good idea that you automate these reminders via slackbots.

While doing so, if you want your slackbot to be a low maintenance one in that; it may be the best to use serverless technologies for concurrent interactions with the source, also enabling horizontal scalability.

<!-- truncate -->

## What We Are Building
We are building an **Event Reminder Slackbot** using Python, AWS Chalice, AWS Lambda and API Gateway for hosting. 
It will enable the users to:
* Set birthdays for users.
* Set anniversaries for users.
* Set custom events for users or general channel

Once events are set:
* Reminds people that a specific event is coming up, except for the person that is in the center of the event (person that was mentioned while setting the event).
* Posts to the general channel once the event anniversary comes, mentioning the person in the center of the event (or everyone in the channel). 


## Commands

### set

* `/event set birthday <YYYY-MM-DD> <user>`

    Sets the birthday of the user.

    ![set_birthday](/img/blog/event_reminder_slackbot/set_birthday.png)

* `/event set anniversary <YYYY-MM-DD> <user>`
    
    Sets the anniversary for the user, when they started working there.

    ![set_anniversary](/img/blog/event_reminder_slackbot/set_anniversary.png)

* `/event set custom <YYYY-MM-DD> <user> <any kind of message with whitespaces>`
    
    Sets a custom reminder using the message provided.

    ![set_custom](/img/blog/event_reminder_slackbot/set_custom.png)

### get-all

* `/event get-all` :

    Shows all events that are set.

    ![get-all_display](/img/blog/event_reminder_slackbot/get-all_display.png)

* `/event get-all birthday` :

    Shows all birthdays that are set.

    ![get-all_birthday](/img/blog/event_reminder_slackbot/get-all_birthday.png)

* `/event get-all anniversary` :

    Shows all anniversaries that are set.

    ![get-all_anniversary](/img/blog/event_reminder_slackbot/get-all_anniversary.png)

* `/event get-all custom` :

    Shows all custom events that are set.

    ![get-all_custom](/img/blog/event_reminder_slackbot/get-all_custom.png)

### get

* `/event get birthday <user>` :

    Shows the birthday details of the user.

    ![get_birthday_display](/img/blog/event_reminder_slackbot/get_birthday_display.png)

* `/event get anniversary <user>` :

    Shows the anniversary details for the user, when they started working there.

    ![get_anniversary_display](/img/blog/event_reminder_slackbot/get_anniversary_display.png)

* `/event get custom <event_name>(can be found with get-all)` :
    
    Shows the custom event details using the message provided.

    ![get_custom_display](/img/blog/event_reminder_slackbot/get_custom_display.png)

        
### remove

* `/event remove birthday <user>` :

    Removes the birthday of the user.

    ![remove_birthday](/img/blog/event_reminder_slackbot/remove_birthday.png)

* `/event remove anniversary <user>` :

    Removes the anniversary for the user, when they started working there.

    ![remove_anniversary](/img/blog/event_reminder_slackbot/remove_anniversary.png)

* `/event remove custom <event_name>(can be found with get-all)` :

    Removes the custom event using the message provided.

    ![remove_custom](/img/blog/event_reminder_slackbot/remove_custom.png)
    
### Scheduled reminder
* ### Remind General Channel
When the time arrives, slackbot will send reminder message to specified channel.
![general_message](/img/blog/event_reminder_slackbot/general_message.png)

* ### Private Message From Bot
When the time approaches, slackbot will send private reminder messages.
![private_message](/img/blog/event_reminder_slackbot/private_message.png)


So, this tool can be used to keep track of the special dates for team members. This way, relations and inter-communications can be maintained in a healthy manner.

***
## Getting Started

### Prepare the Database
We can create our Redis database on [Upstash Console](https://console.upstash.com). Note the UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN since they will be environment variables for AWS.

### Configuring AWS Credentials
<a id="configure-aws-credentials"></a>

(Taken from [Official Chalice Repo](https://github.com/aws/chalice). You can refer for more info there.)
```
$ mkdir ~/.aws
$ cat >> ~/.aws/config
[default]
aws_access_key_id=YOUR_ACCESS_KEY_HERE
aws_secret_access_key=YOUR_SECRET_ACCESS_KEY
region=YOUR_REGION (such as us-west-2, us-west-1, etc)
```

### Some Conventions
- All `.py` files outside of `app.py` should be placed under `chalicelib` directory, otherwise import statements can cause problems.
- All environment variables should be configured in `config.json` file inside `.chalice` directory.
    - In a json format, with key: "environment_variables"

***
## Project Source Development 
- First of all, since we are using `AWS Chalice`, to install chalice:

    `
    pip install chalice
    `

### Initiate Chalice Project
`
chalice new-project <project_name>
`
![chalice_create](/img/blog/event_reminder_slackbot/chalice_create.png)
Then, cd into the project folder. Project alreadys comes with a template. 

Run:
`
chalice local
`
to see that the project works.

### app.py 
Main file for overall project structure and to handle the Slack requests.
> With this, we create our project structure and endpoints. We decide how to handle events, what to schedule for reminder to work.

```
from chalice import Chalice, Cron, Rate
import os
import random
from datetime import date
from chalicelib.utils import responseToDict, postToChannel, diffWithTodayFromString, allSlackUsers, sendDm, validateRequest, convertToCorrectMention
from chalicelib.upstash import setHandler, getAllHandler, getEvent, getAllKeys, removeEvent

app = Chalice(app_name='birthday-slackbot')
NOTIFY_TIME_LIMIT = int(os.getenv("NOTIFY_TIME_LIMIT"))


# Sample route for get requests.
@app.route('/', methods=["GET"])
def something():
    return {
        "Hello": "World"
        }

# Configuring POST request endpoint.
# Command is parsed and handled/directed to handler
@app.route('/', methods=["POST"], content_types=["application/x-www-form-urlencoded"])
def index():

    # Parse the body for ease of use
    r = responseToDict(app.current_request.raw_body)
    headers = app.current_request.headers

    # Check validity of the request.
    if not validateRequest(headers, r):
        return {"Status": "Validation failed."}


    commandArray = r['text'].split()
    command = commandArray.pop(0)

    try:
        if command == "set":
            setHandler(commandArray)
            return {
            'response_type': "ephemeral",
            'text': "Set the event."
            }

        elif command == "get":
            eventType = commandArray[0]
            eventName = eventType + "-" + commandArray[1]
            resultDict = getEvent(eventName)
            return {
            'response_type': "ephemeral",
            'text': "`{}` Details:\n\n Date: {}\nRemaining: {} days!".format(eventName, resultDict[0], resultDict[1])
            }

        elif command == "get-all":

            stringResult = getAllHandler(commandArray)
            return {
            'response_type': "ephemeral",
            'text': "{}".format(stringResult)
            }

        elif command == "remove":
            eventName = "{}-{}".format(commandArray[0], commandArray[1])
            removeEvent(eventName)
            return {
            'response_type': "ephemeral",
            'text': "Removed the event."
            }
        else:
            return {
            'response_type': "ephemeral",
            'text': "Wrong usage of the command."
            }
    except:
        print("some stuff")
        return {
            'response_type': "ephemeral",
            'text': "Some problem occured. Please check your command."
        }


# Run at 10:00 am (UTC) every day.
@app.schedule(Cron(0, 10, '*', '*', '?', '*'))
def periodicCheck(event):
    allKeys = getAllKeys()
    for key in allKeys:
        handleEvent(key)


# Generic event is parsed and directed to relevant handlers.
def handleEvent(eventName):
    eventSplitted = eventName.split('-')

    eventType = eventSplitted[0]

    # discard @ or ! as a first character
    personName = eventSplitted[1][1:]
    personMention = convertToCorrectMention(personName)

    eventDict = getEvent(eventName)
    remainingDays = eventDict[1]
    totalTime = eventDict[2]


    if eventType == "birthday":
        birthdayHandler(personMention, personName, remainingDays)
    
    elif eventType == "anniversary":
        anniversaryHandler(personMention, personName, remainingDays, totalTime)

    elif eventType == "custom":
        eventMessage = "Not specified"
        if len(eventSplitted) == 3:
            eventMessage = eventSplitted[2]
        customHandler(eventMessage, personMention, personName, remainingDays)

# Handles birthday events.
def birthdayHandler(personMention, personName, remainingDays):
    if remainingDays == 0:
        sendRandomBirthdayToChannel('general', personMention)
    if remainingDays <= NOTIFY_TIME_LIMIT:
        dmEveryoneExcept("{} day(s) until {}'s birthday!".format(remainingDays, personMention), personName)

# Handles anniversary events.
def anniversaryHandler(personMention, personName, remainingDays, totalTime):
    if remainingDays == 0:
        sendRandomAnniversaryToChannel('general', personMention, totalTime)
    if remainingDays <= NOTIFY_TIME_LIMIT:
        dmEveryoneExcept("{} day(s) until {}'s anniversary! It will be {} year(s) since they joined!".format(remainingDays, personMention, totalTime), personName)

# Handles custom events.
def customHandler(eventMessage, personMention, personName, remainingDays):
    if remainingDays == 0:
        postToChannel('general', "`{}` is here {}!".format(eventMessage, personMention))
    elif remainingDays <= NOTIFY_TIME_LIMIT:
        dmEveryoneExcept("{} day(s) until {} `{}`!".format(remainingDays, personMention, eventMessage), personName)


# Sends private message to everyone except for the person given.
def dmEveryoneExcept(message, person):
    usersAndIds = allSlackUsers()
    for user in usersAndIds:
        if user[0] != person:
            sendDm(user[1], message)
        

# Sends randomly chosen birthday message to specified channel.
def sendRandomBirthdayToChannel(channel, personMention):
    messageList = [
        "Happy Birthday {}! Wishing you the best!".format(personMention),
        "Happy Birthday {}! Wishing you a happy age!".format(personMention),
        "Happy Birthday {}! Wishing you a healthy, happy life!".format(personMention),
    ]
    message = random.choice(messageList)
    return postToChannel('general', message)

# Sends randomly chosen anniversary message to specified channel.
def sendRandomAnniversaryToChannel(channel, personMention, totalTime):
    messageList = [
        "Today is the anniversary of {} joining! It has been {} years since they joined!".format(personMention, totalTime - 1),
        "Celebrating the anniversary of {} joining! It has been {} years!".format(personMention, totalTime - 1),
        "Congratulating {} for entering {}(th) year here!".format(personMention, totalTime),
    ]
    message = random.choice(messageList)
    return postToChannel('general', message)


# We want to run our event handlers when the project is deployed/redeployed.
allKeys = getAllKeys()
for key in allKeys:
    handleEvent(key)

```

### chalicelib/utils.py 
Main file for helper functions and abstraction.
> We will mainly use this file for abstractions. So, our source code won't be cluttered and will maintain readability.

```
from urllib import request
import urllib
from urllib.parse import parse_qsl
import json
import os
import hmac
import hashlib
from datetime import date


SLACK_BOT_TOKEN = os.getenv("SLACK_BOT_TOKEN")
SLACK_SIGNING_SECRET = os.getenv("SLACK_SIGNING_SECRET")

# Returns real name of the slack user.
def getRealName(slackUsers, username):
    for user in slackUsers:
        if user[0] == username:
            return user[2]
    return "Nameless"

# Returns all slack users in the workspace.
def allSlackUsers():
    resultDict = sendPostRequest("https://slack.com/api/users.list", SLACK_BOT_TOKEN)
    members = resultDict['members']
    
    userMembers = []
    for member in members:
        if not member['deleted'] and not member['is_bot']:
            userMembers.append([member['name'], member['id'], member['real_name']])

    return userMembers

# Returns the id of the given channel.
def channelNameToId(channelName) :
    resultDict = sendPostRequest("https://slack.com/api/conversations.list", SLACK_BOT_TOKEN)
    for channel in resultDict['channels']:
        if (channel['name'] == channelName):
            return channel['id']
    return None

# Posts to given slack channelId with given message.  
def postToSlack(channelId, messageText):
    data = {
        "channel": channelId,
        "text": messageText
    }
    data = json.dumps(data)
    data = str(data)
    data = data.encode('utf-8')
    resultDict = sendPostRequest("https://slack.com/api/chat.postMessage", SLACK_BOT_TOKEN, data)
    return resultDict

# Posts to a slack channel.
def postToChannel(channel, messageText):
    channelId = channelNameToId(channel)
    return postToSlack(channelId, messageText)

# Sends a private message to a user with userId.
def sendDm(userId, messageText):
    return postToSlack(userId, messageText)

# Sends generic post request and returns the result.
def sendPostRequest(requestURL, bearerToken, data={}):
    req = request.Request(requestURL, method="POST", data=data)
    req.add_header("Authorization", "Bearer {}".format(bearerToken))
    req.add_header("Content-Type", "application/json; charset=utf-8")
    
    r = request.urlopen(req)
    resultDict = json.loads(r.read().decode()) 
    return resultDict

# Parses and converts the res to dict.
def responseToDict(res):
    return dict(parse_qsl(res.decode()))


# Dates are given as: YYYY-MM-DD
# Returns difference between current day and the anniversary.
def diffWithTodayFromString(dateString):
    now = date.today()
    currentYear = now.year

    dateTokens = dateString.split("-")
    month = int(dateTokens[1])
    day = int(dateTokens[2])

    if now > date(currentYear, month, day):
        return (date((currentYear + 1), month, day) - now).days
    return (date(currentYear, month, day) - now).days


# Dates are given as: YYYY-MM-DD
# Calculates the total time that has passed until current date.
def totalTimefromString(dateString):
    now = date.today()

    dateTokens = dateString.split("-")
    year = int(dateTokens[0])
    month = int(dateTokens[1])
    day = int(dateTokens[2])

    then = date(year, month, day)

    years = now.year - then.year
    return years + 1

# Validate requests coming to endpoint.
# Hashes request body with timestamp and signing secret.
# Then, compares that hash with slack signature.
def validateRequest(header, body):

    bodyAsString = urllib.parse.urlencode(body)

    timestamp = header['x-slack-request-timestamp']
    slackSignature = header['x-slack-signature'] 
    baseString = "v0:{}:{}".format(timestamp, bodyAsString)

    h =  hmac.new(SLACK_SIGNING_SECRET.encode(), baseString.encode(), hashlib.sha256)
    hashResult = h.hexdigest()
    mySignature = "v0=" + hashResult

    return mySignature == slackSignature

# Converts given name to mention string.
def convertToCorrectMention(name):
    if name == "channel" or name == "here" or name == "everyone":
        return "<!{}>".format(name)
    else:
        return "<@{}>".format(name)
```

### chalicelib/upstash.py
Main file for functions directly related to the database.
> Here, we will handle our database calls. We will fetch from the database, set key-value pairs etc. This file also helps us abstract low level details from the `app.py`, enhancing readability and modularity.

#### A great thing about Upstash Redis Database is that it supports RESTFUL API calls. This way, you can access your database without the need to constantly create and close connections, which is the way to go for serverless applications. 

```
from chalicelib.utils import sendPostRequest, getRealName, allSlackUsers, diffWithTodayFromString, totalTimefromString
import os

UPSTASH_REST_URL = os.getenv("UPSTASH_REST_URL")
UPSTASH_TOKEN = os.getenv("UPSTASH_TOKEN")

# Posts to Upstash Rest Url with parameters given.
def postToUpstash(parameters):
    requestURL = UPSTASH_REST_URL
    for parameter in parameters:
        requestURL += ("/" + parameter)
    
    resultDict = sendPostRequest(requestURL, UPSTASH_TOKEN)
    return resultDict['result']


# Sets key-value pair for the event with given parameters.
def setEvent(parameterArray):

    postQueryParameters = ['SET']

    for parameter in parameterArray:
        parameter = parameter.split()
        for subparameter in parameter:
            postQueryParameters.append(subparameter)

    resultDict = postToUpstash(postQueryParameters)

    return resultDict


# Returns event details from the event given.
def getEvent(eventName):
    postQueryParameters = ['GET', eventName]
    date = postToUpstash(postQueryParameters)
    
    timeDiff = diffWithTodayFromString(date)
    totalTime = totalTimefromString(date)
    mergedDict = [date, timeDiff, totalTime]
    return mergedDict

# Fetches all keys (events) from the database
def getAllKeys():
    return postToUpstash(['KEYS', '*'])
    
# Deletes given event from the database.
def removeEvent(eventName):
    postQueryParameters = ['DEL', eventName]
    resultDict = postToUpstash(postQueryParameters)
    return resultDict


# Handles set request by parsing and configuring setEvent function parameters.
def setHandler(commandArray):
    eventType = commandArray.pop(0)
    date = commandArray.pop(0)
    user = commandArray.pop(0)

    if eventType == "birthday":
        listName = "birthday-" + user
        return setEvent( [listName, date] )

    elif eventType == "anniversary":
        listName = "anniversary-" + user
        return setEvent( [listName, date] )

    elif eventType == "custom":
        message = ""
        for string in commandArray:
            message += string + "_"

        listName = "custom-" + user + "-" + message
        user = commandArray[1]
        return setEvent( [listName, date] )  
    else:
        return

# Handles get-all requests.
def getAllHandler(commandArray):
    filterParameter = None
    if len(commandArray) == 1:
        filterParameter = commandArray[0]

    allKeys = getAllKeys()
    birthdays = []
    anniversaries = []
    customs = []

    slackUsers = allSlackUsers()

    stringResult = "\n"
    for key in allKeys:
        if key[0] == 'b':
            birthdays.append(key)
        elif key[0] == 'a':
            anniversaries.append(key)
        elif key[0] == 'c':
            customs.append(key)

    if filterParameter is None or filterParameter == "birthday":
        stringResult += "Birthdays:\n"
        for bday in birthdays:
            tag = bday.split('-')[1]
            username = tag[1:]
            realName = getRealName(slackUsers, username)
            details = getEvent(bday)

            stringResult += "`{}` ({}): {} - `{} days` remaining!\n".format(tag, realName, details[0], details[1])

    if filterParameter is None or filterParameter == "anniversary":
        stringResult += "\nAnniversaries:\n"
        for ann in anniversaries:
            tag = ann.split('-')[1]
            username = tag[1:]
            realName = getRealName(slackUsers, username)
            details = getEvent(ann)
            
            stringResult += "`{}` ({}): {} - `{} days` remaining!\n".format(tag, realName, details[0], details[1])
        
    if filterParameter is None or filterParameter == "custom":
        stringResult += "\nCustom Reminders:\n"
        for cstm in customs:
            splitted = cstm.split('-')
            username = splitted[2]
            realName = getRealName(slackUsers, username)
            details = getEvent(cstm)
            
            stringResult += "`{}-{}` ({}): {}\n".format(splitted[1], splitted[2], getRealName(slackUsers, username), details[0])

    return stringResult
```

### .chalice/config.json
File for configuration of the project on AWS.
> Here, we define our project details such as environment variables and deployment stages. For this, we will only configure environment variables by adding:

```
{
  "environment_variables": {
    "UPSTASH_REST_URL": <UPSTASH_REDIS_REST_URL>,
    "UPSTASH_TOKEN": <UPSTASH_REDIS_REST_TOKEN>,
    "SLACK_BOT_TOKEN": <SLACK_BOT_TOKEN>,
    "SLACK_SIGNING_SECRET": <SLACK_SIGNING_SECRET>,
    "NOTIFY_TIME_LIMIT": "<amount of days before getting notifications for events>"
    }
}
```


## After all is done

### Folder structure

#### Your folder structure should look something like this:
```
<project_name>:
    app.py

    chalicelib:
        utils.py
        upstash.py
        <Some other default files generated by chalice>

    .chalice:
        config.json
        <Some other default files generated by chalice>
```


### Running Locally 
> Chalice enables for local deployment, which makes development process really quick.

Run: `chalice local`
![local-deployment](/img/blog/event_reminder_slackbot/chalice_local.png)

If you don't have a static IP address, then you should use a tunnelling service such as `ngrok` so that you can show your endpoint to Slack: 
> `./ngrok http 8000` --> Tunnels your localhost:8000
![ngrok](/img/blog/event_reminder_slackbot/ngrok8000.png)

### Configure Slack
#### 1. Go to [Slack API Apps Page](https://api.slack.com/apps):
    * Create new App
        * From Scratch
        * Name your app & pick a workspace 
    * Go to Oauth & Permissions
        * Add the following scopes
            * channels:read
            * chat:write
            * chat:write.public
            * commands
            * groups:read
            * users:read
        * Install App to workspace
            * Basic Information --> Install Your App --> Install To Workspace
2. Note the variables (These will be the env variables for AWS deployment) : 
    * `SLACK_SIGNING_SECRET`:
        * Go to Basic Information
            * App Credentials --> Signing Secret
    * `SLACK_BOT_TOKEN`:
        * Go to OAuth & Permissions
            * Bot User OAuth Token

#### 3. Go to [Slack API Apps Page](https://api.slack.com/apps) and choose relevant app:
After deployment, you can use `REST_API_URL` or `ngrok_domain` as `<domain>`.


    1. Go to [Slack API Apps Page](https://api.slack.com/apps) and choose relevant app:
    * Go to Slash Commands:
        * Create New Command:
            * Command : `event`
            * Request URL : `<domain>`
            * Configure the rest however you like.


* After these changes, Slack may require reinstalling of the app.


### Congratulations!
You now have a functioning serverless Slackbot! Feel free to customize it however you like. 

After you are satisfied with the local hosting and results, simply:
* `chalice deploy` for final deployment on AWS Lambda and API Gateway.
![chalice_deploy](/img/blog/event_reminder_slackbot/chalice_deploy.png)

You can now use the REST_API_URL provided by AWS Chalice on your Slack configurations.

#### For the complete project, you can visit [Github Repo](https://github.com/upstash/serverless-birthday-slackbot). 
