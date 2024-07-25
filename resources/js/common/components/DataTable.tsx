import { FC, useEffect } from 'react';
import Swal from 'sweetalert2'
import { capitalizeFirstWord, swalSuccess } from '../utils';
import { CommonTableInterface } from '../interface/CommonTableInterface';

type DataTableProps<T extends object = object> = {
    data: T[];
    columns: string[];
    onDelete?: (id: number) => void;
    onEdit?: (id: number) => void;
    isForLanding?: boolean
}

export const DataTable: FC<DataTableProps> = ({ data, columns, onDelete, onEdit, isForLanding = false }) => {
    function customAlert(message: any) {
        console.log('Custom Alert:', message);
    }
    window.alert = customAlert;

    useEffect(() => {
        $('#data-table-simple tbody').on('click', '#editBtn', function () {
            onEdit!($(this).data('id'));
        });

        $('#data-table-simple tbody').on('click', '#deleteBtn', function () {
            onDeleteClick($(this).data('id'));
        });
    }, [])

    const onDeleteClick = (id: number) => {
        Swal.fire({
            title: "Do you want to delete this data?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Yes",
            denyButtonText: "No"
        }).then((result) => {
            if (result.isConfirmed) {
                onDelete!(id)
                swalSuccess('Sukses Menghapus')
            } else if (result.isDenied) {
                Swal.fire("Data tidak dihapus", "", "info");
            }
        })
    }
    return (
        <div className="table-responsive">
            <table id="data-table-simple" className="table table-hover">
                <thead>
                    <tr>
                        <th>#</th>
                        {columns.map((column, i) => (
                            <th key={i}>{capitalizeFirstWord(column)}</th>
                        ))}
                        {!isForLanding && (
                            <th>Actions</th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((val, i) => {
                            return (
                                <tr key={i} >
                                    <td>{i + 1}</td>
                                    {Object.entries(val).map(([key, dataValue], index) => (
                                        key !== 'id' && <td key={index} onClick={() => onEdit((val as CommonTableInterface).id)} style={{ cursor: 'pointer' }}>{dataValue}</td>
                                    ))}
                                    {!isForLanding && (
                                        <td>
                                            {onEdit !== undefined &&
                                                <button id="editBtn" className="btn btn-outline-warning" onClick={() => onEdit((val as CommonTableInterface).id)} data-id={(val as CommonTableInterface).id}>Edit</button>
                                            }
                                            {onDelete !== undefined &&
                                                <button id="deleteBtn" className="btn btn-outline-danger" onClick={() => onDeleteClick((val as CommonTableInterface).id)} data-id={(val as CommonTableInterface).id}>Delete</button>
                                            }
                                        </td>
                                    )}
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
