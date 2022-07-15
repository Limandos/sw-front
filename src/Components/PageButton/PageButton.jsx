import { Link } from "react-router-dom";
import styles from "./PageButton.module.css"

export function pageButton(text, url) {
    return (
        <Link to={url} className={styles.pageButton}>{text}</Link>
    );
}