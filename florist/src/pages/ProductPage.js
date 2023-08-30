import { useParams } from "react-router-dom";

function ProductPage(){
    const params = useParams();
    const {productId} = params;

    return(
        <div>
            
        </div>
    )
}

export default ProductPage;