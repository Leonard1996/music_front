import styles from './Autosuggest.module.css'
import Collapse from '@mui/material/Collapse'
import { useNavigate } from 'react-router-dom'

export default function Autosuggest({
  setSearchTerm,
  onClick,
  isOpen,
  suggestions,
  searchTerm,
}) {
  const navigate = useNavigate()

  const filterFunction = ({ name }) => {
    if (searchTerm.trim() === '') return true
    return name.toLowerCase().includes(searchTerm.toLowerCase())
  }

  const handleSubmit = event => {
    event.preventDefault()
    navigate('/songs/?keyword=' + searchTerm)
  }

  return (
    <div class={styles['wrapper']}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className={styles['wrapper__container']}
          name="searchTerm"
          onChange={event => setSearchTerm(event.target.value)}
          onClick={onClick}
          value={searchTerm}
        />
      </form>

      <Collapse in={isOpen && suggestions.length}>
        <div className={styles['wrapper__list']}>
          {suggestions
            .filter(filterFunction)
            .sort((a, b) => b.timestamp - a.timestamp)
            .map(suggestion => (
              <p
                key={suggestion.timestamp}
                onClick={() => {
                  setSearchTerm(suggestion.name)
                  navigate('/songs/?keyword=' + suggestion.name)
                }}
              >
                {suggestion.name}
              </p>
            ))}
        </div>
      </Collapse>
    </div>
  )
}
