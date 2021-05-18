type DropDownProps = {
    items: { value: string, title: string }[],
    onChange: React.ChangeEventHandler<HTMLSelectElement> | undefined;
}

const DropDown: React.FC<DropDownProps> = ({ items, onChange }) => {

    return (<select name='select' onChange={onChange}>
        {items.map(item => <option value={item.value}>{item.title}</option>)}
    </select>);
}

export default DropDown;
