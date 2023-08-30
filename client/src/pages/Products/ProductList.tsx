import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getAllFoodCount } from "../../slices/getAllFoodCountSlice";
import VendorCreatesFood from '../../components/VendorCreatesFood';
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EditModal from "../../components/EditModal";
import { useState } from "react";

interface Column {
    id:
    | "name"
    | "price"
    | "order_count"
    | "ready_time"
    | "rating"
    | "actions"
    label: string;
    minWidth?: number;
    align?: "right" | "left" | "center";
    format?: ((value: number) => string) | undefined
}

interface Data {
    name: string;
    price: number;
    order_count: number;
    ready_time: string;
    rating: string;
    actions: string;
}

function createData(
    name: string,
    price: number,
    order_count: number,
    ready_time: string,
    rating: string
): Data {
    return {
        name,
        price,
        order_count,
        ready_time,
        rating,
        actions: "actions",
    };
}

export default function ProductList() {
    const dispatch = useAppDispatch();
    const { allFoodCount, isLoading } = useAppSelector(
        (state) => state.allFoodCount
    );
    console.log(isLoading)
    React.useEffect(() => {
        dispatch(getAllFoodCount());
    }, [dispatch]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rows = allFoodCount.map((food: any) =>
        createData(
            food.name,
            food.price,
            food.order_count,
            food.ready_time,
            food.rating
        )
    );

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState<Data | null>(null);

    const handleEditClick = (row: Data) => {
        setSelectedRow(row);
        setShowEditModal(true);
    };
    
    const handleDeleteClick = (row: Data) => {
        // Implement the delete logic here
        console.log("Delete clicked for:", row);
    };
    
    const columns: readonly Column[] = [
        { id: "name", label: "Name", minWidth: 100 },
        {
            id: "price",
            label: "Price",
            minWidth: 100,
            align: "right"
        },
        {
            id: "order_count",
            label: "Order Count",
            minWidth: 170,
            align: "center"
        },
        { id: "ready_time", label: "Ready Time", minWidth: 170, align: "center" },
        { id: "rating", label: "Rating", minWidth: 170, align: "center" },
        {
            id: "actions",
            label: "Actions",
            align: "center",
            format: (_value: unknown, row: Data) => (
                <>
                    <IconButton onClick={() => handleEditClick(row)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteClick(row)}>
                        <DeleteIcon />
                    </IconButton>
                </>
            ),
        },
    ];
    
   
    return (
        <>
            <VendorCreatesFood />
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
                                            {columns.map((column) => {
                                                //console.log("col", column);
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {column.format && typeof value === "number"
                                                            ? column.format(value)
                                                            : value}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            {showEditModal && <EditModal onClose={() => setShowEditModal(false)} isOpen={false} />}
        </>
    )
}