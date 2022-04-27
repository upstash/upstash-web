---
slug: feedback-widget
title: 'Feedback Widget for Next.js Applications'
sidebar_label: 'Feedback Widget for Next.js'
authors: adem
image: https://upstash-og-image.vercel.app/Feedback%20Widget%20for%20Next.js%20Applications.png?theme=light&md=1&fontSize=100px&authorName=Adem+Ilter&authorTitle=Frontend+Developer+%40Upstash&authorPhoto=https%3A%2F%2Fblog.upstash.com%2Fimg%2Fblog%2Fauthors%2Fadem.jpg
tags: [redis, database, serverless, nextjs]
---

User feedback is important to guide product decisions. We built a widget to help you get feedback from your users. It is a React component which calls Next.js API as its backend. The backend API simply sends the feedback data to Upstash Redis database. Also, you will be able to see and manage the submitted data in [Upstash Console Integrations Page](https://console.upstash.com/integration/feedback)

When you add the component to your Next.js page, an icon will be displayed on bottom right corner. When clicked, feedback form will be visible. Check [the demo](https://upstash-feedback-widget.vercel.app/) to see how it works.

<!--truncate -->


See [the Github repo](https://github.com/upstash/feedback) to check out the code. *Currently, the widget is designed to be used in a Next.js application. We welcome your contributions to support others like Nuxt, SvelteKit or Remix*

![feedback widget](/img/blog/feedback/f1.png)
         

### Installation


Install dependencies:

```bash
npm install @upstash/feedback @upstash/redis
```

Component and style:

```js
// pages/_app.js

import '@upstash/feedback/dist/style.css'
import FeedbackWidget from '@upstash/feedback'

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <FeedbackWidget type="full" />
      <Component {...pageProps} />
    </>
  )
}
```
     
Copy/paste the below API code to `pages/api/feedback.js`
```javascript
// pages/api/feedback.js

import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: "UPSTASH_REDIS_REST_URL",
  token: "UPSTASH_REDIS_REST_TOKEN",
});

export default async function FeedbackWidgetAPI(req, res) {
  try {
    await redis.hset("feedback", { [Date.now().toString()]: req.body });

    return res.status(200).json({ message: "success" });
  } catch (err) {
    return res.status(400).json({ message: err });
  }
}
```

You need to create a Redis database at [Upstash](https://console.upstash.com) then replace `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` which can be found at the database details page in Upstash Console.


### Admin Dashboard

Upstash Console has a page under `Integrations` > `Feedback Widget` so you can see and manage the submitted feedback. 

![feedback widget](/img/blog/feedback/f2.png)


### Configuration


| key            | type                         | default        | accept                 | 
| -------------- | ---------------------------- | -------------- | ---------------------- |
| `user?`        | string                       |                |                        |
| `metadata?`    | object                       | null           |                        |
| `type?`        | string                       | "form"         | 'form', 'rate', 'full' |
| `apiPath?`     | string                       | 'api/feedback' |                        |
| `themeColor?`  | string                       | '#5f6c72'      |                        |
| `textColor?`   | string                       | '#ffffff'      |                        |
| `title`        | string, React.ReactElement |                |                        |
| `description`  | string, React.ReactElement |                |                        |
| `showOnInitial?` | boolean                      | false          |                        |
| `children?`    | React.ReactElement           |                |                        |


   
**user** : Use `user` field to pass user's id or email as a parameter, so the user will not have to enter their email.
``` javascript
<FeedbackWidget type="full" user={currentUser.email}/>
```


To allow anonymous submission, set any string as a user id just to hide email input.

``` javascript
<FeedbackWidget type="full" user="anything"/>
```

**metadata** : You can attach extra information using the metadata field.

**showOnInitial** : Set true, if you prefer the input dialog to be shown at initial.


### Closing Words

Depending on your interest, we are planning to build new components. You can contribute to our [Github repo](https://github.com/upstash/feedback) and open issues and feature requests. Follow us at [Twitter](https://twitter.com/upstash) and [Discord](https://discord.gg/w9SenAtbme).
