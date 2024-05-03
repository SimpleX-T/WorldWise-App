import { useEffect } from "react";
import PageNav from "../Components/PageNav";
import styles from "./Product.module.css";

export default function Product() {
	useEffect(function () {
		document.title = "Product - WorldWise";

		return () => (document.title = "WorldWise | Landing Page");
	}, []);

	return (
		<main className={styles.product}>
			<PageNav />
			<section>
				<img
					className={styles.img}
					src='img-1.jpg'
					alt='person with dog overlooking mountain with sunset'
				/>
				<div>
					<h2>About WorldWise.</h2>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Illo est dicta illum vero culpa cum quaerat architecto
						sapiente eius non soluta, molestiae nihil laborum,
						placeat debitis, laboriosam at fuga perspiciatis?
					</p>
					<p>
						Lorem, ipsum dolor sit amet consectetur adipisicing
						elit. Corporis doloribus libero sunt expedita ratione
						iusto, magni, id sapiente sequi officiis et.
					</p>
				</div>
			</section>
		</main>
	);
}
