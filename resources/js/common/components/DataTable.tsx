import { FC } from 'react';
import Swal from 'sweetalert2'
import { capitalizeFirstWord } from '../utils';
import { CommonTableInterface } from '../interface/CommonTableInterface';

type DataTableProps<T extends object = object> = {
    data: T[];
    columns: string[];
    onDelete: (id: number) => void;
}

export const DataTable: FC<DataTableProps> = ({ data, columns, onDelete }) => {
    const onDeleteClick = (id: number) => {
        Swal.fire({
            title: "Do you want to delete this data?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Yes",
            denyButtonText: "No"
        }).then((result) => {
            if (result.isConfirmed) {
                onDelete(id)
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
                        {columns.map((column, i) => (
                            <th key={i}>{capitalizeFirstWord(column)}</th>
                        ))}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((val, i) => {
                            return (
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    {Object.entries(val).map(([key, dataValue], index) => (
                                        key !== 'id' && <td key={index}>{dataValue}</td>
                                    ))}
                                    <td>
                                        <button className="btn btn-outline-warning">Edit</button>
                                        <button className="btn btn-outline-danger" onClick={() => onDeleteClick((val as CommonTableInterface).id)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        }
                        )
                    ) : (
                        <tr>
                            <td colSpan={columns.length + 2} className='text-center'>No data available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}
