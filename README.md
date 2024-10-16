# ShowcaseSERL

ShowcaseSERL is a curated collection of student and researcher- developed projects. It serves as a public portfolio for finished projects and inspires students to contribute their project ideas.

## Getting Started
After downloading the project, run the command
````
npm install
# or
npm i
````
This would donwload all the dependencies required and used in the project.
To run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the research by modifying `data/research.json`. The Research displayed is refetched each 60 seconds.
Make sure to include the following attribute when creating a new research you want to display: id, date, researchType, title, description, tags, screenshots, researchURL.
id will be used to view the detailed content of each research as well as to view the specidied research in kiosk.
tags is an array you may fill with tags of your choice. The same goes for screenshots.

For Kiosk. you may change the time of itteration by going to the kioskPage.tsx and setting this veriable to any value you like: chosenTimerForPageIteration. Note: the time is in milliseconds. 

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Development

To ensure a consistent code style, this project uses [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/). You can run the following command to check for linting errors and format the code:

```bash
npm run lint
npm run format:fix
```

