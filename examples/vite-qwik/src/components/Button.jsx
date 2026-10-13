export default function Button (props) {
    return (
        <button class="x-button" {...props}>
            {props.children}
        </button>
    )
}
