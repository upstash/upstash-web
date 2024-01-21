
Rate limiting is a crucial mechanism used by developers to control the number of requests an application can receive within a specified time frame, by setting a limit on how frequently an action can be repeated within a specific period, such as attempting to log into your account. It aims to prevent users from exhausting system resources and also has a very pivotal role in Cybersecurity. In serverless setups, where efficient resource management is essential but can be challenging, implementing rate limiting becomes even more important. That's where the Upstash rate limiting library comes in. In this tutorial, we'll explore this library, and make rate limiting easier and more accessible for every user.

# Getting Started

Before starting to code, we must create a database on [Upstash](https://console.upstash.com/login) and install the rate limiting library. To install the library, open your library and enter this command:

 `pip install upstash-rate limit`

Once you successfully created your database on Upstash and installed the library, you can proceed to the coding part.

# Usage of Rate Limiting

We will start with the basics of rate limiting library.
## Redis Client Configuration

Before diving into the usage, it's important to note that this library supports various Redis client configurations. To explore the possibilities, you can check the [Redis SDK repository.](https://github.com/upstash/redis-python)

## Asynchronous Support

The library also provides support for asyncio. If you want to utilize the features of upstash_ratelimit.asyncio, you can import the asyncio-based variant from the upstash_ratelimit.asyncio module. In this tutorial, we will import upstash_ratelimit.

```python
from upstash_ratelimit import Ratelimit, FixedWindow
from upstash_redis import Redis
 ```


## Creating a Rate Limiter

Now, let's start coding by setting up a rate limiter. It requires three parameters:
    • redis: The Redis instance. This is like telling the rate limiter where to look.
    • limiter: The type of limiter. In our example, we used FixedWindow. We will discuss the differences between other types while implementing limiting algorithms.
    • prefix (optional): If you're sharing Redis with other applications, this is like putting a label on your requests to eliminate possible key collisions. In our example, we used the default prefix, "@upstash/ratelimit".


```python
ratelimit = Ratelimit(
    redis=Redis.from_env(),
    limiter=FixedWindow(max_requests=10, window=10),
    prefix="@upstash/ratelimit",
)
 ```

We created a rate limiter that allows 10 requests per 10 seconds.

## Handling Requests

Next, we will use a rate limiter to respond to requests by calling the limit method with an identifier. You can either use a constant or dynamic identifier depending on your need. Using a constant identifier is more sensible if you will respond to all requests with a single limit. Otherwise, you can use a user ID,  an API key, or an IP address as an identifier to set individual limits.

```python
identifier = "api"
response = ratelimit.limit(identifier)
```

limit method returns a Response object. To understand the logic better, let's examine the Response class.

```python
class Response:
    allowed: bool
    limit: int
    remaining: int
    reset: float
    ```


The class has four different attributes:
    • allowed: This is a boolean value. True means the request can be satisfied at this moment, and false means otherwise.
    • limit: Maximum number of requests allowed in a certain time frame.
    • remaining: Countdown of how many requests can be satisfied until the end of the current time frame. 
    • reset: This attribute is a floating-point number representing a Unix timestamp in seconds. It indicates the exact moment when the rate limits are set to reset. After this timestamp, you'll have a fresh set of requests available.

After setting limits, we should check the response by using the allowed method. Unless the response is allowed, that means the request can’t be accepted at this moment and it has to wait.

```python
if not response.allowed:
    print("Unable to process at this time")
else:
    do_expensive_calculation()
    print("Here you go!")
```

## Blocking

In certain situations, you may prefer your application to wait for a request until it falls within the specified limits rather than directly denying it. This is where the blocking functionality comes into play. When a request is blocked, it gets automatically suspended until the end of the current window. Once the next window starts, the method attempts to process the request again. If a time parameter is set (in seconds), the method will block the process for that specific duration.

```python
from upstash_ratelimit import Ratelimit, SlidingWindow
from upstash_redis import Redis

# Create a new rate limiter, that allows 10 requests per 10 seconds
ratelimit = Ratelimit(
    redis=Redis.from_env(),
    limiter=SlidingWindow(max_requests=10, window=10),
)

# If the process is not allowed, block it for 30 seconds
response = ratelimit.block_until_ready("id", timeout=30)

if not response.allowed:
    print("Unable to process, even after 30 seconds")
else:
    do_expensive_calculation()
    print("Here you go!")
```

## Multiple Limits

The different components of your application could have diverse requirements or user categories. In such cases, applying different rate limits to different users becomes essential. This is where multiple rate limiters prove beneficial, offering the ability to set specific limits for distinct groups. For instance, if your application has free and paid users, you might want free users to be allowed 10 requests in 10 seconds, while paid users are permitted 60 requests in the same time frame. You can achieve this by implementing a class:

```python
from upstash_ratelimit import Ratelimit, SlidingWindow
from upstash_redis import Redis

class MultiRL:
    def __init__(self) -> None:
        redis = Redis.from_env()
        self.free = Ratelimit(
            redis=redis,
            limiter=SlidingWindow(max_requests=10, window=10),
            prefix="ratelimit:free",
        )

        self.paid = Ratelimit(
            redis=redis,
            limiter=SlidingWindow(max_requests=60, window=10),
            prefix="ratelimit:paid",
        )

```

self.free is implemented to allow a maximum of 10 requests every 10 seconds, using a sliding window rate limiter. The Redis key prefix for this limiter is set to "ratelimit:free".
self.paid is implemented similarly, but it has a higher rate of requests. Also, the Redis key prefix for this limiter is set to "ratelimit:paid".

After the implementation of the class, we should initialize rate limiters.

```python
ratelimit = MultiRL()
ratelimit.free.limit("userIP")
ratelimit.paid.limit("userIP")
```

The limit method is called on both free and paid rate limiters with the same identifier. These calls to limit will return Response objects, and you can check the allowed attribute in these responses to determine whether the requests are within the allowed limits or not.

# Implementing Rate Limiting Algorithms

Now, we will review different types of rate limiting algorithms.
## Fixed Window Algorithm

The Fixed Window rate limiting algorithm operates by dividing time into fixed windows, each with a predefined and constant length. For instance, if the system has a limit of 50 requests in 10 minutes, and the window starts at 12:00, it can process 50 requests until 12:10. If 50 requests are made at 12:01, the system must wait until 12:10 to handle another request.

```python
from upstash_ratelimit import Ratelimit, FixedWindow
from upstash_redis import Redis

ratelimit = Ratelimit(
    redis=Redis.from_env(),
    limiter=FixedWindow(max_requests=10, window=10),
)
```

Here, we've created a rate limiter that allows 10 requests within a 10-second fixed window.

Advantages:
    • It is cost-effective in terms of both data size and computation. Determining the validity of a request doesn't involve storing a lot of data or performing complex calculations.
    • Newer requests are not negatively affected by past burst rates, as each window provides a fresh restart.
        
Disadvantages:
    • May allow high bursts of requests at the boundaries of each window, leading to uneven distribution and potential traffic surges.
    • In scenarios with a large number of users trying to reach the server at once, particularly at the beginning of a new window, the algorithm may lead to request stampedes, causing a sudden increase in traffic.

## Sliding Window Algorithm

The sliding window algorithm tries to improve the fixed windows algorithm by distributing requests more evenly. Rather than granting all requests at the beginning of the window, it distributes the permissions throughout the window. Instead of a fixed window, it uses a rolling window and divides time into specific slices. Unlike the fixed window algorithm, it considers both old and current windows. The closer a request is to the present moment, the higher its weight in the calculation. Based on the weights of requests, the algorithm makes an approximation for request validation. If the approximated value is lower than the predefined limit, the request is allowed.

```python
limit = 10
# 4 requests from the old window, weighted + requests in the current window
rate = 4 * ((60 - 15) / 60) + 5
return rate < limit  # True means we should allow the request
```

In this example, 4 requests are from the old window and 5 requests are from the current window. At first, “rate" variable is approximated and then it is compared to the limit. Depending on the result of this comparison, the request is either allowed or denied. 

```python
from upstash_ratelimit import Ratelimit, SlidingWindow
from upstash_redis import Redis
ratelimit = Ratelimit(
    redis=Redis.from_env(),
    limiter=SlidingWindow(max_requests=10, window=10),
)
```

In this example, a new rate limiter is created by using a sliding window algorithm.

Advantages:
    • Successfully resolves the near-boundary problem of the Fixed Window algorithm by considering both old and new windows, reducing the possibility of stampedes.
      
Disadvantages:
    • More costly in terms of storage and computation compared to the Fixed Window algorithm. Approximation involves weight calculations and storing old window data.
    • The approximation mechanism assumes a uniform request flow in the previous window, which may not be the case always. Requests might be concentrated at certain times, leading to bursts of activity. In these cases, the algorithm’s approximation may not accurately reflect the actual request activity.

## Token Bucket Algorithm

Token bucket is another widely used rate limiting algorithm. It introduces a “bucket of tokens” concept. In this metaphor, each token symbolizes the capacity to execute a single request. Requests can be executed as long as there are available tokens in the bucket. When a request is permitted, it consumes a token from the bucket. Over time, consumed tokens are reloaded at a specified refill rate. If the bucket is empty, incoming requests must wait until tokens are refilled.

```python
from upstash_ratelimit import Ratelimit, TokenBucket
from upstash_redis import Redis

ratelimit = Ratelimit(
    redis=Redis.from_env(),
    limiter=TokenBucket(max_tokens=10, refill_rate=5, interval=10),
)
```

Advantages:
    • Bursts of requests are managed smoothly, the system processes them at a constant rate. This ensures a more consistent handling of incoming traffic.
    • Capable of offering higher initial burst limits. Setting a maximum number of tokens to be higher than the refill rate enables higher initial bursts. Some systems may need this flexibility.

Disadvantages:
    • Among the three presented algorithms, the Token Bucket is computationally the most expensive. Managing and updating the token bucket, along with the token consumption logic, increases complexity and computation cost.

# Final Remarks

This project makes use of Poetry, a handy tool for organizing and managing dependencies. Before testing your application, make sure you can create a Poetry shell with all the required dependencies. Also, for the features we've discussed to work smoothly, your database needs to be hosted on Upstash.To run all tests, activate the Poetry virtual environment with the required dependencies. Set the environment variables UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN, then execute the following command:

`poetry run pytest`

# Conclusion

In this tutorial, we explored Upstash’s rate limiting library and its utilities. The library offers versatile features such as asynchronous support, multiple rate limiter creation, and several rate limiting algorithms. With its easy-to-use methods and strong Redis integration, Upstash's rate limiting library enables developers to create effective rate limiting strategies that guarantee the best possible application performance and resource management.

If you enjoyed this tutorial, you can check other blogs/tutorials on the [Upstash blog](https://upstash.com/blog). If you have any comments or questions, you can reach out to us from [Discord](https://discord.com/invite/jUxUYE4nEB) or [Twitter](https://twitter.com/upstash).  Thanks for reading.

