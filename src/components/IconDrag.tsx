import { DragControls } from "framer-motion";

interface Props {
    dragControls: DragControls;
}

export function ReorderIcon({ dragControls }: Props) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24" height="24"
            viewBox="0 0 24 24"
            style={{ fill: "#CCC", touchAction: "none" }}
            onPointerDown={(event) => {
                event.preventDefault();
                dragControls.start(event);
            }}
            className="cursor-grab"
        >
            <path
                d="M4 4h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 10h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 16h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4z">
            </path>
        </svg>

    );
}

