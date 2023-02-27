import Index from './Index.svelte'
import Author from './Author.svelte'
import PostOrAuthor from './PostOrAuthor.svelte'

const routes = {
  // Exact path
  '/': Index,
  '/:code': PostOrAuthor
}

export {routes}
