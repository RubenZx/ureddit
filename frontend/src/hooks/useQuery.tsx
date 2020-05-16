import { useLocation } from 'react-router'

export default () => new URLSearchParams(useLocation().search)
