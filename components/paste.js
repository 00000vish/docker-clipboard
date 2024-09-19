'use client';

import { useState } from "react";
import { decrypt, deletePaste } from "@/lib/backend";

export default function Paste(props) {
    const item = props.data;

    const [pasteText, setPasteText] = useState(item.data);
    const [decryptKey, setDecryptKey] = useState('');
    const [isEncrypted, isEetEncrypted] = useState(false);

    async function onDelete() {
        deletePaste(item.id);

        await onUseEffect();
    }

    async function onIsEncrypted() {
        isEetEncrypted(!isEncrypted);
    }

    async function onDecrypt() {
        var text = await decrypt(item.data, decryptKey);
        setPasteText(text);
    }

    async function onCopy() {
        const type = "text/plain";
        const blob = new Blob([pasteText], { type });
        const data = [new ClipboardItem({ [type]: blob })];

        await navigator.clipboard.write(data);
    }

    return (
        <div className="card" key={item.id}>
            <div className="card-body">
                <textarea className="form-control" disabled rows={1} value={pasteText} />
            </div>
            <div className="card-footer text-body-secondary">
                <div className="row g-0">
                    <div className="col d-flex">
                        <button className="btn btn-outline-danger ms-1"
                            onClick={onDelete}>
                            <i className="bi bi-trash-fill"></i>
                        </button>
                        <button className="btn btn-outline-secondary ms-1"
                            onClick={onIsEncrypted}>
                            <i className="bi bi-key-fill"></i>
                        </button>
                        {isEncrypted
                            ?
                            <div className="d-flex">
                                <div className="ms-1">
                                    <input className="form-control"
                                        onChange={(e) => setDecryptKey(e.target.value)} />
                                </div>
                                <button className="btn btn-outline-secondary ms-1"
                                    onClick={onDecrypt}>
                                    <i className="bi bi-unlock-fill"></i>
                                </button>
                            </div>
                            : <div />
                        }
                    </div>
                    <div className="col d-flex justify-content-end">
                        <button className="btn btn-primary"
                            onClick={onCopy}>
                            <i className="bi bi-clipboard-check-fill"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}