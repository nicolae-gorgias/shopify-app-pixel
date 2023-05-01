# Shopify App Pixel Demo

This is a demo app that shows how to use the App Pixel API to track events in a Shopify store and ways to send that data to a third party service or a widget on the storefront.

## Getting started

### Requirements

1. You must [download and install Node.js](https://nodejs.org/en/download/) if you don't already have it.
1. You must [create a Shopify partner account](https://partners.shopify.com/signup) if you don’t have one.
1. You must create a store for testing if you don't have one, either a [development store](https://help.shopify.com/en/partners/dashboard/development-stores#create-a-development-store) or a [Shopify Plus sandbox store](https://help.shopify.com/en/partners/dashboard/managing-stores/plus-sandbox-store).

### Local Development

[The Shopify CLI](https://shopify.dev/docs/apps/tools/cli) connects to an app in your Partners dashboard. It provides environment variables, runs commands in parallel, and updates application URLs for easier development.

You can develop locally using your preferred package manager. Run one of the following commands from the root of your app.

Using npm:

```shell
npm run dev
```

Open the URL generated in your console. Once you grant permission to the app, you can start development.

### Deploying to Shopify

This will build the app.

```shell
npm run build
```

This will upload build to Shopify.

```shell
npm run deploy
```

Add scopes to your Helpdesk app:

```python
SHOPIFY_SCOPE = [
    "write_pixels",
    "read_customer_events",
    ...

```

Go to Apps -> select store -> Update permissions.

Enable pixel in your store:

```shell
curl --request POST \
  --url https://<store-name>.myshopify.com/admin/api/2023-04/graphql.json \
  --header 'Content-type: application/json' \
  --header 'X-Shopify-Access-Token: <store-access-token>' \
  --cookie request_method=POST \
  --data '{"query":"mutation {\n  webPixelCreate(webPixel: { settings: \"{\\\"accountID\\\":\\\"234\\\"}\" }) {\n    userErrors {\n      code\n      field\n      message\n    }\n    webPixel {\n      settings\n      id\n    }\n  }\n}"}'
```

Go to your store, and you should see event logs in the Console.
