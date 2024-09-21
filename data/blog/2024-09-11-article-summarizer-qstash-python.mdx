---

title: "Efficient Article Summarization with QStash: Handling API Rate Limits and Parallel Processing"
slug: article-summarizer-qstash-python
authors: [abdullahenes]
tags: [qstash, python, retry-after, django, redis, llm, vercel]
---

In this article, we'll build an application to summarise hundreds of online articles at once. To create these summaries, we'll use QStash's LLM integration to call an Upstash-hosted LLM. This not only allows us to bypass platform-specific function execution limits but also massively reduces our billed function execution duration.

You'll learn how to work around API rate limits, which could otherwise be a problem when making many calls in parallel. The result will be hundreds of neatly summarised online articles created at the same time, ready for you to read or further process.

### Motivation

Almost all publicly available APIs have a rate limit applied to them, a maximum amount of requests you can make in a certain time frame. And, of course, depending on the API, hitting those limits is usually relatively easy. For example, Twitter is known for having very restrictive API rate limits, even for expensive premium tiers of their API.

If you depend on a rate-limited API for your service, you're forced to implement some kind of workaround (i.e. throttling) that leads to a more complex codebase.

With Upstash QStash, a message scheduler for the serverless environment, we don't need to worry about throttling mechanisms under high API load. Our API requests are automatically retried when hitting our rate limits to make sure every request gets processed.

### Prerequisites

To follow along, you'll need:

- A basic understanding of Python and Django.
- An Upstash account to obtain your QStash token and Redis URL.
- A Vercel account to deploy the web application.

<Note>In this blog we used Meta's Llama-3-8B-Instruct model hosted on Upstash for summarization. You can also use other [Upstash-hosted models](https://upstash.com/docs/qstash/features/llm#upstash-hosted-models) or OpenAI's models for summarization.</Note>

### Project Overview

The project consists of two main components:

1. A Django web application that receives article summaries and saves them to our Redis database. We'll deploy this application to Vercel.

2. A Python script that sends articles to our Upstash hosted model for summarization using QStash's LLM API support. The script will iterate over 1000 articles stored in Redis, send each one to our model for summarization, and save the summaries back in Redis. We'll use QStash's queue system to handle the parallel processing of these tasks.

If we want to use one of OpenAI's models, we can still use QStash to handle the rate limits. What we need to do is create another endpoint in our Django application, call it from the Python script using QStash, call the OpenAI model to create the summary, and return the value of the `x-ratelimit-reset-requests` header in the `Retry-After` header to QStash to handle the rate limits.

Thankfully, when we use an Upstash-hosted model, and the rate limits are exceeded, QStash automatically schedules the retry of publishing or enqueuing chat completion tasks depending on the reset time of the rate limits. This way, we don't need to worry about handling the rate limits ourselves.

### Project Setup

#### Install Necessary Packages

Install QStash Python SDK, Upstash Redis, Django, and Python-dotenv using pip:

```bash
pip install qstash upstash-redis django python-dotenv
```

QStash Python SDK is used to interact with QStash services, upstash-redis is used to communicate with our database, django is used to create the web application, and python-dotenv is used to load environment variables from a `.env` file.

