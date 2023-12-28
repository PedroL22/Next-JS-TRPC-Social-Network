const formatDate = (date: string) => {
  const newDate = new Date(date)
  const hours = newDate.getHours()
  const minutes = newDate.getMinutes().toString().padStart(2, '0')
  const ampm = hours >= 12 ? 'PM' : 'AM'
  const formattedHours = (hours % 12 || 12).toString().padStart(2, '0')
  const day = newDate.getDate().toString().padStart(2, '0')
  const month = (newDate.getMonth() + 1).toString().padStart(2, '0')
  const year = newDate.getFullYear()

  return `${formattedHours}:${minutes}${ampm} - ${month}/${day}/${year}`
}

export { formatDate }
