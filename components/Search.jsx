import styles from '/styles/Search.module.css'

export default function Search({search, clear}){
    return (
        <div className={styles.search}>
            <input
                type="search"
                onChange={search}
                className={styles.input}
                onAbort={clear}
                placeholder="Search topics"
                autoFocus
            />
        </div>
    )
}