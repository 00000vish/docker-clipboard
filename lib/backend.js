'use server'

import * as crypto from "crypto";

var clipboard = {
    items: [],
    count: function () {
        return this.items.length;
    }
}

function createPaste(data) {
    return {
        id: clipboard.count() + 1,
        data: data
    }
}

function generateIV(data) {
    var bytes = new Uint8Array(Buffer.from(data, 'utf-8'));

    while (bytes.length < 16) {
        bytes = new Uint8Array([...bytes, ...bytes])
    }

    return bytes.slice(0, 16);
}

export async function encrypt(data, secret) {
    var algorithm = "aes-192-cbc";

    const key = crypto.scryptSync(secret, 'salt', 24);
    const iv = generateIV(secret)

    const cipher = crypto.createCipheriv(algorithm, key, iv);

    return cipher.update(data, 'utf8', 'base64') + cipher.final('base64');
}

export async function decrypt(data, secret) {
    var algorithm = "aes-192-cbc";

    const key = crypto.scryptSync(secret, 'salt', 24);
    const iv = generateIV(secret)

    const decipher = crypto.createDecipheriv(algorithm, key, iv);

    return decipher.update(data, 'base64', 'utf8') + decipher.final('utf8');
}

export async function setPaste(data) {
    clipboard.items.push(createPaste(data));
}

export async function getPastes() {
    return clipboard.items;
}

export async function deletePaste(id) {
    clipboard.items = clipboard.items.filter(x => x.id != id);
}

export async function getPaste(id) {
    return clipboard.items.find(x => x.id == id)?.data ?? "";
}