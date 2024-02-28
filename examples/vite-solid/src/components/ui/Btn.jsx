export default function Btn (props) {
    return (
        <button class="ui-btn" {...props}>
            {props.children}
        </button>
    )
}
