<script>
  import {onMount} from 'svelte'
  import {nip19} from 'nostr-tools'

  import Post from './Post.svelte'
  import Author from './Author.svelte'

  export let params

  let pubkey, givenRelays, d, error

  onMount(() => {
    try {
      let {type, data} = nip19.decode(params.code)
      if (type === 'npub') pubkey = data
      else if (type === 'nprofile') {
        pubkey = data.pubkey
        givenRelays = data.relays
      } else if (type === 'naddr') {
        d = data.identifier
        if (data.kind !== 30023) throw new Error(`invalid kind ${data.kind}`)
        pubkey = data.pubkey
        givenRelays = data.relays
      }
    } catch (err) {
      error = err.message
      return
    }
  })
</script>

{#if error}
  <p>{error}</p>
{:else if d}
  <Post author={pubkey} relays={givenRelays} {d} />
{:else if pubkey}
  <Author author={pubkey} relays={givenRelays} />
{:else}
  <p>loading...</p>
{/if}
