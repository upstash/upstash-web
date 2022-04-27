---
slug: survey-serverless-redis
title: 'Building a survey app with Upstash Redis and Next.js'
authors: sonke
tags: [redis, serverless]
---

Nowadays, it is hard to image the IT world without Redis databases. In [Stackoverflow's Developer Survey published in 2021](https://insights.stackoverflow.com/survey/2021#most-loved-dreaded-and-wanted-database-love-dread), the in-memory database enjoyed great popularity and was chosen as the most loved database by over 70000 developers.
As an in-memory database, Redis delivers strong performance, making it ideal in scenarios that require short response times and minimal latency. However, the use cases of Redis are often wrongly understood as being limited to caching and message-brokering. Today we'll look at why this is wrong and use Redis in the role of a primary database.


<!--truncate-->


## The idea

**We want to build a small app that allows users to leave feedback in the form of an online survey.** In this specific case, let's imagine we want to collect feedback for a company.
To keep it simple, we will focus on the functionality of the app which should be the following:

1. A user can answer three questions.
    * How do you feel about our products/services? *1 - 10 points*
    * Would you recommend us to your colleagues? *Yes/No (true/false)*
    * Please share your thoughts... *Free text*
2. A user can submit the form.
3. Each individual survey result is stored as a single record in the database (hash).
4. A user can take a look at the survey results.

Here you can check [the demo app](https://upstash-survey-app.vercel.app/).

## The tech stack
Our small survey app is a perfect example to leverage the full potential of a serverless architecture. Serverless ensures a maximum scalability while keeping cost down to a minimum and can be achieved with the following technologies:

#### Next.js
[Next.js](https://nextjs.org) is an open-source development framework that enhances traditional React web applications with featurs such as server-side rendering, static page generation and most importantly *API routes*. We are going to be using Next.js to create both the frontend and API of our app.

#### Upstash Redis

Upstash offers full-serverless, persistent Redis databases that are amazingly easy to use and offer very low per-request pricing. Built on top of traditional Redis, Upstash takes the unbeatable performance of Redis and combines it with the durability of disk storage which makes it the perfect fit for our use case.

## Project setup

1. Create a Next.js app: `npx create-next-app survey-app`.
2. Create an Upstash Redis database in the [Upstash console](https://console.upstash.com/) and copy both the UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN.

The project will be a single page application with two API endpoints:

- `pages/api/submit.js` stores a survey entry
- `pages/api/results.js` retrieves all survey entries

To communicate with Upstash more easily, let's install the [`@upstash/redis`](https://www.npmjs.com/package/@upstash/redis) npm package via `npm install @upstash/redis`.

## The code
Create a new file `pages/api/submit.js` as below:
```javascript
// pages/api/submit.js

import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: "INSERT_YOUR_URL_HERE",
  token: "INSERT_YOUR_TOKEN_HERE",
});

const submitHandler = async (req, res) => {
  const body = req.body;

  // Prepare data to be inserted into the DB
  const data = {
    rating: String(body.rating) || "0",
    recommendation: String(body.recommendation) || "false",
    comment: String(body.comment) || "",
  };

  // Generate a random id to store the survey entry under
  const id =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);

  // Insert data into Upstash redis

  try {
    //Store the survey data
    await redis.hset(`entries:${id}`, data);

    //Store the id of the survey to retrieve it later
    await redis.sadd("entries", `entries:${id}`);
  } catch (error) {
    console.error("Failed to insert data into redis", error);

    return res.status(500).json({
      success: false,
      message: "Failed to insert data into redis",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Data inserted successfully",
  });
};

export default submitHandler;
```
We do three things here:

1. Take the survey data from the request body and prepare it for Redis
2. Insert the survey entry into Redis as a [hash](https://redis.io/topics/data-types#hashes)
3. Append the id of the survey entry to a [set](https://redis.io/topics/data-types#sets)

You might be wondering why we're creating a hash for the survey entry and then additionally put it's id into a set. This step will be important as soon as we want to retrieve the event from Redis again. Redis works as a key-value store which means that unlike what we are used to with SQL databases, Redis is not made to find data unless we specify an exact key under which it is stored. A query like `SELECT * FROM SurveyResults;` would be supported in SQL but with Redis we'll have to use another trick. For this we create a [set](https://redis.io/topics/data-types#sets) and add all Redis keys of the survey result entries to it. Once we would like to retrieve all survey entries, we can simply look up their keys in the set.
But let's get back to coding now and see how this looks in practice.
_____

Create a new file `pages/api/results.js` as below:

```javascript
// pages/api/results.js

import { Redis } from "@upstash/redis";

const resultsHandler = async (req, res) => {
  // Retrieve data from redis

  const redis = new Redis({
    url: "INSERT_YOUR_URL_HERE",
    token: "INSERT_YOUR_TOKEN_HERE",
  });

  try {
    //Find all the entries in the set
    const entries = await redis.smembers("entries");

    //Get all survey entries by id/key

    //To run multiple queries at once, Upstash supports the use of the pipeline command. This way we can run multiple queries at once and get the results in a single call.
    const p = redis.pipeline();
    entries.forEach((id) => {
      p.hgetall(id);
    });
    const results = await p.exec();

    return res.status(200).json({
      success: true,
      message: "Data retrieved successfully",
      data: results,
    });
  } catch (error) {
    console.error("Failed to retrieve data from redis", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve data from redis",
    });
  }
};

export default resultsHandler;

```

Our backend is working now and we can finish our app with a frontend.

___

Create a new file `pages/index.js` as below:

```jsx
// pages/index.js

import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    const data = {
      rating: form.rating.value,
      recommendation: form.recommendation.value,
      comment: form.comment.value,
    };

    // send data to backend
    await fetch("/api/submit", {
      body: JSON.stringify(data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    alert("Thank you for your feedback!");
  };

  const RatingOption = ({ value }) => (
    <div>
      <input type="radio" name="rating" value={value} required />{" "}
      <label>{value}</label>
    </div>
  );

  return (
    <div className={styles.container} onSubmit={handleSubmit}>
      <form>
        <div>
          <label>How do you feel about our products/services?</label>

          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
            <RatingOption key={value} value={value} />
          ))}
        </div>

        <div>
          <label>Would you recommend us to your colleagues?</label>

          <div>
            <input type="radio" name="recommendation" value="true" required />{" "}
            <label>Yes</label>
          </div>

          <div>
            <input type="radio" name="recommendation" value="false" required />{" "}
            <label>No</label>
          </div>
        </div>

        <div>
          <label>Please share your thoughts... (Optional)</label>
          <textarea
            name="comment"
            placeholder="This is what I liked most/this is what you can improve..."
          ></textarea>
        </div>

        <input type="submit" />
      </form>
    </div>
  );
}

```

Now to get the styles working, replace the contents of `styles/Home.styles.css` with the following:

```css

.container { 
	display: flex; 
	flex-direction: column; 
	align-items: center; 
	justify-content: center; 
	
	min-height: 100vh; 
} 

.container form > div { 
	padding: 20px;
	
	display: flex; 
	flex-direction: column; 
	align-items: stretch; 
} 

.container form > div > label { 
	margin-bottom: 10px; 
}

```

Now we are ready to receive survey entries! But wait, there's more. We still need to implement the survey results in the frontend.
___

Create a new file  `pages/results.js`  as below:

```jsx

import { useEffect, useState } from "react";

import styles from "../styles/Results.module.css";

export default function Results() {
  const [surveyData, setSurveyData] = useState([]);

  useEffect(() => {
    fetch("/api/results")
      .then((res) => res.json())
      .then((response) => setSurveyData(response.data));
  }, []);

  return (
    <div className={styles.container}>
      {" "}
      {surveyData.map((data) => (
        <div key={data.id}>
          <p>
            <strong> Rating: </strong> {data.rating}{" "}
          </p>{" "}
          <p>
            <strong> Recommendation: </strong> {data.recommendation}{" "}
          </p>{" "}
          <p>
            <strong> Comment: </strong> {data.comment}{" "}
          </p>{" "}
        </div>
      ))}{" "}
    </div>
  );
}


```

and finally create a file `styles/Results.module.css` with the following content:

```css

.container { 
	display: flex; 
	flex-direction: column; 
	align-items: center; 
	
	gap: 20px; 
	
	min-height: 100vh; 
	margin: 50px  0; 
} 

.container > div { 
	background: rgba(0, 0, 0, 0.05); 
	border-radius: 10px;
	
	padding: 15px; 
	
	display: flex; 
	flex-direction: column; 
	align-items: stretch; 
	
	gap: 10px; 
} 

.container p { 
	margin: 0; 
}
```

You can now find an overview of all survey entries at `localhost:3000/results`.

Complete source code of the application is available at the GitHub repository [upstash-survey-app](https://github.com/zunkelty/upstash-survey-app).

## Conclusion

In this post we developed a Next.js fullstack web application that handles form entries and stores filled out forms in Upstash serverless Redis. We saw how Redis can be used as a primary database and what design changes you have to make when switching from other databases (e.g. SQL) to Redis.

With their easy-to-setup serverless Redis database Upstash made it incredibly easy to store form data in the cloud.

I hope this post helps you to understand Redis, get a feeling for Upstash Redis and start building your applications with new possibilities to store data.
