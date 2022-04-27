---
slug: blitzjs-todo-redis
title: "Building A To-Do List with Blitz.js & Redis"
authors: vedant
tags: [redis, blitzjs, upstash, todo]
---

Blitz.js is a React framework that was originally forked from Next.js. Today we’ll build a Blitz.js To-Do application that stores tasks in Upstash. Without further ado, let’s get started!

<!--truncate-->

## Setup

You’ll need to install Blitz.js on your computer to get started.

NPM:

```bash
npm install -g blitz --legacy-peer-deps
```

Yarn:

```bash
yarn global add blitz
```

To create a new Blitz.js app, use `blitz new` and cd into the directory.

```
blitz new blitzjs-todo && cd blitzjs-todo
```

Great, now let’s install TailwindCSS to style our website.

```
blitz install tailwind
```

Lastly, let's install the Upstash JS SDK to make calls to the Upstash API easier.

NPM:

```
npm i @upstash/redis
```

Yarn:

```
yarn i @upstash/redis
```

At this point, you should run `blitz dev` to make sure everything is working correctly. Try making an account and signing in too. It should look like this if you’ve done everything correctly so far.

![Default Blitz.js App](https://i.imgur.com/Z84Ws2L.png)

In addition, your file structure should look like this:

![File Structure Screenshot](https://i.imgur.com/tp2mA4W.png)

Copy these `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` from the [Upstash Console](https://console.upstash.com/) into the file called `.env` for now. It should look like this:

```
# This env file should be checked into source control
# This is the place for default values for all environments
# Values in `.env.local` and `.env.production` will override these values

UPSTASH_REDIS_REST_URL=YOUR_URL_HERE
UPSTASH_REDIS_REST_TOKEN=YOUR_TOKEN_HERE
```

We’ve set up our Blitz.js application completely now! Let’s start implementing our To-Do list.

## Implementation

Blitz.js comes with User Authentication built in! Let’s leverage this to make private to-do lists for each user.

First, let's initialize the Upstash JS SDK in `/lib/redis.ts`

```ts
import { Redis } from "@upstash/redis";
const redis = Redis.fromEnv();
export default redis;
```

We’ll need to make **3** different API Routes to access our To-Do lists.

Navigate to `app/api` and make a file called `getall.ts`. Once you’ve done so, paste the following code in:

```jsx
import { BlitzApiRequest, BlitzApiResponse, getSession } from "blitz";
import redis from "../../lib/redis";

export const handler = async (req: BlitzApiRequest, res: BlitzApiResponse) => {
  const session = await getSession(req, res);
  if (!session.userId) {
    res.status(401).json({ error: `Do not tamper with this route!` });
  } else {
    await redis
      .lrange(String(session.userId), 0, 100)
      .then((data) => res.status(200).json({ data: data, success: true }))
      .catch((error) => res.status(500).json({ error: error }));
  }
};
export default handler;
```

Let’s go over how this API Route works, step by step. First, we make a request to the route. On the route itself, we validate that the user is logged in. If there is no user, we return a “Not Authorized” response. If there **is** a user, then we fetch our Upstash Redis database to find all To-Dos that are currently in the list. This will fetch about a hundred To-Dos.

> Q: Wait, how are we supposed to add To-Dos in the first place?
> A: Good question! Let’s do that next!

Once again, paste the following code into a new file called `add.ts` in `app/api`.

```jsx
import { BlitzApiRequest, BlitzApiResponse, getSession } from "blitz";
import redis from "../../lib/redis";
const handler = async (req: BlitzApiRequest, res: BlitzApiResponse) => {
  const session = await getSession(req, res);
  if (req.method !== "POST" || !req.body.data || !session.userId) {
    res.status(401).json({ error: `Do not tamper with this route!` });
  } else {
    let todo = encodeURI(req.body.data);
    await redis
      .lpush(String(session.userId), todo)
      .then(() => res.status(200).json({ success: true }))
      .catch(() => res.status(500).json({ error: "Error adding data." }));
  }
};
export default handler;
```

This API route is quite similar to the last one, but notice that we’ve added more checks in the fifth line. That’s because this request is not a `GET` request, rather, it is a `POST` request. Notice how we check for **three things.** First, we make sure that the request is actually a `POST` request. Next, we make sure that there is JSON or text in `req.body.data`. Finally, we make sure the user is logged in. If all of these little checks are passed, we can push our To-Do to our Redis list on Upstash. If there is any sort of error while fetching, we can return a 500 by using `.catch`.

The last route we need to add is one to remove our To-Dos. Once you finish something, you have to cross it out of course! Let’s add our last API Route in `app/api/remove.ts`. Copy the following code in to the file:

```jsx
import { BlitzApiRequest, BlitzApiResponse, getSession } from "blitz";
import redis from "../../lib/redis";
const handler = async (req: BlitzApiRequest, res: BlitzApiResponse) => {
  const session = await getSession(req, res);
  if (req.method !== "POST" || !req.body.data || !session.userId) {
    res.status(401).json({ error: `Do not tamper with this route!` });
  } else {
    let todo = encodeURI(req.body.data);
    await redis
      .lrem(String(session.userId), 1, todo)
      .then(() => res.status(200).json({ success: true }))
      .catch(() => res.status(500).json({ error: "Error removing data." }));
  }
};
export default handler;
```

Notice anything similar? That’s because this route is almost identical to the `add` API Route. The major difference here, is that we are using `LREM`, not `LPUSH`, to remove an item from Redis.

## Building The Frontend

To start off, let’s delete everything in `app/pages/index.js` and write our To-Do list step by step.

At the top of the file, paste these imports in.

```jsx
import { Link, BlitzPage, useMutation, Routes, getAntiCSRFToken } from "blitz";
import { useRef, useEffect, useState, Suspense } from "react";
import Layout from "app/core/layouts/Layout";
import { useCurrentUser } from "app/core/hooks/useCurrentUser";
import logout from "app/auth/mutations/logout";
```

We will be using React Hooks to build the core functionality of our To-Do list. Let’s implement some of the core features of the list.

```jsx
const Main = () => {
  const todoRef = useRef<HTMLInputElement>(null)
  const [todos, setTodos] = useState([])
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)
  const handleAddTodo = async (e) => {
    e.preventDefault()
    const antiCSRFToken = await getAntiCSRFToken()
    const response = await fetch("/api/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "anti-csrf": antiCSRFToken,
      },
      body: JSON.stringify({ data: todoRef.current?.value }),
    })
    const data = await response.json()
    if (data.success) {
      todoRef.current!.value = ""
      fetchTodos()
    }
  }
  const handleRemoveTodo = async (id) => {
    const antiCSRFToken = await getAntiCSRFToken()
    const response = await fetch("/api/remove", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "anti-csrf": antiCSRFToken,
      },
      body: JSON.stringify({ data: id }),
    })
    const data = await response.json()
    if (data.success) {
      fetchTodos()
    }
  }
  const fetchTodos = async () => {
    const antiCSRFToken = await getAntiCSRFToken()
    const response = await fetch("/api/getall", {
      method: "GET",
      headers: {
        "anti-csrf": antiCSRFToken,
      },
    })
    const res = await response.json()
    setTodos(res.data)
  }
  useEffect(() => {
    fetchTodos()
  }, [])

  if (currentUser) {
    return (
      <>
        <button
          className="mt-4 px-2 py-1 border-2 border-black hover:bg-gray-400 mb-3"
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Logout
        </button>
        <div>
          User id: <code>{currentUser.id}</code>
          <br />
          User email: <code>{currentUser.email}</code>
        </div>
        <form className="mt-2" onSubmit={handleAddTodo}>
          <p>add a todo:</p>
          <input
            ref={todoRef}
            className="w-full border-black border-2 focus:outline-none text-center"
          />
        </form>
        <div className="flex flex-col gap-2 mt-4 bg-gray-300 rounded-md">
          {(todos as string[]).map((todo: string, index: number) => (
            <div className="flex items-center p-3 rounded-md bg-gray-300" key={index}>
              <button
                onClick={() => handleRemoveTodo(todo)}
                className="flex items-center mr-4 justify-center w-5 h-5 rounded-[0.25rem] border border-solid border-gray-500 shadow-sm hover:bg-gray-700"
              ></button>

              <span>{todo}</span>
            </div>
          ))}
        </div>
      </>
    )
  } else {
    return (
      <div className="flex flex-col gap-4 text-center">
        <Link href={Routes.SignupPage()}>
          <a className="mt-4 px-2 py-1 border-2 border-black hover:bg-gray-400">
            <strong>Sign Up</strong>
          </a>
        </Link>
        <Link href={Routes.LoginPage()}>
          <a className="mt-4 px-2 py-1 border-2 border-black hover:bg-gray-400">
            <strong>Login</strong>
          </a>
        </Link>
      </div>
    )
  }
}
```

The `<Main/>` component is the core of our application. A closer look at its code tells us how we use it. At the top of our component, we initialize state for our application. We also declare a `ref` for later use in our “New To-Do” input. You may also notice the usage of `antiCSRFToken`! Blitz.js requires the use of these tokens when fetching any API Routes to prevent any sort of malicious actor from harming your site. It’s nice to have, in my opinion!

We use three main functions to handle our data on the website. These three are:

- `handleAddTodo`
- `handleRemoveTodo`
- `fetchTodos`

We call `fetchTodos` as soon as the page loads, to load all To-Dos that the user still needs to complete. When a user removes or adds a To-Do, we call `fetchTodos` again to reflect that change on the website!

> If a user is not logged in, the user will be prompted to login to the website before seeing this page.

You can sign up or log in if you do not already have a session on the website. Remember, you cannot store your To-Dos without an account, and all API Routes require you to be authenticated with an `AntiCSRFToken`!

But wait, one more important step! We have to export the page!

```jsx
const Home: BlitzPage = () => {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <main>
        <div className="my-4">
          <Suspense fallback="Loading...">
            <Main />
          </Suspense>
        </div>
      </main>
    </div>
  );
};

Home.suppressFirstRenderFlicker = true;
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>;

export default Home;
```

As you can see above, Blitz.js uses an approach slightly different from Next, but the approach is the same at its core for now. We use the `Suspense` that we imported earlier to show a user that the app is loading, and then we show our `</Main>` component after it finishes loading!

To see your changes in effect, run this in your console one more time, and navigate to your app in the browser.

```bash
blitz dev
```

If you followed the directions, your application should look something along the lines of this once you login and add a few To-Dos:

![Finished To-Do List](https://i.imgur.com/84H2NxQ.png)

You can remove a To-Do by clicking over the box next to it, that’s what the `removeTodo` function is for 😉.

## Congratulations!

I hope you learned something new by reading this blog post, and if you didn’t, remember it doesn’t hurt to brush up your skills! Blitz.js is pivoting focus away from Next.js, so it may be a completely different framework in the future, but stay tuned on their website [here](https://blitzjs.org)!

**Project Source**: [GitHub Link](https://github.com/upstash/redis-examples/tree/master/blitzjs-todo-with-redis)

**Working Demo:** [Demo Link](https://upstash-blitz.vercel.app/)

Have feedback? Make sure to follow [@upstash](https://twitter.com/upstash) on Twitter, and join the [Discord server!](https://discord.com/invite/w9SenAtbme)
