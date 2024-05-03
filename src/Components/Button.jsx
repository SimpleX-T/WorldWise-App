/* eslint-disable react/prop-types */
import styles from "./Button.module.css";

export default function Button({ children, type, onClick }) {
	return (
		<button className={`${styles.btn} ${styles[type]}`} onClick={onClick}>
			{children}
		</button>
	);
}
