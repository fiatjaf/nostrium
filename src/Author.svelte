<script>
  import {onMount} from 'svelte'
  import {state, init} from './store'
  import PostCard from './components/PostCard.svelte'

  export let author, relays
  onMount(() => {
    init({author, relays})
  })
</script>

<div aria-busy={$state.loading}>
  {#if $state.posts.length}
    {#each $state.posts as post}
      <PostCard {author} {relays} {post} />
    {/each}
  {:else if !$state.loading}
    <p>No posts found for "{author}".</p>
  {/if}
</div>
