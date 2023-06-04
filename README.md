This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

This is a demo project allowing to create, edit and view a pokemon teams

## Getting Started

Docker is required to run the project. To start simply clone the project and navigate to the project folder and run:

```
docker-compose up --build
```

navigate to localhost:3000 in browser

## Some comments

- docker configuration is not mean to be ready for production, but just for testing
- team list caching is implemented using next.js server side rendering
- the project is build using new nextjs13 app structure except for the image file handling, as it seems there's not yet a good way to implement it using new app api handlers
- the project currently doesn't contain any tests as it wasn't mentioned in the requirements, but in an optional scenario tests should also be created