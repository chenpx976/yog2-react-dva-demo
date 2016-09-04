import React, {Component, PropTypes} from 'react';
import Spin from 'antd/lib/spin';
import Product from './Product';
function ProductList(props) {
    return (
        <div className="product-list">
            <Spin spinning={props.loading} >
                {
                    props.data.map(
                        product => <Product
                            key={product.id}
                            data={product}
                            dispatch={props.dispatch}
                              />
                    )
                }
            </Spin>
        </div>
    );
}

ProductList.propTypes = {

};

export default ProductList;