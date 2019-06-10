"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReadline = (str) => {
    const array_ = str.split(/\r\n|\r|\n/);
    let nextIndex_ = 0;
    return () => {
        if (nextIndex_ < array_.length) {
            return array_[nextIndex_++];
        }
        return 'null';
    };
};
