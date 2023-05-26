import { Example, Job, Post } from "contentlayer/generated";

declare module "contentlayer/generated" {
  interface Example extends Example {
    products: string[];
    stack: string[];
    use_cases: string[];
  }

  interface Job extends Job {
    skills: string[];
  }

  interface Post extends Post {
    tags: string[];
  }
}
