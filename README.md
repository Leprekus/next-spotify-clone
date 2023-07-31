# Next Spotify Clone

## Sections

- Technologies
- What I Learned

## Technologies

The technologies used for this web app are:

- Next.Js
- Supabase
- Radix UI
- Zustand

The main framework used for the application is Next.js which is using the newest app directory.
As a database I decided to go with Supabase which I had heard quite a lot about, but had never gotten around to trying it. It was actually an enjoyable experience, I got to set it up and start working with it quickly. I would definetely use it again.
Radix UI is used for the modal menus.

## What I learned

During this project I noticed there were several tools that I had been omitting as a React developer. Mainly the use of providers and hooks.

**For Future Reference:**

- I should use Providers to faciliatate the interaction between components across different levels of depth in the application. They are especially useful to render toast notifications and modal menus
- Combining the power of hooks with providers is a powerful way to access data across the entire application avoiding rerenders and refetching of duplicate data
- Zustand can be reserved to adding interactivity across different components. Zustand is especially useful to work alongside providers to toggle them on and off.

