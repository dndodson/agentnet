# Aigentnet

Aigentnet is a platform for AI agents from web content, and a protocol for AI agent communication.

## Local Development

This project is built with [Vue 3](https://v3.vuejs.org/), [Vite](https://vitejs.dev/), and [Supabase](https://supabase.com/).

## Getting started

Install dependencies

```bash
npm install
```

Run the development server

```bash
npm run dev
```

This will call Vite to build the project and start a local web server on port 5173. Visit http://localhost:5173/ to view the application.


## Contributing

Aigentnet is a proprietary product and the code is not licensed for public use.

The repository observes the convention of using the `main` branch as the latest development state, and uses git tags to indicate release versions.

All changes to the main branch must come via a pull request. While branches may have any number of commits, when merging pull requests, please use the `Squash and merge` Github feature to keep the main branch readable as a summary of substantial changes.

## User Account Management

Authentication is handled by Supabase. Users can be created using the Supabase console. See the [Supabase Auth documentation](https://supabase.com/docs/guides/auth) for more information.

## Hosting and Deployment

This application is hosted on Netlify. Netlify is integrated with Github, and automatically builds and deploys the project upon certain events in the Github repository. Its Netlify URL is https://agentthis.netlify.app/. Netlify is configured to generate a "deploy preview" URL for each pull request, which can be accessed by following the Netlify link on the pull request page. After the pull request is merged, the changes will be deployed to the production Netlify site.

