import { Loading } from '@zeit-ui/react'
import React from 'react'
import useApi from '../../hooks/useApi'
import { Post as PostT } from '../../services/types'
import Post from '../post/Post'
import PostsNotFound from '../post/PostsNotFound'

export default ({ userid }: { userid: string }) => {
  const { response, loading } = useApi<PostT[]>({
    url: `users/${userid}/posts`,
    trigger: userid,
  })

  return (
    <>
      {loading ? (
        <Loading>Loading posts</Loading>
      ) : response && response.data.length > 0 ? (
        response.data.map((p, k) => <Post {...p} key={k} />)
      ) : (
        <PostsNotFound />
      )}
    </>
  )
}
