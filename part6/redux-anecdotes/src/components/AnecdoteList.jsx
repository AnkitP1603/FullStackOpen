import { useSelector, useDispatch } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {    
    const anecdotes = useSelector(({filter, anecdotes}) => 
        anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
    ).sort((x,y) => y.votes - x.votes)

    const dispatch = useDispatch()

    const vote = anecdote => {
        console.log('vote', anecdote.id)
        dispatch(voteAnecdote(anecdote))
        dispatch(showNotification(`You voted '${anecdote.content}'`,5))
    }

    return <div>
        {anecdotes.map(anecdote => (
            <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote    )}>vote</button>
            </div>
            </div>
        ))}
    </div>
}

export default AnecdoteList