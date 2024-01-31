export default function divideGap ({ theme, e }) {
    return [
        ...Object.entries(theme('spacing')).map(([key, value]) => {
            return {
                [`.${e(`divide-gap-x-${key}`)}`]: {
                    '& > :where(*:not(:first-child))': {
                        paddingLeft: value,
                        marginLeft: value
                    }
                },
                [`.${e(`divide-gap-y-${key}`)}`]: {
                    '& > :where(*:not(:first-child))': {
                        paddingTop: value,
                        marginTop: value
                    }
                }
            }
        })
    ]
}
