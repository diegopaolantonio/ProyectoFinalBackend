
import styles from '../Stripe.module.css'
const ProductCard = ({ product, setCurrentProduct}) => {
    return (<>
        <div className={styles.productCard} onClick={()=>setCurrentProduct(product.id)}>
            <p>{product.name}</p>
            <p>{product.price}</p>
        </div>
    </>)
}

export default ProductCard;