import { Plugin } from "tailwindcss/types/config";

export interface PluginOptions {
    colors?: string[]
    fontFamily?: string[],
    fontWeight?: string[],
    ease?: string[],
    zIndex?: string[],
    fontSize?: string[],
    spacing?: string[],
    borderRadius?: string[],
    animations?: string[],
    mask?: string[],
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
