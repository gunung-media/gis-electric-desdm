import { FC } from 'react';
import Swal from 'sweetalert2'
import { capitalizeFirstWord } from '../utils';

type DataTableProps<T extends object = object> = {
    data: T[]
}

export const DataTable: FC<DataTableProps> = ({ data }) => {
    const onDeleteClick = () => {
        Swal.fire({
            title: "Do you want to delete this data?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Yes",
            denyButtonText: "No"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire("!", "", "success");
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        })
    }
    return (
        <div className="table-responsive">
            <table id="data-table-simple" className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        {Object.keys(data[0]).map((val, i) => (
                            <th key={i}>{capitalizeFirstWord(val)}</th>
                        ))}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((val, i) => (
                        <tr key={i}>
                            <td>{i + 1}</td>
                            {Object.values(val).map((dataValue, index) => (
                                <td key={index}>{dataValue}</td>
                            ))}
                            <td>
                                <button className="btn btn-outline-warning">Edit</button>
                                <button className="btn btn-outline-danger" onClick={onDeleteClick}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
