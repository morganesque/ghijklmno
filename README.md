# ghijklmno
My Blog

I've created a blogging system based on [node](https://nodejs.org/), [nunjucks](https://mozilla.github.io/nunjucks/) and [sass](sass-lang.com/
) because I work for the UK Government and that's what their prototyping kit is based on.

## Why?

I used to use Jekyll for my blog but it seemed to be very slow for some things.

I wanted to prioritise the use-case of adding a new blog post over making wholesale changes to the site which means doing the former is hopefully much quicker, but doing the latter is a bit tricker.

## Where things are

So there's `posts/` and `pages/` folders with blog posts and pages in them. They all have jekyll-style YML data at the top which is picked up and can be used within them. The difference between posts and pages are exactly what you'd expect.

All posts and pages get processed into a `build/` folder (each into their own folder because I prefer the URLs that creates).

Sass gets processed into a `build/css` folder so that'll be updated as well when you change sass files.

There are `img/` and `js/` folder which are just static. They're not processed, and don't live anywhere else, so don't delete them!

The `build/` folder is a `gh-pages` branch of the same git repo so it's separate. This is how the blog is hosted on github. So editing and committing changes to the main repo won't publish anything, only committing the updates to build will update the live site.

## My process

I tend to create a new branch for new blog posts and then merge them back to master once I've published them. This means that the `build/` folder can kind of get cluttered if I'm working on multiple new posts at different time.

If you want to clean up `build/` in order to publish a new blog post run
`git reset --head` (reverts changes to modified files)
and then
`git clean -fd` (removes all untracked files and directories)
to clear get it ready.

I've written a few commands to help me do other things which are common.

`npm run newpost`<br />
Run this to create a new post. It asks you a couple of questions and then creates the new files in the `posts/` folder and even opens it in atom for you.

`npm run rename <name-of-post-to-rename>`<br />
Renames an existing post by taking the name you've put in the page.title (in the yml) and slugifying it.

`npm run renew <name-of-post>`<br />
Renews a post by renaming it to the current date. This is useful when you've had a draft floating around for ages and want to quickly update the date on it before publishing.
