import React from "react";
import { TableCell, TableHead, TableRow } from "@mui/material";

export const ViewDocketColumns = () => {
    const columns = [
        {
            id: 'name',
            label: 'Name',
            minWidth: 170
        },
        {
            id: 'startTime',
            label: 'Start Time',
            minWidth: 170
        },
        {
            id: 'endTime',
            label: 'End Time',
            minWidth: 170
        },
        {
            id: 'hoursWorked',
            label: 'No. of Hours Worked',
            minWidth: 170
        },
        {
            id: 'ratePerHour',
            label: 'Rate per Hour',
            minWidth: 170
        },
        {
            id: 'supplierName',
            label: 'Supplier Name',
            minWidth: 170
        },
        {
            id: 'purchaseOrderNumber',
            label: 'Purchase Order Number',
            minWidth: 170
        },
        {
            id: 'description',
            label: 'Description',
            minWidth: 170
        }
    ];

    return (
        <React.Fragment>
            <TableHead 
                aria-label='sticky table'
                sx= {{
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                    backgroundColor: 'lightgray'
                }}
            >
                <TableRow sx={{
                    // backgroundColor: 'lightgray'
                }}>
                    {
                        columns.map((column) => (
                            <TableCell
                                key={column.id}
                                align={column.align}
                                style={{ minWidth: column.minWidth }}
                            >
                                {column.label}
                            </TableCell>
                        ))
                    }
                </TableRow>
            </TableHead>
        </React.Fragment>
    )
}