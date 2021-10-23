export default function Chevron({onClick, expanded}){
    const classes = expanded ? 'chevron expanded' : 'chevron'
    return <div className={classes} onClick={onClick}/>
}