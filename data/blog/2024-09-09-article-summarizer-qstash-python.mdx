---

title: "Managing Rate Limits and Parallelism with QStash"
slug: article-summarizer-qstash-python
authors: [abdullahenes]
tags: [qstash, python, retry-after, django, redis, llm, vercel]
---

In this blog, we will create an app to summarize articles. We will use QStash's LLM integration to interact with OpenAI's API. We will also demonstrate how to avoid rate limits using the `Retry-After` header. Additionally, we will take advantage of the parallelism feature in QStash's queues to summarize multiple articles simultaneously. Finally, we will store the summaries in a Redis database.

### Motivation

Don't you hate it when your application gets stuck because of API rate limits? When working with APIs, particularly those from popular services like OpenAI, hitting rate limits is quite easy. These limits can force you to implement workarounds that often complicate your codebase. But what if there was a better way to avoid getting stuck with rate limits? That's where QStash comes in.

With QStash, you can set your API requests to automatically retry after a delay when you hit those limits. On top of that, its queue system with controlled parallelism allows you to send multiple requests simultaneously, significantly speeding up your application's performance.

After reading this blog, you'll want to use QStash for all your LLM API calls to take advantage of these features!

### Prerequisites

To follow along, you'll need:

- A basic understanding of Python and Django.
- An Upstash account to obtain your QStash token and Redis URL.
- A Vercel account to deploy the web application.
- An OpenAI API key to use for summarization.

<Note>In this blog we used OpenAI's GPT 3.5 LLM model for summarization. You can also use [Upstash hosted models](https://upstash.com/docs/qstash/features/llm#upstash-hosted-models) for summarization.</Note>

### Project Overview

The project consists of two main components:

1. A Django web application that acts as a callback URL for QStash. This application will receive the summary data from OpenAI and save it to our Redis database. We need to deploy this application to Vercel to use it as the callback URL for QStash.

2. A Python script that sends articles to OpenAI for summarization using QStash's LLM API support. The script will iterate over 1000 articles stored in Redis, send each one to OpenAI for summarization, and save the summaries to Redis. We will use QStash's queue system to handle the parallel processing of these tasks. We will also set the `Retry-After` header to handle API rate limits.

### Project Setup

#### Install Necessary Packages

Install QStash Python SDK, Upstash Redis, Django, and Python-dotenv using pip:

```bash
pip install qstash upstash-redis django python-dotenv
```

QStash Python SDK is used to interact with QStash services, upstash-redis is used to communicate with our database, django is used to create the web application, and python-dotenv is used to load environment variables from a `.env` file.

In order to use a Redis database, you can create a free account on Upstash and get your Redis URL. You can follow the instructions in the [Upstash Redis documentation](https://upstash.com/docs/redis/overall/getstarted) to create one.

#### Create a Django Project

First, we need to set up a new Django project. We will navigate to our desired directory and run:

```bash
django-admin startproject article_summarizer
cd article_summarizer
django-admin startapp summarizer
```

#### Configure Django Settings

We will add `summarizer` to `INSTALLED_APPS` and set `APPEND_SLASH` to `False` in the project's `settings.py`. Also, add `.vercel.app` and `127.0.0.1` to `ALLOWED_HOSTS` to allow requests from Vercel and local development:

```python title:"article_summarizer/settings.py"
INSTALLED_APPS = [
    ...
    'summarizer',
]

ALLOWED_HOSTS = ['.vercel.app', '127.0.0.1', 'localhost']

APPEND_SLASH = False
```

Add QStash configurations, OpenAI API key, and other environment variables to a `.env` file in the project root:

```text title:".env"
OPENAI_API_KEY=your_openai_api_key
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

OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
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

We'll create a Django view to use as our callback URL. This view will handle the summary data sent by QStash and save it to our Redis database. We will use the `upstash_redis` package to interact with our Redis database. We will also add the `csrf_exempt` decorator to the view to allow POST requests without CSRF tokens.

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

        # Extract the summary from the decoded OpenAI response
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

We'll create a queue with parallelism set to 2, meaning two summarization tasks can run concurrently. Then, we'll iterate over 1000 articles stored in Redis, sending each one to OpenAI for summarization. We'll make sure to set the Retry-After header to 60 seconds to handle OpenAI's per-minute rate limit, and we'll also set the callback URL to our deployed Django application with the article ID as a query parameter.

```python title:"summarize_articles.py"
from upstash_redis import Redis
from qstash import QStash
from qstash.chat import openai
from dotenv import load_dotenv
import os

load_dotenv()
redis = Redis.from_env()
qstash_client = QStash(os.getenv("QSTASH_TOKEN"))

qstash_client.queue.upsert("articles-queue", parallelism=2)

for i in range(1, 1001):

    article = redis.get(f"article_{i}")

    result = qstash_client.message.enqueue_json(
        queue="articles-queue",
        api={"name": "llm", "provider": openai(os.getenv("OPENAI_API_KEY"))},
        body={
            "model": "gpt-3.5-turbo",
            "messages": [
                {
                    "role": "user",
                    "content": f"Summarize the following article: {article} \n in 50-100 words, highlighting the main points and key findings. Please use your own words and avoid copying and pasting from the original text. If the article has multiple sections or parts, focus on the most important and relevant information. Thank you!",
                }
            ],
        },
        callback=f'{os.getenv("DEPLOYMENT_URL")}/redis-callback?article_id={i}',
        headers={"Retry-After": "60",},
    )

print(result)
```

### Conclusion

In this blog, we demonstrated how to handle API rate limits using QStash's `Retry-After` feature and how to process multiple tasks simultaneously using queues. We summarized 1000 articles using a model from OpenAI and stored the summaries in a Redis database. We also deployed a Django application to Vercel to use as a callback URL for QStash.

As a bonus, you can use the following app to summarize your articles and send those summaries to your email. Here is the link to the [article summarizer app](https://article-summarizer-eight-taupe.vercel.app/summarizer/summarize).

For more details, you can explore the [Upstash QStash documentation](https://upstash.com/docs/qstash/overall/getstarted). You can find the complete source code for this project on the [GitHub repository](https://github.com/Abdusshh/article_summarizer). For any questions or feedback, feel free to reach out to me on [LinkedIn](https://www.linkedin.com/in/abdullah-enes-g%C3%BCle%C5%9F/).

---
