# Mortimer

### A Collection of Great Ideas

> "Read the best books first or you may not have a chance to read them at all." -- Henry David Thoreau

This project is a web client for the Syntopicon, an open API of ideas. Inspired by the 1952 edition of Encyclopedia Britannica's [Great Books of the Western World](https://archive.org/details/in.ernet.dli.2015.460726/page/n3), the name was coined by Mortimer J. Adler as a name for his "collection of ideas". Adler and his team thought the Syntopicon contained all the major contributions to 102 fundamental ideas around which competing schools of Western thought developed over the past 28 centuries. With over 500,000 references to the works of philosophers, scientists, and artists -- from Homer to Shakespeare, Euclid to Einstein, Aristotle to Descartes -- the Syntopicon is a monument of academic labor. But it has fallen into obscurity. This project hopes to revive its use and provide a useful tool for [syntopical readers](https://fs.blog/how-to-read-a-book), or anyone interested in persuing a liberal education.

![Adler indexing the Syntopicon](https://forum.zettelkasten.de/uploads/editor/98/4xccgbpfi3wi.jpg)


## Getting started

A quick introduction of the minimal setup you need to get a hello world up &
running.

```shell
yarn add (or npm install)
yarn run build
yarn run start
```

## Developing

This repo is a proof of concept. Styling and semantics are kept as simple as possible.
File structure follows the API closely with a Next.js `/pages` pattern for resources on the followings URIs:

* `/topics` - all topics
* `/topics[n]` - subtopics of topic `n`
* `/subtopics[n]` - references to subtopic `n`
* `/excerpt[n]` - a specfic passage

### Built With

* React
* Next.js
* Supabase

### Prerequisites

* a Supabase API URL and key to the Mortimer project. Reach out to @johntrecker for this.

### Setting up Dev

Here's a brief intro about what a developer must do in order to start developing
the project further:

```shell
git clone https://github.com/johntrecker/mortimer
cd mortimer/
yarn add (or npm install)
yarn run dev
```

After downloading the dependencies this will fire up a local server running on localhost:3000

### Building

```shell
yarn run build
```

<!-- ## Tests

Describe and show how to run the tests with code examples.
Explain what these tests test and why.

```shell
npm run dev
``` -->

## Style guide

`simplecss` is used for simplicity. Style sheets in the `/styles` directory are imported as objects like so, `className={styles.flexRowCenter}`.

## Api Reference

All resources are currenctly available through GET requests to the Mortimer API server hosted on Supabase. Reach out for more info or to get access. 

## Database

Cf. [Supabase](https://app.supabase.com/).

## Licensing

MIT License, cf. [LICENSE](/LICENSE) for more details.
