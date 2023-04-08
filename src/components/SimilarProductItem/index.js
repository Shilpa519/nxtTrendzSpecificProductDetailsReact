import './index.css'

const SimilarProductItem = props => {
  const {itemValue} = props
  console.log(itemValue)
  const {imageUrl, title, brand, price, rating} = itemValue

  return (
    <li className="similar-item">
      <img
        src={imageUrl}
        alt={`similar product ${title}`}
        className="similar-image"
      />
      <p className="title-similar">{title}</p>
      <p className="brand-name">{brand}</p>
      <div className="bottom-div">
        <p className="price-bottom">Rs {price}/-</p>
        <p className="rating-bottom">
          <span>{rating}</span>
          <img
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
            className="star-img"
            alt="star"
          />
        </p>
      </div>
    </li>
  )
}

export default SimilarProductItem
