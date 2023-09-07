function Rating(props) {
  const { rating, numReviews } = props;
  return (
    <div className="rating">
      <span>
        <i className="fas fa-star"></i> {rating}
      </span>
      <span className="ps-3">{numReviews} Reviews</span>
    </div>
  );
}

export default Rating;
