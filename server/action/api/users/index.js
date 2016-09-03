/*
* @Author: chenpanxin
* @Date:   2016-09-03 18:03:09
* @Last Modified by:   chenpanxin
* @Last Modified time: 2016-09-03 20:03:27
*/
import {
    getAllUser,
    createUser,
    deleteUser,
    updateUser,
}
from '../../../model/users'

export async function get(req, res, next) {
    const ret = await getAllUser(req);
    res.json(ret);
}

export async function create(req, res, next) {
    const ret = await createUser(req);
    res.json(ret);
}
export async function remove(req, res, next) {
    const ret = await deleteUser(req);
    res.json(ret);
}

export async function update(req, res, next) {
    const ret = await updateUser(req);
    res.json(ret);
}