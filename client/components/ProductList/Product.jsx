import React, { Component, PropTypes } from 'react';
import Icon from 'antd/lib/icon';

function Product(props) {
    const {id, thumb_url, vote, title, description, submitter} = props.data;
    function handleVote() {
        props.dispatch({
            type: 'products/vote',
            payload: id,
        });
    }
    return (
        <div className="product">
            <div className="head">
                <div className="thumbUrl">
                <img src={thumb_url} alt=""/>
                </div>
                <div className="vote">
                    {vote}
                    <Icon type="caret-up" className="voteBtn" onClick={handleVote} />
                </div>
            </div>
            <div className="detail">
                <div className="title">{title}</div>
                <div className="description">{description}</div>
                <div className="submitter">{submitter}</div>

            </div>

        </div>
    )


}

export default Product;