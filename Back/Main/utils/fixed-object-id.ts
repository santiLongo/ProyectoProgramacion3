import { ObjectId } from "mongodb";

export const fixedObjectId = (id: number): ObjectId => {
    let _id = '' + id;

    while( _id.length < 24 ){
        _id = 0 + _id;
    }

    return new ObjectId(_id);
}

export const setFixedObjectId = (lastId: ObjectId): ObjectId => {
    const _id = lastId._id;

    return fixedObjectId(Number(_id) + 1);
}