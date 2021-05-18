type DropDownProps = {
    items: { value: string, title: string }[],
    onChange: React.ChangeEventHandler<HTMLSelectElement> | undefined;
}

const DropDown: React.FC<DropDownProps> = ({ items, onChange }) => {

    return (<select name='select' className="form-select" onChange={onChange}>
        {items.map(item => <option key={item.title} value={item.value}>{item.title}</option>)}
    </select>);
}

export default DropDown;
