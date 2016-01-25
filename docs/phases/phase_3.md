# Phase 3: Review form / Review CRUD

## Rails
### Models
* Review
* Tag

### Controllers
* Reviews
* Tags

### Views
* api/users/reviews/index.json.jbuilder
* api/restaurants/reviews/index.json.jbuilder
* api/reviews/show.json.jbuilder

## Flux
### Views (React Components)
* Reviews Index
* Reviews Index Item
* Review Form
  * Review Submit Button
  * Tag Form

### Stores
* Review
* Tag

### Review Actions
* resetReviews
* createReview
* updateReview
* destroyReview

### Tag Actions
* createTags
* resetTags

### ApiUtil
* fetchReviews
* createReview
* updateReview
* destroyReview
* createTags
* destroyTags
* fetchTags
