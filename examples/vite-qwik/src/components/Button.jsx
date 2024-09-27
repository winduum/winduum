export default function Button (props) {
    return (
        <button className="x-button" {...props}>
            {props.children}
        </button>
    )
}
