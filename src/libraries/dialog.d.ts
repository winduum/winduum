export interface DefaultOptions {
    openClass: string;
    scrollbarWidthProperty: string;
    show: {
        closable: boolean | null;
    };
    close: {
        remove: boolean | null;
    };
    insert: {
        selector: string | null;
        class: string | null;
        remove: boolean | null;
        append: boolean | null;
    };
}

export declare function dismissDialog(selector: HTMLDialogElement, options?: DefaultOptions['close']) : Promise<void>;

export declare function showDialog(selector: HTMLDialogElement, options?: DefaultOptions['show']): Promise<void>;

export declare function closeDialog(selector: HTMLDialogElement, options?: DefaultOptions['close']): Promise<void>;

export declare function insertDialog(content: string, options?: DefaultOptions['insert']): Promise<void>;

export declare function fetchDialog(options: { url: string; insertOptions?: DefaultOptions['insert'] }): Promise<void>;
