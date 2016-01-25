Yelp Clone
==========

Minimum Viable Product
----------------------

PizzaTime! is a web application inspired by Yelp built using
Ruby on Rails and React.js. It focuses on helping New Yorkers
find the perfect (or closest) slice.

PizzaTime! allows users to:

- [ ] Create an account
- [ ] Log in / Log out
- [ ] Search for restaurants by name, tags, and location.
- [ ] See search results in list and on map
- [ ] Apply filters to their search results
- [ ] Tag restaurants from a categories list
- [ ] Create, read, edit, and delete restaurant reviews
- [ ] Upload photos to their restaurant reviews
- [ ] View other users' reviews

## Design Docs
* [View Wireframes][view]
* [DB schema][schema]

[view]: ./docs/views.md
[schema]: ./docs/schema.md

##Implementation Timeline

###Phase 1: Restaurant Model, JSON API, Flux Map interface (2 days)

Create a Restaurant model and build out its JSON API.
Setup the React Router and React components for the restaurant index and
embedded Google map. Unless a more efficient implementation can be found,
this will require stores for both Restaurants and Map Markers.

*3 goals:*
- moving map changes index items displayed
- clicking search results highlight pin on map
- clicking pin on map brings up restaurant thumbnail and highlights
  search result on map.

This comprises the bulk of the app's index page, and is available to
non-users. Apply styling before moving on.

[details][phase-1-details]

###Phase 2: User model, authentication, sessions (2 days)

Create a User model. Implement user signup and authentication (using
BCrypt). Frontend for signup and login pages. These will be nested
under the index in the React Router. Build a react component for the
User, nest its route under the index.
Construct a User Store and User Actions for basic CRU (no D).

*Important features:*
- sortable index of reviews corresponding to user
- update info (recycle sign-up form)
- profile picture

[details][phase-2-details]

###Phase 3: Review form / Review CRUD (1 day)

Build a react component for a Restaurant review form. Nest its route
under the Restaurant. Users should be able to perform all CRUD actions
on their Reviews. Review form has a nested tag mini-form that sends data to
the Tags table when the whole form is submitted.

[details][phase-3-details]

###Phase 4: Restaurant Show Page (1 day)

Build another React component for the Restaurant, nested under the
index.

*Important features:*
- static embedded google map with pin dropped on address.
- reviews, sortable by date and stars.
- interactive photo library (CSS carousel or similar feature)

[details][phase-4-details]

###Phase 5: Search (1 day)

Add 2 search bars to index. One search bar searches restaurant names
and tags in the DB. The second search bar is an embedded Google Maps
search, and filters results whose coordinates are outside of the bounds
returned by the API.

[details][phase-5-details]

##Phase 6: Bonus (whatever time remains)

*Bonus Features:*

- [ ] Users can vote reviews as Funny, Useful, and Cool.
- [ ] Users can follow other users. User show page has a tab to a
followed users feed.
- [ ] Fake ads everywhere because Internet.
- [ ] Seed, seed, seed.

[details][phase-6-details]


[phase-1-details]: ./docs/phases/phase_1.md
[phase-2-details]: ./docs/phases/phase_2.md
[phase-3-details]: ./docs/phases/phase_3.md
[phase-4-details]: ./docs/phases/phase_4.md
[phase-5-details]: ./docs/phases/phase_5.md
[phase-6-details]: ./docs/phases/phase_6.md
