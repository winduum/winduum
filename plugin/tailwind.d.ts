interface ScreenSize {
    rgb?: boolean,
    colorMix?: boolean
}

interface Settings {
    [key: string]: string
}

export interface PluginOptions {
    colors?: string[]
    fontFamily?: string[],
    fontWeight?: string[],
    ease?: string[],
    zIndex?: number[],
    fontSize?: string[],
    spacing?: string[],
    borderRadius?: string[],
    animations?: string[],
    mask?: string[],
    screens?: ScreenSize,
    settings?: Settings
}
