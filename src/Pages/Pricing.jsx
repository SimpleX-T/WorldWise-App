// Uses the same styles as Product
import { useEffect } from "react";
import PageNav from "../Components/PageNav";
import styles from "./Product.module.css";

export default function Product() {
	useEffect(function () {
		document.title = "Pricing - WorldWise";

		return () => (document.title = "WorldWise | Landing Page");
	}, []);

	return (
		<main className={styles.product}>
			<PageNav />
			<section>
				<div>
					<h2>
						Simple pricing.
						<br />
						Just $9/month.
					</h2>
					<p>
						Lorem ipsum dolor, sit amet consectetur adipisicing
						elit. Vitae vel labore mollitia iusto. Recusandae quos
						provident, laboriosam fugit voluptatem iste.
					</p>
				</div>
				<img
					className={styles.img}
					src='img-2.jpg'
					alt='overview of a large city with skyscrapers'
				/>
			</section>
		</main>
	);
}
