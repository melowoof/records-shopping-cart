# Shopping-cart

Simple overview / note about project.

## [Demo](link)

[RECORDS_Preview.mp4](RECORDS_Preview.mp4)

## Features

Navigate a "records" "store"
Browse through new releases (from Spotify's API)
Browse through albums & their tracklist
Add albums to cart
Checkout

## Tech Stack

- **UI Library**: React
- **Languages**: JavaScript, HTML, CSS
- **Build Tool**: Vite
- **Deployment**: Vite
- **Dependencies**:
- **Libraries**: React Router Dom, React Query, Framer motion, Lucide Icons

## Notes

To be honest, I'm not fully comfortable working with fetching and the React Query library just yet, and this project had proved that. I'd like to refactor some (or mostly all) of the fetch logic at some point in the future when I have time to return to this website. With how messy the code was I think there can be a lot of improvements to be made for both performance's sake and user experience. Some of the animations I've used from Framer Motion are quite jarring and frankly just not smooth because I had not planned out state management for the components well enough.
PS: In-between writing this and completing the project, I've refactored a lot of the code as well as moving to TypeScript (which involved creating a completely new repository with a TypeScript template and moving all the files over then fixing all the type errors because trying to do that first in a JavaScript template had broken my project beyond recognition). I've also changed some of the data management inside components so navigating around should only do half the amount of fetching which helps with performance and makes the app feel a lot smoother.

It could really, really, really do with a search button. The API is there. I will come back to it at some point and implement it if I have time. Just for fun.

## Acknowledgements

A great deal of inspiration was taken from [this website](https://www.awwwards.com/inspiration/desktop-self-discipline-1)
[Spotify API](https://developer.spotify.com/documentation/web-api)
