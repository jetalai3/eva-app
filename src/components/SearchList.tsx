import { IResult } from "../store/search/models/searchInterface"

type SearchListProps = {
    items: IResult[];
}

const SearchList: React.FC<SearchListProps> = ({ items }) => {
    return (
        <>
            <div>Найдено: {items.length}</div>
            <table>
                <th>ID</th>
                <th>Name</th>
                {items.map(item =>
                    <tr>
                        <td>
                            ID: {item.id} |
                        </td>
                        <td>
                            Name: {item.name}
                        </td>
                    </tr>)}
            </table>
        </>
    )
}

export default SearchList;
