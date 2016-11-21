# slack-google-images

## How to use
Make sure the following environment variables are defined:

  - `GOOGLE_CUSTOM_SEARCH_ENGINE_ID`: The ID of your [custom Google search engine](https://cse.google.com/cse/), which will be used to perform the image searches. 
  - `GOOGLE_API_KEY`: To obtain a Google API key, register a new app and enable Google Custom Search Engine API via the [Developers Console](https://console.developers.google.com). 
  - `SLACK_WEB_HOOK`: The URL of the [incoming Slack webhook](https://api.slack.com/incoming-webhooks).
  - QUERY_STRING: The Google Images query, e.g. 'russ meyer'.

The code uses [nconf](https://github.com/indexzero/nconf) to resolve the variables in the following order: `argv`, `env`, `config.json`.