To use a Redis database, create a free account on Upstash and get your Redis URL. Follow the instructions in the [Upstash Redis documentation](https://upstash.com/docs/redis/overall/getstarted) to create one.

#### Create a Django Project

First, we need to set up a new Django project. Navigate where you'd like this project to live and run:

```bash
django-admin startproject article_summarizer
cd article_summarizer
django-admin startapp summarizer
```

#### Configure Django Settings

In our `settings.py`, we'll add `summarizer` to `INSTALLED_APPS` and set `APPEND_SLASH` to `False`. Also, add `.vercel.app` and `127.0.0.1` to `ALLOWED_HOSTS` to allow requests from Vercel and local development:

```python title:"article_summarizer/settings.py"
INSTALLED_APPS = [
    ...
    'summarizer',
]

ALLOWED_HOSTS = ['.vercel.app', '127.0.0.1', 'localhost']

APPEND_SLASH = False
```

Add QStash configurations and other environment variables to a `.env` file in the project root:

```text title:".env"
QSTASH_TOKEN=your_qstash_token
DEPLOYMENT_URL=your_deployment_url
UPSTASH_REDIS_REST_URL=your_upstash_redis_rest_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_rest_token
```

Load the environment variables into the project's `settings.py`:

```python title:"article_summarizer/settings.py"
import os
from dotenv import load_dotenv

load_dotenv()

QSTASH_TOKEN = os.getenv('QSTASH_TOKEN')
DEPLOYMENT_URL = os.getenv('DEPLOYMENT_URL')
UPSTASH_REDIS_REST_URL = os.getenv('UPSTASH_REDIS_REST_URL')
UPSTASH_REDIS_REST_TOKEN = os.getenv('UPSTASH_REDIS_REST_TOKEN')
```

Finally add the following line to the `wsgi.py` file to expose the application to Vercel:

```python title:"article_summarizer/wsgi.py"
app = application
```

### Implementation

#### 1. Creating a Django View to Use as a Callback URL

We'll create a Django view to use as our callback URL. This view will handle the summary data sent by QStash and save it in our Redis database. We will use the `upstash_redis` package to interact with our Redis database. We will also add the `csrf_exempt` decorator to the view to allow POST requests without CSRF tokens.

First, we decode the base64-encoded data, extract the summary, and save it to Redis using the article ID as the key.

```python title:"summarizer/views.py"
import base64
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from upstash_redis import Redis

@csrf_exempt
def redis_callback_view(request):
    if request.method == 'POST':
        # Parse the request body
        data = json.loads(request.body)

        # Decode the base64-encoded 'body' field from the callback
        encoded_body = data.get('body', '')
        decoded_body = base64.b64decode(encoded_body).decode('utf-8')

        # Parse the decoded body to JSON format
        decoded_data = json.loads(decoded_body)

        # Extract the summary from the decoded response
        summary = decoded_data['choices'][0]['message']['content']

        # Extract the article ID from the query parameters
        article_id = request.GET.get('article_id')
        
        # Save the summary to Redis
        redis = Redis.from_env()
        redis.set(f"summary_{article_id}", summary)

        return JsonResponse({'status': 'Summary saved to Redis'})
    
    return JsonResponse({'error': 'Invalid request'}, status=400)
```

#### 2. Adding the URL Pattern for the Callback View

We will add the URL pattern for the callback view to the `summarizer/urls.py` file of the `summarizer` app:

```python title:"summarizer/urls.py"
from django.urls import path
from .views import redis_callback_view

urlpatterns = [
    path('redis-callback', redis_callback_view, name='redis_callback'), 
]
```

#### 3. Update the Project's URL Configuration

We will include the URL pattern for the `summarizer` app in the project's `article_summarizer/urls.py` file:

```python title:"article_summarizer/urls.py"
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('summarizer/', include('summarizer.urls')),
]
```

#### 4. Deploy the Django Application

We will use Vercel to deploy our application. Before deploying, we need to create a `vercel.json` file in the project root with the following configuration:

```json title:"vercel.json"
{
  "builds": [
    {
      "src": "article_summarizer/wsgi.py",
      "use": "@vercel/python",
      "config": { "maxLambdaSize": "15mb", "runtime": "python3.9" }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "article_summarizer/wsgi.py"
    }
  ]
}
```

Then we will create a requirements file to specify the dependencies. We will run the following command to generate the `requirements.txt` file:

```bash
pip freeze > requirements.txt
```

We are now ready to deploy!

To easily deploy our app, we can create a GitHub repository and push our Django project to it. Then, create a new project on Vercel and connect it to our GitHub repository. After that, Vercel will handle the deployment process for us. After the deployment is complete, we will get a deployment URL that we can use as the callback URL and we need to set our environment variables in our project’s Settings -> Environment Variables. After we set our variables we will redeploy from the Deployments tab.

#### 5. Creating the Queue and Sending Summarization Requests

We'll create a queue with parallelism set to 2, meaning two summarization tasks can run concurrently. Then, we'll iterate over 1000 articles stored in Redis, sending each one to our model for summarization. We'll also set the callback URL to our deployed Django application with the article ID as a query parameter.

```python title:"summarize_articles.py"
from upstash_redis import Redis
from qstash import QStash
from qstash.chat import upstash
from dotenv import load_dotenv
import os

load_dotenv()
redis = Redis.from_env()
qstash_client = QStash(os.getenv("QSTASH_TOKEN"))

# Create a queue with parallelism set to 2
qstash_client.queue.upsert("articles-queue", parallelism=2)

# We have 1000 articles that we want to summarise
for i in range(1, 1001):

    article = redis.get(f"article_{i}")

    result = qstash_client.message.enqueue_json(
        queue="articles-queue",
        api={"name": "llm", "provider": upstash()},
        body={
            "model": "meta-llama/Meta-Llama-3-8B-Instruct",
            "messages": [
                {
                    "role": "user",
                    "content": f"Summarize the following article: {article} \n in 50-100 words, highlighting the main points and key findings. Please use your own words and avoid copying and pasting from the original text. If the article has multiple sections or parts, focus on the most important and relevant information. Thank you!",
                }
            ],
        },
        callback=f'{os.getenv("DEPLOYMENT_URL")}/redis-callback?article_id={i}',
    )

print(result)
```

### Conclusion

And that's it! We now have an app that can summarize hundreds of web articles reliably and quickly using parallelism and automatic retries upon hitting our rate limits. By the way, I included a bonus for you: Use this [article summary app](https://article-summarizer-eight-taupe.vercel.app/summarizer/summarize) to summarize any article and send the summary straight to your email inbox.

For more details, you can explore the [Upstash QStash documentation](https://upstash.com/docs/qstash/overall/getstarted). You can find the complete source code for this project on the [GitHub repository](https://github.com/Abdusshh/article_summarizer). For any questions or feedback, feel free to reach out to me on [LinkedIn](https://www.linkedin.com/in/abdullah-enes-g%C3%BCle%C5%9F/).

---
