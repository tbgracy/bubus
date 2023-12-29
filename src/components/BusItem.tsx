import Bus from "../types/Bus";

export default function BusItem({ bus }: { bus: Bus }) {
    return <li>{bus.name}</li>
}