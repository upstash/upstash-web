---
title: "Announcing QStash Workflow and Deprecating Upstash Kafka"
slug: workflow-kafka
authors: [enes]
tags: [qstash, workflow, kafka]
---

I have one piece of good news and one piece of bad news I'd like to share in this article. The good news is that we've been working hard for the past couple of months on a brand-new product called Upstash Workflow. Workflow lets you write durable and reliable serverless functions by default, and we see immense potential in this tool to improve how we write serverless code.

As we focus on this new direction, we've made the difficult decision to discontinue support for Upstash Kafka starting in six months. Until then, we will fully support Kafka with no changes to allow easy migration; we'll just not accept new users. This choice will enable us to dedicate our resources and focus entirely on developing and improving QStash and Upstash Workflow to become the go-to tools for building reliable serverless applications.

We understand that our shift away from Kafka can be challenging, and we're committed to supporting every Kafka user through this transition with our professional support and migration guides. In the following sections, I'll provide more details about Upstash Workflow's capabilities and our plan for phasing out Upstash Kafka.

### Why Upstash Workflow?

1. Orchestration: Upstash Workflow is a serverless workflow engine built on our QStash service. It transforms complex business logic into robust steps with features like auto-retry on failure and extended function timeouts.
2. Cost Efficiency: Schedule serverless functions and make API calls without incurring charges for execution time.
3. Extended Execution Time: Each step can take up to maximum execution duration of QStash and supports hour-long HTTP requests.
4. Reliability: Automatic function retries on failure, a Dead Letter Queue (DLQ) for failed steps, and a visual workflow dashboard for debugging failures.

### Use Cases

- **Event-driven workflows**: Once a user signs up for your product, create and send them a weekly report to keep them engaged with your platform.
- **Data Pipelines**: Process complex data, such as cleaning, transforming, and loading data from multiple sources. QStash Workflow ensures that each step in your pipeline executes correctly and that data is processed reliably without you needing to manage any infrastructure.
- **Scheduled Tasks**: Perform tasks on a schedule, like daily reports, backups, or maintenance. Easily schedule your workflow to run at intervals without a dedicated scheduling tool or cron jobs.
- **User Analytics and Tracking**: Collect and analyze user behavior data for analytics or personalization. QStash Workflow functions can be triggered by user interactions (like page views or button clicks) to capture, aggregate, and analyze real-time data to provide insights for product improvements or personalized content.
- **AI and machine learning workflows:** Execute AI / ML models that require data collection, preprocessing, model training, and deployment. QStash Workflow can trigger functions at each pipeline stage to automate tasks such as preprocessing data whenever new data arrives, training a model, or deploying updated models.

### QStash Workflow Roadmap

We aim to ship fast while still providing a solid feature set at launch. Upstash Workflow supports many use cases in its current form, and we have major features planned for the near future:

- Event support: A wait/notify mechanism to pause and resume execution upon an external event.
- Supporting all QStash features, including queues and parallelism.
- Configurable retry limit (default is 3).
- SDKs in more languages, starting with Python and expanding based on your requests.
- Local development and testing environment.

### Why Stop Accepting New Kafka Users?

When we started Upstash, we identified `state management` as one of the core challenges in the serverless architectures. We chose the Redis API for its rich ecosystem, clean interface, and ease of use. The success of our Redis offering has proven our hypothesis that this is something the serverless environment has lacked until that point. 

As we studied the serverless environment and its architectural needs more, we recognized that messaging and task scheduling were the next problems we'd need to solve. Initially, we thought Kafka would be the ideal solution due to its power as a messaging platform. While this assumption was partially correct as we've received positive feedback for our Kafka offering, we also noticed significant friction for serverless developers using Kafka. Kafka is not designed for serverless environments and proved challenging for many use cases. This lead us to develop QStash.

QStash started as a simple CRON scheduling solution for serverless functions. However, to our surprise, we saw our customers using QStash for increasingly complex business logic orchestration, effectively using it as an alternative to Kafka in many scenarios.

This usage pattern was unexpected to us but led to a valuable insight: Running robust business logic and handling messaging in a serverless environment is complex and not something a traditional message broker like Kafka is well-adapted for. In response, rather than trying to fit Kafka into the serverless paradigm, we now focus on enhancing QStash. This decision allows us to develop an end-to-end service for serverless workflows and messaging that has organically evolved specifically for the needs of serverless architectures.

**The bottom line is that no immediate action is required if you're one of our Kafka users.** We will continue to support Upstash Kafka for the next six months, though we have halted new feature development and are not accepting new users. You can continue using all platform features, including connectors and the schema registry. We've decided to keep support up for half a year to give you ample time to migrate your clusters.

If your Kafka use case can be covered with Upstash Qstash, we will provide credits to cover the entirety of your migration costs. If QStash doesn't cover your use case, our team is always there to help with any of your questions.

### Conclusion

We are excited about the future of Upstash Workflow and believe that this tool brings benefits to the serverless space that allow for building seriously robust, event-driven workflows. We also want to be fully transparent about our intentions with Kafka and sincerely apologize if this deprecation announcement causes you any inconvenience. If you are affected by these changes and need help with your migration or have any questions, please get in touch with us at [support@upstash.com](mailto:support@upstash.com). We are here to help you.