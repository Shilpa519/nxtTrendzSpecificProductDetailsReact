import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import Cookie from 'js-cookie'
import Header from '../Header'
import SimilarProductItem from '../SimilarProductItem'
import './index.css'

const statusConstants = {
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class ProductItemDetails extends Component {
  state = {
    value: 1,
    itemDetails: {},
    isTrue: statusConstants.inProgress,
  }

  componentDidMount() {
    this.getProduct()
  }

  onIncrement = () => {
    const {value} = this.state
    this.setState(prevState => ({value: prevState.value + 1}))
    console.log(value)
  }

  onDecrement = () => {
    this.setState(prevState => ({
      value: prevState.value > 1 ? prevState.value - 1 : prevState.value,
    }))
  }

  getProduct = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/products/${id}`
    const jwtToken = Cookie.get('jwt_token')

    const option = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, option)
    const data = await response.json()
    console.log(data)

    if (response.ok) {
      const newData = {
        id: data.id,
        title: data.title,
        imageUrl: data.image_url,
        brand: data.brand,
        rating: data.rating,
        description: data.description,
        availability: data.availability,
        totalReviews: data.total_reviews,
        similarProducts: data.similar_products,
        price: data.price,
      }
      this.setState({itemDetails: newData, isTrue: statusConstants.success})
    } else {
      this.setState({itemDetails: {}, isTrue: statusConstants.failure})
    }
  }

  continueShopping = () => {
    const {history} = this.props
    history.replace('/products')
  }

  renderSuccessDetails = () => {
    const {itemDetails, value} = this.state
    const {
      imageUrl,
      totalReviews,
      price,
      description,
      title,
      brand,
      similarProducts,
      rating,
      availability,
    } = itemDetails
    console.log(similarProducts)
    return (
      <div className="success-container">
        <Header />
        <div className="first-container">
          <img src={imageUrl} alt="product" className="src-image" />
          <div className="first-content">
            <h1 className="first-heading">{title}</h1>
            <p className="first-price">Rs {price}/-</p>
            <div className="rating-holder">
              <div className="rating">
                <p className="para">{rating}</p>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                  alt="star"
                  className="star-img"
                />
              </div>
              <p className="review">{totalReviews} Reviews</p>
            </div>
            <p className="first-para">{description}</p>
            <p className="review">
              <span className="first-bold">Available: </span> {availability}
            </p>
            <p className="review">
              <span className="first-bold">Brand: </span> {brand}
            </p>
            <hr />
            <div className="quantity-holder">
              <button
                type="button"
                className="btn"
                onClick={this.onDecrement}
                data-testid="minus"
              >
                <BsDashSquare className="bts-icons" />
              </button>
              <p className="number">{value}</p>
              <button
                type="button"
                onClick={this.onIncrement}
                data-testid="plus"
              >
                <BsPlusSquare className="bts-icon" />
              </button>
            </div>
            <button type="button" className="add-btn">
              ADD TO CART
            </button>
          </div>
        </div>
        <h1 className="similar-heading">Similar Products</h1>
        <ul className="similar-list">
          {similarProducts.map(item => (
            <SimilarProductItem key={item.id} itemValue={item} />
          ))}
        </ul>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="failure-container">
      <Header />
      <div className="no-result">
        <div className="failure-view">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
            className="failure-img"
            alt="failure view"
          />
          <h1 className="failure-heading">Product Not Found</h1>
          <button
            type="button"
            onClick={this.continueShopping}
            className="continue-shopping"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  )

  render() {
    const {isTrue, itemDetails} = this.state

    switch (isTrue) {
      case statusConstants.inProgress:
        return (
          <div data-testid="loader" className="loader">
            <Loader type="ThreeDots" color="#0b69ff" height={80} width={80} />
          </div>
        )
      case statusConstants.success:
        if (itemDetails.length !== 0) {
          return this.renderSuccessDetails()
        }
        return this.renderFailureView()
      default:
        return this.renderFailureView()
    }
  }
}

export default ProductItemDetails
