
import {
    getAll
}
from '../../../model/products'

export async function get(req, res, next) {
    const ret = await getAll(req);
    res.json(ret);
}
/*
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
}*/