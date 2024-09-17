'use server'

var clipboard = {
    items: [],
    count: function () {
        return this.items.length;
    }
}

function createItem(data) {
    return {
        id: clipboard.count() + 1,
        data: data
    }
}

export async function setPaste(data) {
    clipboard.items.push(createItem(data));
}

export async function getPastes() {
    return clipboard.items;
}

export async function deleteItem(id) {
    clipboard.items = clipboard.items.filter(x => x.id != id);
}

export async function getItem(id) {
    return clipboard.items.find(x => x.id == id)?.data ?? "";
}