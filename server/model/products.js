'use strict';

const qs = require('qs');
const mockjs = require('mockjs');

// 数据持久
let ProductListData = {};
if (!global.ProductListData) {
    const data = mockjs.mock({
        'data|100': [{
            'id|+1': 1,
            title: '@cname',
            description: '@cparagraph(5)',
            'vote|1-9999': 1,
            thumb_url: '@image(150x150)',
            submitter: '@cword(4)',
        }]
    });
    ProductListData = data;
    global.ProductListData = ProductListData;
} else {
    ProductListData = global.ProductListData;
}

export async function getAll(req) {
    let data = ProductListData.data;
    return {
        success: true,
        data
    };
};

export async function create(req) {
    const newData = qs.parse(req.body);

    newData.id = ProductListData.data.length + 1;
    ProductListData.data.unshift(newData);

    ProductListData.page.total = ProductListData.data.length;
    ProductListData.page.current = 1;

    global.ProductListData = ProductListData;

    return {
        success: true,
        data: ProductListData.data,
        page: ProductListData.page
    };
}

export async function del(req) {
    const deleteItem = qs.parse(req.body);

    ProductListData.data = ProductListData.data.filter(function (item) {
        if (item.id == deleteItem.id) {
            return false;
        }
        return true;
    });

    ProductListData.page.total = ProductListData.data.length;

    global.ProductListData = ProductListData;

    return {
        success: true,
        data: ProductListData.data,
        page: ProductListData.page
    };
}

export async function update(req) {
    const editItem = qs.parse(req.body);

    ProductListData.data = ProductListData.data.map(function (item) {
        if (item.id == editItem.id) {
            return editItem;
        }
        return item;
    });

    global.ProductListData = ProductListData;
    return {
        success: true,
        data: ProductListData.data,
        page: ProductListData.page
    };
}
