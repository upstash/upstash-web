---
slug: redis-terraform
date: 2021-07-18
title: "Announcing Upstash Terraform Provider"
sidebar_label: "Terraform Provider"
authors: noah
image: img/blog/terraform.png
tags: [redis, database, serverless, terraform]
---

## Announcing Upstash Terraform Provider

We are thrilled to announce that now our Upstash Terraform Provider is publicly available. Our core principle is always being developer friendly. We have announced [REST Api](https://docs.upstash.com/features/restapi) recently. Now it is time to expand our tools with the [terraform provider plugin](https://github.com/upstash/terraform-provider-upstash).

[Terraform](https://www.terraform.io/) is a useful automation tool that lets you define your infrastructure as code. Collaboration becomes crazy easy in this way and every configuration change is persisted so everybody knows what is going on at the infrastructure.

After community requests, we have developed our terraform provider and now it is publicly available in the [terraform marketplace](https://registry.terraform.io/providers/upstash/upstash/latest).

<!--truncate-->

If you want to use our plugin it is just 4 lines of configuration snipped and to create a database is very simple.


``` json
terraform {
  required_providers {
    upstash = {
      source = "upstash/upstash"
      version = "x.x.x"
    }
  }
}

provider "upstash" {
  email = "EMAIL"
  api_key  = "API_KEY"
}

```


You can get an [API_KEY](https://docs.upstash.com/howto/developerapi) from the Upstash Console. Also EMAIL is the email you registered for Upstash. Now, we have defined our provider. Let’s create a database:


``` json
resource "upstash_database" "mydb" {
  database_name = "mydb3"
  region = "eu-west-1"
  tls = "true"
  multi_zone = "false"
}
```


Now execute following commands:


``` shell
terraform init
terraform plan
terraform apply
```


This simple code snippet will create a database. You can find the full example code [here.](https://github.com/upstash/terraform-provider-upstash/blob/master/examples/main.tf)


## Future Work

We want to continue expanding our tools and 3rd party integrations. You can upvote our [roadmap](https://roadmap.upstash.com/). Also we would appreciate it if you give us feedback on our terraform provider at [twitter](https://twitter.com) or [discord](https://discord.com/invite/w9SenAtbme). It is hosted [at github. ](https://github.com/upstash/terraform-provider-upstash)
