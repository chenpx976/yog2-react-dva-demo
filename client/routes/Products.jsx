import React, { PropTypes } from 'react';
import { connect } from 'dva';
import ProductList from '../components/ProductList/ProductList';
function Products(props) {
    return (
        <div className="productPage">
            <h2>ProductList</h2>
            <ProductList
                data={props.products.list}
                loading={props.products.loading}
                dispatch={props.dispatch}
                />
        </div>
    )
}


function mapStateToProps({ products }) {
    return { products };
}

export default connect(mapStateToProps)(Products);