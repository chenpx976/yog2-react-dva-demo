'use strict';

const qs = require('qs');
const mockjs = require('mockjs');

// 数据持久
let UserListData = {};
if (!global.UserListData) {
    const data = mockjs.mock({
        'data|100': [{
            'id|+1': 1,
            name: '@cname',
            'age|11-99': 1,
            address: '@region'
        }],
        page: {
            total: 100,
            current: 1
        }
    });
    UserListData = data;
    global.UserListData = UserListData;
} else {
    UserListData = global.UserListData;
}

export async function getAllUser(req) {
    const page = qs.parse(req.query);
    const pageSize = page.pageSize || 10;
    const currentPage = page.page || 1;

    let data;
    let newPage;

    let newData = UserListData.data.concat();

    if (page.field) {
        const d = newData.filter(function (item) {
            return item[page.field].indexOf(page.keyword) > -1;
        });

        data = d.slice((currentPage - 1) * pageSize, currentPage * pageSize);

        newPage = {
            current: currentPage * 1,
            total: d.length
        };
    } else {
        data = UserListData.data.slice((currentPage - 1) * pageSize, currentPage * pageSize);
        UserListData.page.current = currentPage * 1;
        newPage = {
            current: UserListData.page.current,
            total: UserListData.page.total
        };
    }

    return {
        success: true,
        data,
        page: newPage
    };

};

export async function createUser(req) {
    const newData = qs.parse(req.body);

    newData.id = UserListData.data.length + 1;
    UserListData.data.unshift(newData);

    UserListData.page.total = UserListData.data.length;
    UserListData.page.current = 1;

    global.UserListData = UserListData;

    return {
        success: true,
        data: UserListData.data,
        page: UserListData.page
    };
}

export async function deleteUser(req) {
    const deleteItem = qs.parse(req.body);

    UserListData.data = UserListData.data.filter(function (item) {
        if (item.id == deleteItem.id) {
            return false;
        }
        return true;
    });

    UserListData.page.total = UserListData.data.length;

    global.UserListData = UserListData;

    return {
        success: true,
        data: UserListData.data,
        page: UserListData.page
    };
}

export async function updateUser(req) {
    const editItem = qs.parse(req.body);

    UserListData.data = UserListData.data.map(function (item) {
        if (item.id == editItem.id) {
            return editItem;
        }
        return item;
    });

    global.UserListData = UserListData;
    return {
        success: true,
        data: UserListData.data,
        page: UserListData.page
    };
}
