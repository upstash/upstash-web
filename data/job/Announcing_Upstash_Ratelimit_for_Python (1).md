In the context of modern cybersecurity threats,  an increasing number of AI apps, and concurrency-based pricing, we often find ourselves dealing with various needs, such as:
- having a predictable maximum number of requests / second for a server, to ensure high availability
- having the ability to limit a certain identifier's (IP address, API key, etc.) requests in a said interval, especially a potential malicious actor's ones
- having the ability to enforce a maximum number of requests to an AI API such as the one offered by OpenAI
- having the ability to apply different concurrency limits to users on different plans (ex: `free: 5 req/s`, `pro: 10 req/s`)
- having the ability to process a blocked request after its limit has passed

Rate limiting is a common way of fulfilling them.  The problem is, it's often hard to implement manually, especially if you have complex use cases. Even more, you might need to check if your tool works in both serverful and serverless environments.

# Announcing upstash-ratelimit
Available on [GitHub](https://github.com/upstash/ratelimit-python) and [PyPi](TODO)

We're proud to announce a new addition to the [data](https://upstash.com/about) ecosystem. 
`upstash-ratelimit` is an HTTP-based rate-limiting solution that provides an easy, fast, and customisable way to rate-limit both your stateful servers and your serverless functions.

Using modern Python features such as `asynchronous programming` and `types`, the library aims to offer a smooth and fast onboarding experience and an improved developer workflow.

# Get started
`upstash-ratelimit` provides 3 different algorithms to use for rate-limiting, each having its pros and cons. You can read more about the differences in the project [README](https://github.com/upstash/ratelimit-python).

We also provide two methods for enforcing limits:
- `limit`, which returns a dict containing `is_allowed` and some additional metadata about an `identifier`'s request
- `block_until_ready`, which allows waiting for a request to pass in a certain `timeout`.

Keep in mind that some platforms might charge you for the execution time of your function.

# Closing words
If you have any questions, please reach out to Upstash on [Discord](https://discord.com/invite/w9SenAtbme) or [Twitter](https://twitter.com/upstash). 

If you encounter any issues or have any suggestions, you can also file an issue on [GitHub](https://github.com/upstash/ratelimit-python)
