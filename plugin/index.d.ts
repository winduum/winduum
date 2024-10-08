import { Plugin } from "tailwindcss/types/config";

export interface PluginOptions {
    colors?: string[] | string
    fontFamily?: string[] | string,
    fontWeight?: string[] | string,
    ease?: string[] | string,
    zIndex?: string[] | string,
    fontSize?: string[] | string,
    spacing?: string[] | string,
    borderRadius?: string[] | string,
    mask?: string[] | string,
    animations?: string[],
    screens?: {
        [key: string]: string
    },
    settings?: {
        rgb?: boolean,
        colorMix?: boolean
    }
}

export const defaultConfig: PluginOptions

export default function createPlugin(userConfig?: PluginOptions): Plugin
