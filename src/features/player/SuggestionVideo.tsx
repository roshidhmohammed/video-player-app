import useUpdateSuggestionVideos from '../../hooks/useUpdateSuggestionVideos'
import { useEffect } from 'react'
import type { CategoryData } from '../../types'
import VideoFeed from '../feed/VideoFeed'

const SuggestionVideo = () => {
  const suggestionVideos = useUpdateSuggestionVideos()


// useEffect(() => {
//     console.log('Suggestion videos updated:', suggestionVideos);
// }, [suggestionVideos]);

console.log(suggestionVideos)

if(!suggestionVideos) return null   
  return (
    <div><VideoFeed data={suggestionVideos}/></div>
  )
}

export default SuggestionVideo