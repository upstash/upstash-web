import { Example } from "contentlayer/generated";

declare module "contentlayer/generated" {
  interface Example extends Example {
    products: string[];
    stack: string[];
    use_cases: string[];
  }
}
