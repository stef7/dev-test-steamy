# Steam Game Library Analyser

## Local development

Using `nvm`, ensure you are running Node 20:

```bash
nvm use
```

Install dependencies if you haven't already:

```bash
npm install
```

To run the Next.js app locally for development:

```bash
npm run dev
```

## Running Tests

To run tests in watch mode during development:

```bash
npm test
```

## Bonus ideas

- Not requiring the user to input their user ID – https://github.com/Nekonyx/next-auth-steam looks good (and more recently updated than the last one I had here)
- Comparing recent playtime to all-time – "recentMinutes" is also available against each game in Steam response
- Even better, chart the breakdown of different games played over time, probably with a stacked filled line chart – this add-on for Chakra UI could be a good match: https://horizon-ui.com/documentation/docs/data-display/charts – the user can choose their own duration e.g. 30d, 365d, all time...
- Just realised I haven't written any of my own example SCSS due to using Chakra UI, let me know if you'd like me to
