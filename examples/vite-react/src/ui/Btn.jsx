import 'winduum/src/ui/btn.css'

export default function Btn(props) {
    return (
        <button className="ui-btn" {...props}>
            {props.children}
        </button>
    )
}
