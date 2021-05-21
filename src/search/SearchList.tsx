import { IResult } from "../store/search/models/interfaces/IResult";

type SearchListProps = {
    items: IResult[];
};

const SearchList: React.FC<SearchListProps> = ({ items }) => {
    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">
                            Найдено: {items.length}
                        </th>
                    </tr>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item =>
                        <tr key={item.id}>
                            <td>
                                {item.id}
                            </td>
                            <td>
                                {item.name}
                            </td>
                        </tr>)}
                </tbody>
            </table>
        </>
    );
};

export default SearchList;
